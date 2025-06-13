import { Header } from '~/components/header'
import { cn } from '~/lib/utils'
import { AppSidebar } from '../app_sidebar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { Toaster } from '../ui/toast'

export function DefaultLayout({ children, className, ...props }: React.ComponentProps<'main'>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main
          className={cn('flex w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6', className)}
          {...props}
        >
          {children}
        </main>
      </SidebarInset>
      <Toaster richColors />
    </SidebarProvider>
  )
}
