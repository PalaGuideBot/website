import { Avatar } from '@lemonsqueezy/wedges'
import * as React from 'react'

import { cn } from '~/lib/utils'

interface GiveawayUserProps extends React.ComponentProps<'div'> {
  user: {
    avatarUrl: string
    username: string
  }
}

const GiveawayUser = ({ user, className, ...props }: GiveawayUserProps) => {
  return (
    <div
      className={cn('flex flex-row items-center gap-2 p-2 rounded-md bg-surface', className)}
      {...props}
    >
      <Avatar size="xs" src={user.avatarUrl} alt={`${user.username}'s avatar`} />
      <p className="text-sm">{user.username}</p>
    </div>
  )
}

export { GiveawayUser }
