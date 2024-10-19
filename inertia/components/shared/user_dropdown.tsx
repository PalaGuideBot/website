import { Link, router } from '@inertiajs/react'
import { Avatar, DropdownMenu } from '@lemonsqueezy/wedges'
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
import { useAuth } from '~/hooks/use_auth'

const UserDropdownTrigger = ({ user }: { user: NonNullable<ReturnType<typeof useAuth>> }) => {
  return (
    <>
      <Avatar.Root className="h-6 md:h-8 min-w-6 md:min-w-8">
        <Avatar.Image className="rounded-lg" src={user.avatarUrl} alt={user.globalName} />
        <Avatar.Fallback className="rounded-lg">UN</Avatar.Fallback>
      </Avatar.Root>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.globalName}</span>
      </div>
      <ChevronsUpDownIcon className="ml-auto size-4" />
    </>
  )
}

const UserDropdownContent = ({
  user,
  side,
  align = 'end',
}: {
  user: NonNullable<ReturnType<typeof useAuth>>
  side?: React.ComponentProps<typeof DropdownMenu.Content>['side']
  align?: React.ComponentProps<typeof DropdownMenu.Content>['align']
}) => {
  const { theme, setTheme } = useTheme()
  return (
    <DropdownMenu.Content align={align} side={side} className="min-w-[200px] z-[1]">
      <DropdownMenu.Label className="normal-case text-normal font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-md font-bold leading-none">{user.globalName}</p>
          <p className="text-xs font-light">{user.nickName}</p>
        </div>
      </DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item asChild>
          <Link href="/">
            <HomeIcon className="size-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link href="/profile">
            <UserIcon className="size-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenu.Item>
        {user.staff === true && (
          <DropdownMenu.Item asChild>
            <Link href="/staff">
              <LockKeyholeIcon className="size-4" />
              <span>Staff</span>
            </Link>
          </DropdownMenu.Item>
        )}
        <DropdownMenu.Item onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          <span>Thème: {theme === 'light' ? 'Clair' : 'Sombre'}</span>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item onClick={() => router.visit('/logout')}>
          <LogOutIcon className="size-4" />
          <span>Se déconnecter</span>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  )
}

export { UserDropdownContent, UserDropdownTrigger }
