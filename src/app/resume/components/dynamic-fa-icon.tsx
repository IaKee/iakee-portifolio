import dynamic from "next/dynamic"
import { Suspense, useMemo } from "react"
import type { FC } from "react"
import { IconBaseProps } from "react-icons/lib"

type Props = {
  iconName: string
  iconPackage: string
  className?: string
  style?: React.CSSProperties
}

const packageMap: Record<string, () => Promise<any>> = {
  "react-icons/fa": () => import("react-icons/fa"),
  "react-icons/si": () => import("react-icons/si"),
  "react-icons/hi": () => import("react-icons/hi"),
  "react-icons/gi": () => import("react-icons/gi"),
  "react-icons/tb": () => import("react-icons/tb"),
}

const loadIcon = (iconPackage: string, iconName: string) => {
  const importFn = packageMap[iconPackage]
  if (!importFn) {
    console.error(`package '${iconPackage}' is not mapped to a package name`)
    return () => 
      () => 
        <span className="text-red-500">
          !
        </span>
  }

  return dynamic(async () => {
    try {
      const mod = await importFn()
      const Component = mod[iconName as keyof typeof mod]
      
      if (!Component) throw new Error("Icon not found in package.")
      return (props: any) => 
        <Component {...props} />
    } catch (e) {
      console.error("Erro ao carregar ícone:", e)

      return () => 
        <span className="text-red-500">
          !
        </span>
    }
  }, { ssr: false }) as FC<Props>;
}

export default function DynamicFaIcon({ iconName, iconPackage, className }: Props) {
  const Icon = useMemo(
    () => loadIcon(
      iconPackage, 
      iconName), 
    [iconName, iconPackage])
  
  return (
    <Suspense fallback={<span className="text-sm">...</span>}>
      <Icon className={className} iconName={""} iconPackage={""} />
    </Suspense>
  )
}
