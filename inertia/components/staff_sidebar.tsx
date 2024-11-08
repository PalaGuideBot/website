import { Link, usePage } from '@inertiajs/react'
import { ExternalLinkIcon } from 'lucide-react'
import * as React from 'react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  sidebarMenuButtonVariants,
  SidebarMenuItem,
} from '~/components/ui/sidebar'
import { cn } from '~/lib/utils'

const links = [
  {
    title: 'Tableau de bord',
    url: '/staff',
  },
  {
    title: 'Utilisateurs',
    url: '/staff/users',
  },
  {
    title: 'Rôles',
    url: '/staff/roles',
  },
]

const StaffSidebar = ({ className, ...props }: React.ComponentProps<typeof SidebarGroup>) => {
  const { url } = usePage()

  return (
    <SidebarGroup className={cn('p-0', className)} {...props}>
      <SidebarGroupLabel>Staff</SidebarGroupLabel>
      <SidebarMenu>
        {links.map((item) => (
          <SidebarMenuItem>
            <Link
              href={item.url}
              className={sidebarMenuButtonVariants()}
              data-active={item.url === url || url.startsWith(item.url)}
            >
              <span>{item.title}</span>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarGroupLabel>Services externes</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <a
            href="https://dash.palaguidebot.fr"
            target="_blank"
            className={sidebarMenuButtonVariants()}
          >
            <span>Portainer</span>
            <ExternalLinkIcon className="size-4" />
          </a>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <a
            href="https://analytics.palaguidebot.fr"
            target="_blank"
            className={sidebarMenuButtonVariants()}
          >
            <span>Umami</span>
            <ExternalLinkIcon className="size-4" />
          </a>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export { StaffSidebar }
