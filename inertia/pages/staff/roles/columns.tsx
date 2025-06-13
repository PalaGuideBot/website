import { ColumnDef } from '@tanstack/react-table'
import { Infer } from '@vinejs/vine/types'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { userRoleValidator } from '#staff/validators/user_validator'
import { QuestionIcon } from '~/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { DeleteRoleDialog } from './delete_role_dialog'
import { RoleModal } from './role_modal'

type Role = Infer<typeof userRoleValidator>

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: 'Nom',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-lg size-8 items-center justify-center">
            <AvatarImage
              src={`https://image.palaguidebot.fr/flags/${row.original.name.toLowerCase()}.webp`}
              alt={row.original.label}
              className="size-4 object-contain"
            />
            <AvatarFallback className="bg-inherit">
              <QuestionIcon className="size-4" />
            </AvatarFallback>
          </Avatar>
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
            <Button variant="ghost" size="icon">
              <EditIcon />
            </Button>
          </RoleModal>
          <DeleteRoleDialog
            role={row.original}
            onSuccess={() => toast.success('Rôle supprimé avec succès')}
          >
            <Button variant="ghost" size="icon">
              <Trash2Icon />
            </Button>
          </DeleteRoleDialog>
        </div>
      )
    },
  },
]
