import { cn } from '~/lib/utils'
import { StaffHeader } from '../header'

const StaffLayout = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full">
        <StaffHeader />
        <main
          className={cn('flex w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6', className)}
          {...props}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default StaffLayout
