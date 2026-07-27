import { Link } from '@inertiajs/react'
import { type HTMLMotionProps, motion } from 'motion/react'
import * as React from 'react'
import { RunningAnimation } from 'skinview3d'

import { SkinViewer3d } from '~/components/skin_viewer_3d'
import { getSkinUrl } from '~/lib/minecraft'
import { cn, formatNumber } from '~/lib/utils'

type PodiumCardContextValue = {
  position: 'first' | 'second' | 'third'
}

const PodiumCardContext = React.createContext<PodiumCardContextValue | undefined>(undefined)

const usePodiumCardContext = () => {
  const context = React.useContext(PodiumCardContext)
  if (context === undefined) {
    throw new Error('usePodiumCardContext must be used within a PodiumCardContext.Provider')
  }
  return context
}

function PodiumCardWrapper({ className, ...props }: React.ComponentProps<'div'>) {
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

interface PodiumCardProps extends React.ComponentProps<'div'> {
  position: 'first' | 'second' | 'third'
}

function PodiumCard({ position, className, ...props }: PodiumCardProps) {
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

interface PodiumCardPedestalProps extends HTMLMotionProps<'div'> {}

function PodiumCardPedestal({ className, ...props }: PodiumCardPedestalProps) {
  const { position } = usePodiumCardContext()

  const delays = {
    first: 0.4,
    second: 0.2,
    third: 0,
  }

  return (
    <motion.div
      initial={{ height: 'var(--podium-pedestal-initial-height)' }}
      animate={{
        height: 'var(--podium-pedestal-height)',
        transition: { delay: delays[position], duration: 0.5 },
      }}
      className={cn(
        'relative flex flex-col gap-2 items-center justify-center bg-card border border-l-8 md:border-l md:border-t-8 p-2 w-full rounded-md md:rounded-b-none overflow-hidden group',
        '[--podium-pedestal-height:auto] [--podium-pedestal-initial-height:auto] md:[--podium-pedestal-initial-height:100px]',
        position === 'first' &&
          'border-l-primary md:border-l-inherit md:border-t-primary md:[--podium-pedestal-height:250px]',
        position === 'second' &&
          'border-l-gray-500 md:border-l-inherit md:border-t-gray-200 md:[--podium-pedestal-height:200px]',
        position === 'third' &&
          'border-l-destructive-800 md:border-l-inherit md:border-t-destructive md:[--podium-pedestal-height:150px]',
        className
      )}
      {...props}
    />
  )
}

function PodiumCardImage({
  className,
  height = 150,
  width = 150,
  ...props
}: React.ComponentProps<'img'>) {
  return (
    <img
      className={cn('object-contain w-1/2 max-w-32 h-full', className)}
      height={height}
      width={width}
      {...props}
    />
  )
}

interface PodiumCardSkinProps {
  className?: string
  width?: number | string
  height?: number | string
  username: string
}

function PodiumCardSkin({
  className,
  width = '100',
  height = '128',
  username,
}: PodiumCardSkinProps) {
  return (
    <SkinViewer3d
      className={cn('h-auto! w-full', className)}
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

interface PodiumCardDescriptionProps extends React.ComponentProps<'div'> {
  href?: string
}

function PodiumCardDescription({
  className,
  href,
  children,
  ...props
}: PodiumCardDescriptionProps) {
  return (
    <div className={cn('text-xl font-bold', className)} {...props}>
      {href ? (
        <Link href={href} className='before:absolute before:inset-0 before:content-[""] before:z-1'>
          {children}
        </Link>
      ) : (
        children
      )}
    </div>
  )
}

interface PodiumCardValueProps extends React.ComponentProps<'div'> {
  after?: React.ReactNode
}

function PodiumCardValue({ className, children, after, ...props }: PodiumCardValueProps) {
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

interface PodiumCardCompareProps extends React.ComponentProps<'div'> {
  value: number
  compare: number
}

function PodiumCardCompare({ value, compare, className, ...props }: PodiumCardCompareProps) {
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

export {
  PodiumCard,
  PodiumCardCompare,
  PodiumCardDescription,
  PodiumCardImage,
  PodiumCardPedestal,
  PodiumCardSkin,
  PodiumCardValue,
  PodiumCardWrapper,
}
