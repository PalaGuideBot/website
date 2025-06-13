import { ChevronsRightIcon } from 'lucide-react'

export function InformationLine({
  label,
  value,
}: {
  label: string
  value: string | number | React.ReactNode
}) {
  return (
    <div className="flex gap-2 items-center">
      <span className="dark:text-shadow-[0px_1px_2px_black] font-pixel text-pretty">{label}</span>
      <ChevronsRightIcon className="h-4" />
      {typeof value === 'string' || typeof value === 'number' ? (
        <span className="text-xs sm:text-sm font-mc-dungueons">{value}</span>
      ) : (
        value
      )}
    </div>
  )
}
