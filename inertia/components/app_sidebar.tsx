import { Link, usePage } from '@inertiajs/react'
import { Button, DropdownMenu } from '@lemonsqueezy/wedges'
import {
  CableIcon,
  CalendarIcon,
  ChartLineIcon,
  ChevronRight,
  ExternalLinkIcon,
  FileEditIcon,
  LogInIcon,
  MessageCircleQuestionIcon,
  ShieldQuestionIcon,
  ShovelIcon,
  TrophyIcon,
  UserCogIcon,
} from 'lucide-react'
import { useIsClient } from 'usehooks-ts'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '~/components/ui/sidebar'
import { useAuth } from '~/hooks/use_auth'
import { useSidebarStateStore } from '~/stores/sidebar_state_store'
import { UserDropdownContent, UserDropdownTrigger } from './shared/user_dropdown'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

type LinkProps = {
  title: string
  url: string
  id?: string
  icon?: React.ComponentType
  external?: boolean
  items?: LinkProps[]
}

const generalLinks: LinkProps[] = [
  {
    title: 'Statistiques',
    url: '#',
    id: 'statistics',
    icon: ChartLineIcon,
    items: [
      {
        title: 'Joueur',
        url: '/players',
      },
      {
        title: 'Faction',
        url: '/factions',
      },
    ],
  },
  {
    title: 'Classements',
    url: '#',
    id: 'leaderboard',
    icon: TrophyIcon,
    items: [
      {
        title: 'Money',
        url: '/leaderboard/money',
      },
      {
        title: 'Trixium',
        url: '/leaderboard/trixium',
      },
      {
        title: 'Clicker',
        url: '/leaderboard/clicker',
      },
      {
        title: 'Boss',
        url: '/leaderboard/boss',
      },
      {
        title: 'EggHunt',
        url: '/leaderboard/egghunt',
      },
      {
        title: 'Koth',
        url: '/leaderboard/koth',
      },
    ],
  },
  {
    title: 'Outils',
    url: '#',
    id: 'tools',
    icon: ShovelIcon,
    items: [
      {
        title: 'Clicker',
        url: '/tools/clicker',
      },
    ],
  },
  { title: 'Événements', url: '/events', icon: CalendarIcon },
  {
    title: 'Statut',
    url: '#',
    id: 'status',
    icon: CableIcon,
    items: [
      {
        title: 'Bot',
        url: 'https://status.palaguidebot.fr',
        external: true,
      },
      {
        title: 'Paladium',
        url: '/status/paladium',
      },
    ],
  },
]

const informationLinks: LinkProps[] = [
  {
    title: 'Politique de confidentialité',
    url: '/privacy',
    icon: ShieldQuestionIcon,
  },
  {
    title: "Conditions d'utilisation",
    url: '/terms',
    icon: UserCogIcon,
  },
  {
    title: 'F.A.Q',
    url: '/faq',
    icon: MessageCircleQuestionIcon,
  },
  {
    title: 'Changelog',
    url: '/changelog',
    icon: FileEditIcon,
  },
]

const Item = ({ item }: { item: LinkProps }) => {
  const { url } = usePage()
  const sidebarState = useSidebarStateStore()

  if (item.items && item.items.length !== 0) {
    return (
      <Collapsible
        key={item.title}
        asChild
        open={sidebarState.isActive(String(item.id))}
        onOpenChange={() => sidebarState.toggleItem(String(item.id))}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    isActive={url === subItem.url || url.startsWith(subItem.url)}
                    asChild
                  >
                    {subItem.external ? (
                      <a href={subItem.url} target="_blank">
                        {subItem.icon && <subItem.icon />}
                        <span>{subItem.title}</span>
                        <ExternalLinkIcon className="ml-auto" />
                      </a>
                    ) : (
                      <Link href={subItem.url}>
                        {subItem.icon && <subItem.icon />}
                        <span>{subItem.title}</span>
                      </Link>
                    )}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton isActive={url === item.url || url.startsWith(item.url)} asChild>
        {item.external ? (
          <a href={item.url} target="_blank">
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ExternalLinkIcon />
          </a>
        ) : (
          <Link href={item.url}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const AppSidebar = () => {
  const user = useAuth()
  const isClient = useIsClient()

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/logo.png" alt="Logo" className="h-6 w-full object-contain" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PalaGuideBot</span>
                  {/* <span className="truncate text-xs">Application</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Général</SidebarGroupLabel>
          <SidebarMenu>
            {isClient && generalLinks.map((item) => <Item key={item.title} item={item} />)}
            {!isClient &&
              generalLinks.map((_, index) => <SidebarMenuSkeleton key={index} showIcon />)}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Informations</SidebarGroupLabel>
          <SidebarMenu>
            {informationLinks.map((item) => (
              <Item key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <UserDropdownTrigger user={user} />
                  </SidebarMenuButton>
                </DropdownMenu.Trigger>
                <UserDropdownContent user={user} />
              </DropdownMenu>
            ) : (
              <div className="flex flex-row justify-between items-center">
                <p className="text-xs text-surface-500">Non connecté</p>
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
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export { AppSidebar }
