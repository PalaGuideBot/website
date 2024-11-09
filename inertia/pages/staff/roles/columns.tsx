import { Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { ColumnDef } from '@tanstack/react-table'
import { Infer } from '@vinejs/vine/types'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { userRoleValidator } from '#staff/validators/user_validator'
import { RoleModal } from './role_modal'

type Role = Infer<typeof userRoleValidator>

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: 'Nom',
  },
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'priority',
    header: 'Priorité',
  },
  {
    header: 'Description',
    cell: ({ row }) => {
      return (
        <div className="truncate max-w-52">
          <span>{row.original.description}</span>
        </div>
      )
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <RoleModal role={row.original}>
            <Button variant="transparent" size="sm" isIconOnly>
              <EditIcon className="size-4" />
            </Button>
          </RoleModal>
          <Button variant="transparent" size="sm" isIconOnly asChild>
            <Link
              href={`/staff/roles/${row.original.name}`}
              method="delete"
              onSuccess={() => toast.success('Rôle supprimé avec succés')}
            >
              <Trash2Icon className="size-4" />
            </Link>
          </Button>
        </div>
      )
    },
  },
]
