import dynamic from "next/dynamic"
import { Suspense, useMemo } from "react"

type Props = {
  iconName: string
  iconPackage: string
  className?: string
  style?: React.CSSProperties
}

// Mapeamento explícito dos pacotes permitidos
const packageMap: Record<string, () => Promise<any>> = {
  "react-icons/fa": () => import("react-icons/fa"),
  "react-icons/si": () => import("react-icons/si"),
  "react-icons/hi": () => import("react-icons/hi"),
  "react-icons/gi": () => import("react-icons/gi"),
  // adiciona mais aqui conforme precisar
}

const loadIcon = (iconPackage: string, iconName: string) => {
  const importFn = packageMap[iconPackage]
  if (!importFn) {
    console.error(`Pacote ${iconPackage} não está no mapa de imports.`)
    return () => () => <span className="text-red-500">!</span>
  }

  return dynamic(async () => {
    try {
      const mod = await importFn()
      const Component = mod[iconName as keyof typeof mod]
      if (!Component) throw new Error("Icon not found in package.")
      return (props: any) => <Component {...props} />
    } catch (e) {
      console.error("Erro ao carregar ícone:", e)
      return () => <span className="text-red-500">!</span>
    }
  }, { ssr: false })
}

export default function DynamicFaIcon({ iconName, iconPackage, className }: Props) {
  const Icon = useMemo(() => loadIcon(iconPackage, iconName), [iconName, iconPackage])
  
  return (
    <Suspense fallback={<span className="text-sm">...</span>}>
      <Icon className={className} />
    </Suspense>
  )
}
