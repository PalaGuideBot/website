import * as React from 'react'

import { Avatar, AvatarImage } from '~/components/ui/avatar'
import { cn } from '~/lib/utils'
import { RemoveUserGiveawayDialog } from '~/pages/staff/giveaways/remove_user_giveaway_dialog'

interface GiveawayUserProps extends React.ComponentProps<'div'> {
  user: {
    avatarUrl: string
    username: string
  }
  onDelete?: () => void
}

export function GiveawayUser({ user, className, onDelete, ...props }: GiveawayUserProps) {
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-2 p-2 rounded-md bg-muted',
        onDelete && 'relative overflow-hidden',
        className
      )}
      {...props}
    >
      <Avatar className="size-6">
        <AvatarImage src={user.avatarUrl} alt={`${user.username}'s avatar`} />
      </Avatar>
      <p className="text-sm">{user.username}</p>
      {onDelete && (
        <RemoveUserGiveawayDialog onRemove={onDelete}>
          <button className="absolute inset-0 hover:bg-destructive/10 cursor-pointer" />
        </RemoveUserGiveawayDialog>
      )}
    </div>
  )
}
