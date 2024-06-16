import { Link, usePage } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import {
  BadgeEuroIcon,
  BotIcon,
  DiamondIcon,
  EggIcon,
  ExternalLinkIcon,
  FileEditIcon,
  GamepadIcon,
  HandCoinsIcon,
  LucideIcon,
  MenuIcon,
  ShieldIcon,
  ShieldQuestionIcon,
  SkullIcon,
  SwordsIcon,
  UserCogIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react'
import { cn } from '~/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

type LinkProps = {
  path: string
  label: string
  icon: React.ReactNode
  external?: boolean
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
      icon: createIconLink(ShieldIcon),
    },
  ],
  Classement: [
    {
      path: '/leaderboard/factions',
      label: 'Factions',
      icon: createIconLink(UsersIcon),
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
      icon: createIconLink(SkullIcon),
    },
    /* {
      path: '/leaderboard/chorus',
      label: 'Chorus',
      icon: createIconLink(DiamondIcon),
    }, */
    {
      path: '/leaderboard/egghunt',
      label: 'EggHunt',
      icon: createIconLink(EggIcon),
    },
    /* {
      path: '/leaderboard/end',
      label: 'End',
      icon: createIconLink(DiamondIcon),
    }, */
    {
      path: '/leaderboard/koth',
      label: 'Koth',
      icon: createIconLink(SwordsIcon),
    },
  ],
  Status: [
    {
      path: 'https://status.palaguidebot.fr',
      label: 'Bot',
      icon: createIconLink(BotIcon),
      external: true,
    },
    {
      path: '/status/paladium',
      label: 'Paladium',
      icon: createIconLink(GamepadIcon),
    },
  ],
  Informations: [
    {
      path: '/privacy',
      label: 'Politique de confidentialité',
      icon: createIconLink(ShieldQuestionIcon),
    },
    {
      path: '/terms',
      label: "Conditions d'utilisation",
      icon: createIconLink(UserCogIcon),
    },
    {
      path: '/changelogs',
      label: 'Changelogs',
      icon: createIconLink(FileEditIcon),
    },
  ],
}

export function Navigation() {
  const { url } = usePage()
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {Object.entries(LINKS).map(([category, links]) => (
        <div key={category}>
          <h2 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">
            {category}
          </h2>
          <ul className="flex flex-col gap-1 mt-2 mb-4">
            {links.map(({ path, label, icon, external = false }) => (
              <li key={path}>
                {external ? (
                  <a
                    href={path}
                    target="_blank"
                    className={cn(
                      'relative flex items-center gap-2 p-2 rounded-md hover:bg-surface-200 transition-colors',
                      (url === path || url.startsWith(path)) && 'bg-primary dark:text-wg-black'
                    )}
                  >
                    {icon}
                    <span>{label}</span>
                    <ExternalLinkIcon className="h-4 w-4 absolute right-2" />
                  </a>
                ) : (
                  <Link
                    href={path}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded-md hover:bg-surface-200 transition-colors',
                      (url === path || url.startsWith(path)) && 'bg-primary dark:text-wg-black'
                    )}
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="transparent" isIconOnly>
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto" side="left">
        <SheetHeader className="pb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <Navigation />
      </SheetContent>
    </Sheet>
  )
}
