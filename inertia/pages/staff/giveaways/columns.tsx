import { Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { ColumnDef } from '@tanstack/react-table'
import { Infer } from '@vinejs/vine/types'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { giveawayValidator } from '#event/validators/giveaway_validator'
import { formatDate } from '~/lib/date'
import { GiveawayDrawModal } from './giveaway_draw_modal'
import { GiveawayModal } from './giveaway_modal'

type Giveaway = Infer<typeof giveawayValidator>

export const columns: ColumnDef<Giveaway>[] = [
  {
    header: 'Titre',
    accessorKey: 'title',
    cell: ({ row }) => {
      return (
        <GiveawayDrawModal giveaway={row.original}>
          <Button variant="link" size="sm" className="no-underline hover:underline">
            {row.original.title}
          </Button>
        </GiveawayDrawModal>
      )
    },
  },
  {
    header: 'Actif',
    accessorKey: 'active',
    cell: ({ row }) => {
      return row.original.active ? 'Oui' : 'Non'
    },
  },
  {
    header: 'Début',
    accessorKey: 'start',
    cell: ({ row }) => {
      return formatDate(row.original.start)
    },
  },
  {
    header: 'Fin',
    accessorKey: 'end',
    cell: ({ row }) => {
      return formatDate(row.original.end)
    },
  },
  {
    header: 'Participants',
    accessorKey: 'participants',
    cell: ({ row }) => {
      return row.original.participants.length
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <GiveawayModal giveaway={row.original}>
            <Button variant="transparent" size="sm" isIconOnly>
              <EditIcon className="size-4" />
            </Button>
          </GiveawayModal>
          <Button variant="transparent" size="sm" isIconOnly asChild>
            <Link
              href={`/staff/giveaways/${row.original._id}`}
              method="delete"
              onSuccess={() => toast.success('Giveaway supprimé avec succés')}
            >
              <Trash2Icon className="size-4" />
            </Link>
          </Button>
        </div>
      )
    },
  },
]
