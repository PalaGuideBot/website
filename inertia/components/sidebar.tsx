import { Link, usePage } from '@inertiajs/react'
import {
  BadgeEuroIcon,
  BotIcon,
  DiamondIcon,
  GamepadIcon,
  HandCoinsIcon,
  LucideIcon,
  UserIcon,
} from 'lucide-react'
import { cn } from '~/lib/utils'
import ThemeToggler from '~/components/shared/theme_toggler'

type LinkProps = {
  path: string
  label: string
  icon: React.ReactNode
}

function createIconLink(Icon: LucideIcon) {
  return <Icon className="h-4 w-4" />
}

const LINKS: Record<string, Array<LinkProps>> = {
  Statistiques: [
    {
      path: '/stats/users',
      label: 'Utilisateur',
      icon: createIconLink(UserIcon),
    },
    {
      path: '/stats/factions',
      label: 'Faction',
      icon: createIconLink(GamepadIcon),
    },
  ],
  Classement: [
    {
      path: '/leaderboard/factions',
      label: 'Factions',
      icon: createIconLink(GamepadIcon),
    },
    {
      path: '/leaderboard/money',
      label: 'Money',
      icon: createIconLink(BadgeEuroIcon),
    },
    {
      path: '/leaderboard/trixium',
      label: 'Trixium',
      icon: createIconLink(DiamondIcon),
    },
    {
      path: '/leaderboard/clicker',
      label: 'Clicker',
      icon: createIconLink(HandCoinsIcon),
    },
    {
      path: '/leaderboard/boss',
      label: 'Boss',
      icon: createIconLink(GamepadIcon),
    },
    {
      path: '/leaderboard/chorus',
      label: 'Chorus',
      icon: createIconLink(DiamondIcon),
    },
    {
      path: '/leaderboard/egghunt',
      label: 'EggHunt',
      icon: createIconLink(GamepadIcon),
    },
    {
      path: '/leaderboard/end',
      label: 'End',
      icon: createIconLink(DiamondIcon),
    },
    {
      path: '/leaderboard/koth',
      label: 'Koth',
      icon: createIconLink(GamepadIcon),
    },
  ],
  Status: [
    {
      path: 'https://status.palaguidebot.fr',
      label: 'Bot',
      icon: createIconLink(BotIcon),
    },
    {
      path: '/paladium/status',
      label: 'Paladium',
      icon: createIconLink(GamepadIcon),
    },
  ],
}

export default function Sidebar() {
  const { url } = usePage()
  return (
    <div className="hidden border-r bg-surface md:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center justify-between gap-2 border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <img src="/logo.png" className="h-6 lg:h-8 w-full" />
            </Link>
            <span className="font-bold">PalaGuideBot</span>
          </div>
          <ThemeToggler />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {Object.entries(LINKS).map(([category, links]) => (
              <div key={category}>
                <h2 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                  {category}
                </h2>
                <ul className="flex flex-col gap-1 mt-2 mb-4">
                  {links.map(({ path, label, icon }) => (
                    <li key={path}>
                      <Link
                        href={path}
                        className={cn(
                          'flex items-center gap-2 p-2 rounded-md hover:bg-surface-200',
                          (url === path || url.startsWith(path)) && 'bg-primary dark:text-wg-black'
                        )}
                      >
                        {icon}
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
