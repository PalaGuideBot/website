import { ArrowRightIcon } from '~/components/icons'
import React from 'react'

const InformationLine = ({
  label,
  value,
}: {
  label: string
  value: string | number | React.ReactNode
}) => {
  return (
    <div className="flex gap-2">
      <span className="font-pixel">{label}</span>
      <ArrowRightIcon className="w-2" />
      {typeof value === 'string' || typeof value === 'number' ? (
        <span className="text-sm font-mc-dungueons">{value}</span>
      ) : (
        value
      )}
    </div>
  )
}

export { InformationLine }
