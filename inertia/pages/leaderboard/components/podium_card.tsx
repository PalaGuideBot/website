import { cn } from '~/lib/utils'

export interface PodiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  position: 'first' | 'second' | 'third'
}

export const PodiumCard = ({ position, className, ...props }: PodiumCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 items-center border border-b-black/20 border-b-8 rounded-md p-6',
        position === 'first' && 'bg-primary',
        position === 'second' && 'bg-wg-green-400',
        position === 'third' && 'bg-wg-white-400',
        className
      )}
      {...props}
    />
  )
}

export const PodiumCardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('text-xl font-bold', className)} {...props} />
}

export const PodiumCardValue = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('font-mc-dungueons', className)} {...props} />
}
