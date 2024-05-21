import { cn } from '~/lib/utils'
import Sidebar from '~/components/sidebar'

const DefaultLayout = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <main
          className={cn('flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6', className)}
          {...props}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
