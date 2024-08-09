import { Link } from '@inertiajs/react'
import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'
import { RunningAnimation } from 'skinview3d'

import ReactSkinview3d from '~/components/skin_viewer_3d'
import { getSkinUrl } from '~/lib/minecraft'
import { cn, formatNumber } from '~/lib/utils'

type PodiumCardContextValue = {
  position: 'first' | 'second' | 'third'
}

export const PodiumCardContext = React.createContext<PodiumCardContextValue | undefined>(undefined)

const usePodiumCardContext = () => {
  const context = React.useContext(PodiumCardContext)
  if (context === undefined) {
    throw new Error('usePodiumCardContext must be used within a PodiumCardContext.Provider')
  }
  return context
}

export const PodiumCardWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-3 min-h-[378px] gap-1 items-end justify-center',
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
    <PodiumCardContext.Provider value={{ position }}>
      <div
        className={cn(
          'flex flex-row gap-2 md:gap-0 md:flex-col md:items-center',
          position === 'first' && 'md:order-2',
          position === 'second' && 'md:order-1',
          position === 'third' && 'md:order-3',
          className
        )}
        {...props}
      />
    </PodiumCardContext.Provider>
  )
}

export interface PodiumCardPedestalProps extends HTMLMotionProps<'div'> {}

export const PodiumCardPedestal = React.forwardRef<HTMLDivElement, PodiumCardPedestalProps>(
  ({ className, ...props }: PodiumCardPedestalProps, ref) => {
    const { position } = usePodiumCardContext()

    const delays = {
      first: 0.4,
      second: 0.2,
      third: 0,
    }

    return (
      <motion.div
        ref={ref}
        initial={{ height: 'var(--podium-pedestal-initial-height)' }}
        animate={{
          height: 'var(--podium-pedestal-height)',
          transition: { delay: delays[position], duration: 0.5 },
        }}
        className={cn(
          'relative flex flex-col gap-2 items-center justify-center bg-surface border border-l-8 md:border-l md:border-t-8 p-2 w-full rounded-md md:rounded-b-none overflow-hidden group',
          '[--podium-pedestal-height:auto] [--podium-pedestal-initial-height:auto] md:[--podium-pedestal-initial-height:100px]',
          position === 'first' &&
            'border-l-primary md:border-l-inherit md:border-t-primary md:[--podium-pedestal-height:250px]',
          position === 'second' &&
            'border-l-wg-gray md:border-l-inherit md:border-t-wg-gray md:[--podium-pedestal-height:200px]',
          position === 'third' &&
            'border-l-destructive-800 md:border-l-inherit md:border-t-destructive-800 md:[--podium-pedestal-height:150px]',
          className
        )}
        {...props}
      />
    )
  }
)

export const PodiumCardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, height = 150, width = 150, ...props }, ref) => {
  return (
    <img
      ref={ref}
      className={cn('object-contain w-1/2 max-w-32 h-full', className)}
      height={height}
      width={width}
      {...props}
    />
  )
})

PodiumCardImage.displayName = 'PodiumCardImage'

interface PodiumCardSkinProps {
  className?: string
  width?: number | string
  height?: number | string
  username: string
}

export const PodiumCardSkin = ({
  className,
  width = '100',
  height = '128',
  username,
}: PodiumCardSkinProps) => {
  return (
    <ReactSkinview3d
      className={cn('!h-auto w-full', className)}
      width={width}
      height={height}
      skinUrl={getSkinUrl(username)}
      options={{ enableControls: false }}
      onReady={({ viewer }) => {
        viewer.animation = new RunningAnimation()
        viewer.animation.speed = 1.5
        viewer.playerWrapper.rotateY(Math.random() * 180)
        viewer.autoRotate = true
        viewer.autoRotateSpeed = 2
      }}
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
