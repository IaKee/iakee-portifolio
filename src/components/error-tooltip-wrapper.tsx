import * as Tooltip from "@radix-ui/react-tooltip"
import { useLanguage } from "@/context/language-content"

export function ErrorTooltipWrapper({
  children,
  errorMessage
}: {
  children: React.ReactNode,
  errorMessage?: string
}) {
  const { t } = useLanguage()

  if (!errorMessage) return <>{children}</>

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            className="z-50 bg-red-500 text-white px-2 py-1 rounded-full shadow text-sm">
            {t(errorMessage)}
            <Tooltip.Arrow className="fill-red-500" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
