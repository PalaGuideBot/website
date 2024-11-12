import { Link } from '@inertiajs/react'
import { Avatar, Button } from '@lemonsqueezy/wedges'
import { ColumnDef } from '@tanstack/react-table'
import { Infer } from '@vinejs/vine/types'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { userRoleValidator } from '#staff/validators/user_validator'
import { QuestionIcon } from '~/components/icons'
import { RoleModal } from './role_modal'

type Role = Infer<typeof userRoleValidator>

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: 'Nom',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar.Root className="size-8">
            <Avatar.Image
              src={`https://image.palaguidebot.fr/flags/${row.original.name.toLowerCase()}.webp`}
              alt={row.original.label}
              className="rounded-lg size-4 object-contain"
            />
            <Avatar.Fallback className="dark:bg-inherit bg-inherit">
              <QuestionIcon className="size-4" />
            </Avatar.Fallback>
          </Avatar.Root>
          <span>{row.original.name}</span>
        </div>
      )
    },
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
