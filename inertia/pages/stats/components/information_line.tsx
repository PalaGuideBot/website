import { ArrowRightIcon } from '~/components/icons'
import { Link } from '@inertiajs/react'
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

const InformationLineWithLink = ({
  label,
  value,
  href,
}: {
  label: string
  value: string | number
  href: string
}) => {
  return (
    <div className="flex gap-2">
      <span className="font-pixel">{label}</span>
      <ArrowRightIcon className="w-2" />
      <Link href={href}>
        <button className="text-sm font-mc-dungueons hover:text-secondary bg-background/50 p-1 border rounded-md">
          {value}
        </button>
      </Link>
    </div>
  )
}

export { InformationLine, InformationLineWithLink }
