import { Avatar, Badge, Button } from '@lemonsqueezy/wedges'
import { ColumnDef } from '@tanstack/react-table'
import { Infer } from '@vinejs/vine/types'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { userValidator } from '#staff/validators/user_validator'
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
          <Avatar
            src={row.original.avatarUrl}
            alt={row.original.username}
            size="sm"
            className="rounded-lg"
          />
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
              <Badge key={role.name} color="blue" stroke>
                {role.label}
              </Badge>
            ))
          ) : (
            <Badge color="gray" stroke>
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
            <Button variant="transparent" size="sm" isIconOnly>
              <EditIcon className="size-4" />
            </Button>
          </UserModal>
          <DeleteUserDialog
            user={row.original}
            onSuccess={() => toast.success('Utilisateur supprimé avec succès')}
          >
            <Button
              variant="transparent"
              size="sm"
              isIconOnly
              disabled={auth?.id === row.original.discordId}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </DeleteUserDialog>
        </div>
      )
    },
  },
]
