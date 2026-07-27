import { type ColumnDef } from '@tanstack/react-table'
import { type Infer } from '@vinejs/vine/types'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { userValidator } from '#staff/validators/user_validator'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { useAuth } from '~/hooks/use_auth'
import { DeleteUserDialog } from './delete_user_dialog'
import { UserModal } from './user_modal'

type User = Infer<typeof userValidator>

export const columns: ColumnDef<User>[] = [
  {
    header: "Nom d'utilisateur",
    accessorKey: 'username',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-lg h-8 min-w-8">
            <AvatarImage src={row.original.avatarUrl} alt={row.original.username} />
          </Avatar>
          <span>{row.original.username}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'discordId',
    header: '#',
  },
  {
    header: 'Rôles',
    accessorFn: (row) => row.roles.map((role) => `${role.name}:${role.label}`).join(', '),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {row.original.roles.length !== 0 ? (
            row.original.roles.map((role) => (
              <Badge key={role.name} variant="outline" stroke>
                {role.label}
              </Badge>
            ))
          ) : (
            <Badge variant="outline" stroke>
              Aucun
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    header: 'Actions',
    minSize: 0,
    size: 0,
    cell: ({ row }) => {
      const auth = useAuth()

      return (
        <div className="flex justify-end">
          <UserModal user={row.original}>
            <Button variant="ghost" size="icon">
              <EditIcon />
            </Button>
          </UserModal>
          <DeleteUserDialog
            user={row.original}
            onSuccess={() => toast.success('Utilisateur supprimé avec succès')}
          >
            <Button variant="ghost" size="icon" disabled={auth?.id === row.original.discordId}>
              <Trash2Icon className="size-4" />
            </Button>
          </DeleteUserDialog>
        </div>
      )
    },
  },
]
