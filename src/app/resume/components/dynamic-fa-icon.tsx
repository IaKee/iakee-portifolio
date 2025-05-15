import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";
import type { ComponentType } from "react";

export type IconPackage = 
  | "react-icons/fa" 
  | "react-icons/si" 
  | "react-icons/hi" 
  | "react-icons/gi" 
  | "react-icons/tb";

type Props = {
  iconName: string;
  iconPackage: IconPackage;
  className?: string;
  style?: React.CSSProperties;
};

const packageMap: Record<IconPackage, () => Promise<unknown>> = {
  "react-icons/fa": () => import("react-icons/fa"),
  "react-icons/si": () => import("react-icons/si"),
  "react-icons/hi": () => import("react-icons/hi"),
  "react-icons/gi": () => import("react-icons/gi"),
  "react-icons/tb": () => import("react-icons/tb"),
};

const loadIcon = (iconPackage: IconPackage, iconName: string) => {
  const importFn = packageMap[iconPackage];
  
  if (!importFn) {
    console.error(`Package '${iconPackage}' is not mapped`);
    return dynamic(() => Promise.resolve(() => 
      <span className="text-red-500">!</span>
    ));
  }

  return dynamic(async () => {
  try {
    const mod = await importFn();
    
    // Type guard to ensure mod is a proper module
    if (!mod || typeof mod !== 'object') {
      throw new Error('Invalid module format');
    }

    // Safely get the component with type checking
    const Component = mod[iconName as keyof typeof mod] as ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }> | undefined;

    if (!Component) {
      throw new Error(`Icon "${iconName}" not found in package`);
    }

    return (props: { className?: string; style?: React.CSSProperties }) => (
      <Component className={props.className} style={props.style} />
    );
  } catch (e) {
    console.error(`Error loading icon "${iconName}":`, e);
    
    // Fallback component with better visual feedback
    return (props: { className?: string }) => (
      <span 
        className={`inline-block text-red-500 ${props.className || ''}`}
        title={`Failed to load icon: ${iconName}`}
      >
        □
      </span>
    );
  }
}, { 
  ssr: false,
  loading: () => <span className="inline-block animate-pulse">⋯</span>
});
};

export default function DynamicFaIcon({ 
  iconName, 
  iconPackage, 
  className 
}: Props) {
  const Icon = useMemo(
    () => loadIcon(iconPackage, iconName),
    [iconName, iconPackage]
  );

  return (
    <Suspense fallback={<span className="text-sm">...</span>}>
      <Icon className={className} />
    </Suspense>
  );
}