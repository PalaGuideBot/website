import { useDraggable, useDroppable } from '@dnd-kit/core'
import { BoxIcon, XIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '~/components/ui/button'
import { Card, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'

interface WrappedMetricCardProps extends Omit<React.ComponentProps<typeof Card>, 'id'> {
  id: string
}

function WrappedMetricCard({ className, ...props }: WrappedMetricCardProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <Card
      data-over={isOver}
      className={cn(
        'group relative rounded-xl border-2 data-[over=true]:border-dashed p-4 min-h-24 flex flex-col gap-2',
        className
      )}
      ref={setNodeRef}
      {...props}
    />
  )
}

interface WrappedMetricCardDraggableProps extends React.ComponentProps<typeof Card> {
  type: string
}

function WrappedMetricCardDraggable({
  type,
  className,
  ...props
}: WrappedMetricCardDraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `wrapped-metric-card-draggable-${type}`,
    data: {
      type,
    },
  })

  const style = {
    ...props.style,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'z-[2] hover:border-primary hover:animate-pulse transition-colors rounded-xl border-2 px-4 py-2 flex flex-col gap-2 justify-center',
        className
      )}
      {...listeners}
      {...attributes}
      {...props}
    />
  )
}

interface WrappedMetricCardDroppableProps extends Omit<React.ComponentProps<typeof Card>, 'id'> {
  id: string
}

function WrappedMetricCardDroppable({ className, ...props }: WrappedMetricCardDroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <Card
      data-over={isOver}
      className={cn(
        'rounded-xl border-2 border-dashed data-[over=true]:border-solid min-h-24 p-4 flex flex-col gap-2 items-center justify-center',
        className
      )}
      ref={setNodeRef}
      {...props}
    >
      <BoxIcon className="size-8 text-foreground/50" />
    </Card>
  )
}

function WrappedMetricCardTitle({ className, ...props }: React.ComponentProps<typeof CardTitle>) {
  return <CardTitle className={cn('uppercase text-center text-lg', className)} {...props} />
}

function WrappedMetricCardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-3xl font-extrabold text-center', className)} {...props} />
}

function WrappedMetricCardDelete({
  variant = 'outline',
  size = 'icon',
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        'rounded-full absolute top-0 right-0 opacity-0 m-2 group-hover:opacity-100 transition-opacity',
        className
      )}
      variant={variant}
      size={size}
      {...props}
      children={children ?? <XIcon />}
    />
  )
}

export {
  WrappedMetricCard,
  WrappedMetricCardContent,
  WrappedMetricCardDelete,
  WrappedMetricCardDraggable,
  WrappedMetricCardDroppable,
  WrappedMetricCardTitle,
}
