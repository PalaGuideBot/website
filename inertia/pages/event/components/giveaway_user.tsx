import { Avatar } from '@lemonsqueezy/wedges'
import * as React from 'react'

import { cn } from '~/lib/utils'
import { RemoveUserGiveawayDialog } from '~/pages/staff/giveaways/remove_user_giveaway_dialog'

interface GiveawayUserProps extends React.ComponentProps<'div'> {
  user: {
    avatarUrl: string
    username: string
  }
  onDelete?: () => void
}

const GiveawayUser = ({ user, className, onDelete, ...props }: GiveawayUserProps) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-2 p-2 rounded-md bg-surface',
        onDelete && 'relative overflow-hidden',
        className
      )}
      {...props}
    >
      <Avatar size="xs" src={user.avatarUrl} alt={`${user.username}'s avatar`} />
      <p className="text-sm">{user.username}</p>
      {onDelete && (
        <RemoveUserGiveawayDialog onRemove={onDelete}>
          <button className="absolute inset-0 hover:bg-destructive/20" />
        </RemoveUserGiveawayDialog>
      )}
    </div>
  )
}

export { GiveawayUser }
