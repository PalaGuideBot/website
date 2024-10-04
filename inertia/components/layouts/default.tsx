import { Header } from '~/components/header'
import Sidebar from '~/components/sidebar'
import { cn } from '~/lib/utils'
import { Toaster } from '../ui/toast'

const DefaultLayout = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main
          className={cn('flex w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6', className)}
          {...props}
        >
          {children}
        </main>
      </div>
      <Toaster richColors />
    </div>
  )
}

export default DefaultLayout
