import { cn } from '~/lib/utils'
import Sidebar from '~/components/sidebar'

const DefaultLayout = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main className={cn('flex w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6', className)} {...props}>
        {children}
      </main>
    </div>
  )
}

export default DefaultLayout
