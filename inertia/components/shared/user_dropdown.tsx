import { Link, router } from '@inertiajs/react'
import {
  ChevronsUpDownIcon,
  HomeIcon,
  LockKeyholeIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from 'lucide-react'

import { useTheme } from '~/components/theme_provider'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '~/components/ui/dropdown_menu'
import { type useAuth } from '~/hooks/use_auth'

interface UserDropdownTriggerProps {
  user: NonNullable<ReturnType<typeof useAuth>>
}

export function UserDropdownTrigger({ user }: UserDropdownTriggerProps) {
  return (
    <>
      <Avatar className="size-6 md:size-8 rounded-lg">
        <AvatarImage src={user.avatarUrl} alt={user.globalName} />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.globalName}</span>
      </div>
      <ChevronsUpDownIcon className="ml-auto size-4" />
    </>
  )
}

interface UserDropdownContentProps {
  user: NonNullable<ReturnType<typeof useAuth>>
  side?: React.ComponentProps<typeof DropdownMenuContent>['side']
  align?: React.ComponentProps<typeof DropdownMenuContent>['align']
}

export function UserDropdownContent({ user, side, align = 'end' }: UserDropdownContentProps) {
  const { theme, setTheme } = useTheme()
  return (
    <DropdownMenuContent
      align={align}
      side={side}
      className="min-w-[200px] w-(--radix-popper-anchor-width)"
    >
      <DropdownMenuLabel className="text-normal font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-md font-bold leading-none">{user.globalName}</p>
          <p className="text-xs font-light">{user.nickName}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/">
            <HomeIcon className="size-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="size-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        {user.staff === true && (
          <DropdownMenuItem asChild>
            <Link href="/staff">
              <LockKeyholeIcon className="size-4" />
              <span>Staff</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onSelect={(event) => event.preventDefault()}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          <span>Thème: {theme === 'light' ? 'Clair' : 'Sombre'}</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => router.visit('/logout')}>
          <LogOutIcon className="size-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
