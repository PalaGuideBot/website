import { Link } from '@inertiajs/react'
import { Badge, Button } from '@lemonsqueezy/wedges'
import { ColumnDef } from '@tanstack/react-table'
import { Infer } from '@vinejs/vine/types'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { userValidator } from '#staff/validators/user_validator'
import { UserModal } from './user_modal'
import { useAuth } from '~/hooks/use_auth'

type User = Infer<typeof userValidator>

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'discordId',
    header: '#',
  },
  {
    header: 'Rôles',
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
          <Button
            variant="transparent"
            size="sm"
            isIconOnly
            asChild
            disabled={auth?.id === row.original.discordId}
          >
            <Link
              href={`/staff/users/${row.original.discordId}`}
              method="delete"
              onSuccess={() => toast.success('Utilisateur supprimé avec succés')}
            >
              <Trash2Icon className="size-4" />
            </Link>
          </Button>
        </div>
      )
    },
  },
]
