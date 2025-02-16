import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Button } from '@lemonsqueezy/wedges'
import { BoxIcon, XIcon } from 'lucide-react'
import * as React from 'react'

import { Card, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'

interface WrappedMetricCardProps extends Omit<React.ComponentProps<typeof Card>, 'id'> {
  id: string
}

const WrappedMetricCard = ({ className, ...props }: WrappedMetricCardProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <Card
      data-over={isOver}
      className={cn(
        'group relative rounded-xl border-2 border-surface/20 data-[over=true]:border-dashed bg-surface/10 p-4 min-h-24 flex flex-col gap-2',
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

const WrappedMetricCardDraggable = ({
  type,
  className,
  ...props
}: WrappedMetricCardDraggableProps) => {
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
        'hover:border-primary hover:animate-pulse transition-colors rounded-xl border-2 border-surface/20 bg-surface/10 px-4 py-2 flex flex-col gap-2 justify-center',
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

const WrappedMetricCardDroppable = ({ className, ...props }: WrappedMetricCardDroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <Card
      data-over={isOver}
      className={cn(
        'rounded-xl border-2 border-surface/20 border-dashed data-[over=true]:border-solid bg-surface/10 min-h-24 p-4 flex flex-col gap-2 items-center justify-center',
        className
      )}
      ref={setNodeRef}
      {...props}
    >
      <BoxIcon className="size-8 text-foreground/50" />
    </Card>
  )
}

const WrappedMetricCardTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CardTitle>
>(({ className, ...props }, ref) => {
  return (
    <CardTitle className={cn('uppercase text-center text-lg', className)} ref={ref} {...props} />
  )
})

const WrappedMetricCardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn('text-3xl font-extrabold text-center', className)} ref={ref} {...props} />
    )
  }
)

const WrappedMetricCardDelete = ({
  variant = 'outline',
  size = 'sm',
  shape = 'pill',
  isIconOnly = true,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      className={cn(
        'absolute top-0 right-0 opacity-0 m-2 group-hover:opacity-100 transition-opacity',
        className
      )}
      variant={variant}
      shape={shape}
      size={size}
      isIconOnly={isIconOnly}
      {...props}
      children={children ?? <XIcon className="size-4" />}
    />
  )
}

export {
  WrappedMetricCard,
  WrappedMetricCardDraggable,
  WrappedMetricCardDroppable,
  WrappedMetricCardTitle,
  WrappedMetricCardContent,
  WrappedMetricCardDelete,
}
