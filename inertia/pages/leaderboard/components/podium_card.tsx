import { Link } from '@inertiajs/react'
import React from 'react'
import { cn, formatNumber } from '~/lib/utils'

export const PodiumCardWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex flex-wrap md:grid grid-cols-1 md:grid-cols-3 gap-4 items-end justify-center',
        className
      )}
      {...props}
    />
  )
}

export interface PodiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  position: 'first' | 'second' | 'third'
}

export const PodiumCard = ({ position, className, ...props }: PodiumCardProps) => {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-2 items-center justify-center border border-b-black/20 border-b-8 hover:border-b-0 transition-all rounded-md p-6 max-w-80 w-full group',
        position === 'first' && 'bg-primary',
        position === 'second' && 'bg-wg-white-400',
        position === 'third' && 'bg-destructive-900',
        className
      )}
      {...props}
    />
  )
}

export const PodiumCardImage = ({
  className,
  height = 150,
  width = 150,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      className={cn('object-contain w-1/2 h-full mt-2', className)}
      height={height}
      width={width}
      {...props}
    />
  )
}

interface PodiumCardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
}

export const PodiumCardDescription = ({
  className,
  href,
  children,
  ...props
}: PodiumCardDescriptionProps) => {
  return (
    <div className={cn('text-xl font-bold', className)} {...props}>
      {href ? (
        <Link
          href={href}
          className='before:absolute before:inset-0 before:content-[""] before:z-[1]'
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </div>
  )
}

interface PodiumCardValueProps extends React.HTMLAttributes<HTMLDivElement> {
  after?: React.ReactNode
}

export const PodiumCardValue = ({ className, children, after, ...props }: PodiumCardValueProps) => {
  return (
    <div
      className={cn(
        'font-mc-dungueons',
        after && 'flex items-center gap-1 justify-center',
        className
      )}
      {...props}
    >
      {children}
      {after}
    </div>
  )
}

interface PodiumCardCompareProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  compare: number
}

export const PodiumCardCompare = ({
  value,
  compare,
  className,
  ...props
}: PodiumCardCompareProps) => {
  const percentage = (compare - value) / compare
  return (
    <div
      className={cn(
        'text-xs font-bold absolute top-0 right-0 p-2 transition-opacity opacity-0 group-hover:opacity-100',
        className
      )}
      {...props}
    >
      {'#1 < '}
      {formatNumber(percentage, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}
    </div>
  )
}
