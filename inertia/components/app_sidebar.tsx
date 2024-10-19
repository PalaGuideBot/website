import { Link, usePage } from '@inertiajs/react'
import { DropdownMenu } from '@lemonsqueezy/wedges'
import {
  CableIcon,
  CalendarIcon,
  ChartLineIcon,
  ChevronRight,
  ExternalLinkIcon,
  FileEditIcon,
  MessageCircleQuestionIcon,
  ShieldQuestionIcon,
  ShovelIcon,
  TrophyIcon,
  UserCogIcon,
} from 'lucide-react'

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '~/components/ui/sidebar'
import { useAuth } from '~/hooks/use_auth'
import { UserDropdownContent, UserDropdownTrigger } from './shared/user_dropdown'

type LinkProps = {
  title: string
  url: string
  icon?: React.ComponentType
  isActive?: boolean
  external?: boolean
  items?: LinkProps[]
}

const generalLinks: LinkProps[] = [
  {
    title: 'Statistiques',
    url: '#',
    icon: ChartLineIcon,
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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

const AppSidebar = () => {
  const user = useAuth()
  const { url } = usePage()

  const renderItem = (item: LinkProps) => {
    if (item.items && item.items.length !== 0) {
      return (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={item.isActive}
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
          <SidebarMenu>{generalLinks.map((item) => renderItem(item))}</SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Informations</SidebarGroupLabel>
          <SidebarMenu>
            {informationLinks.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={url === item.url || url.startsWith(item.url)} asChild>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {user && (
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
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export { AppSidebar }
