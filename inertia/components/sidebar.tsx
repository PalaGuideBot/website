import { Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { LockKeyholeIcon, LogInIcon } from 'lucide-react'
import ThemeToggler from '~/components/shared/theme_toggler'
import { useAuth } from '~/hooks/use_auth'
import { Navigation } from './nav'
import { UserDropdown } from './shared/user_dropdown'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export default function Sidebar() {
  return (
    <aside className="hidden h-screen sticky top-0 w-72 lg:w-80 border-r bg-background md:flex flex-col">
      <div className="flex flex-col">
        <div className="flex min-h-[60px] items-center justify-between gap-2 border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-6 lg:h-8 w-full object-contain" />
            <span className="font-bold">PalaGuideBot</span>
          </Link>
          <ThemeToggler />
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll">
        <Navigation />
      </div>
      <div className="border-t bg-background flex-shrink min-h-14 lg:h-[60px]">
        <SidebarFooter />
      </div>
    </aside>
  )
}

const SidebarFooter = () => {
  const user = useAuth()
  return (
    <div className="flex items-center justify-between w-full h-full p-4 gap-2">
      {user ? (
        <>
          <UserDropdown user={user} align="start" side="top" />
          {user.staff === true && (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button isIconOnly variant="outline" asChild>
                    <Link href="/staff">
                      <LockKeyholeIcon className="size-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>Staff</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      ) : (
        <>
          <p className="text-sm">Non connecté</p>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button variant="outline" className="p-2 aspect-square" asChild>
                  <Link href="/login">
                    <span className="sr-only">Se connecter</span>
                    <LogInIcon className="size-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>Se connecter</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  )
}
