import { Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import type { Infer } from '@vinejs/vine/types'
import * as React from 'react'

import type { giveawayValidator } from '#event/validators/giveaway_validator'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert_dialog'

interface DeleteGiveawayDialogProps {
  children: React.ReactNode
  giveaway: Infer<typeof giveawayValidator>
  onSuccess?: (g: Infer<typeof giveawayValidator>) => void
}

export function DeleteGiveawayDialog({ children, giveaway, onSuccess }: DeleteGiveawayDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer le giveaway{' '}
            <span className="text-primary">{giveaway.title}</span> ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible et supprimera définitivement le giveaway.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button variant="secondary" asChild>
            <Link
              href={`/staff/giveaways/${giveaway._id}`}
              method="delete"
              onSuccess={() => onSuccess?.(giveaway)}
            >
              Supprimer
            </Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
