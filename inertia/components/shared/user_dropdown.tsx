import { Link, router } from '@inertiajs/react'
import { Avatar, DropdownMenu } from '@lemonsqueezy/wedges'
import {
  ChevronDownIcon,
  HomeIcon,
  LockKeyholeIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from 'lucide-react'

import { useTheme } from '~/components/theme_provider'
import { useAuth } from '~/hooks/use_auth'

const UserDropdown = ({
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
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <span className="group flex shrink cursor-pointer select-none items-center justify-center gap-1 rounded-lg p-1.5 px-2 text-sm text-surface-600 transition-colors duration-100 wg-antialiased hover:bg-surface dark:hover:bg-white/5">
          <Avatar size="xs" src={user.avatarUrl} />
          <span className="ms-2 flex flex-col">
            <span className="font-medium">{user.globalName}</span>
          </span>
          <ChevronDownIcon className="trigger-icon h-5 w-5 text-surface-400" />
        </span>
      </DropdownMenu.Trigger>
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
    </DropdownMenu>
  )
}

export { UserDropdown }
