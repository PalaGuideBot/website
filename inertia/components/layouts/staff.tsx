import { StaffHeader } from '~/components/header'
import { StaffSidebar } from '~/components/staff_sidebar'
import { Toaster } from '~/components/ui/toast'
import { cn } from '~/lib/utils'

const StaffLayout = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full">
        <StaffHeader />
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-col gap-4 md:gap-8">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-4 p-4 lg:grid-cols-[250px_1fr]">
            <StaffSidebar className="lg:sticky lg:top-[80px]" />
            <div className={cn('flex w-full flex-col gap-4', className)} {...props}>
              {children}
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default StaffLayout
