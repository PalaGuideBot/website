import { ColumnDef } from '@tanstack/react-table'
import { Infer } from '@vinejs/vine/types'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { giveawayValidator } from '#event/validators/giveaway_validator'
import { Button } from '~/components/ui/button'
import { formatDate } from '~/lib/date'
import { DeleteGiveawayDialog } from './delete_giveaway_dialog'
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
            <Button variant="ghost" size="icon">
              <EditIcon />
            </Button>
          </GiveawayModal>
          <DeleteGiveawayDialog
            giveaway={row.original}
            onSuccess={() => toast.success('Giveaway supprimé avec succès')}
          >
            <Button variant="ghost" size="icon">
              <Trash2Icon />
            </Button>
          </DeleteGiveawayDialog>
        </div>
      )
    },
  },
]
