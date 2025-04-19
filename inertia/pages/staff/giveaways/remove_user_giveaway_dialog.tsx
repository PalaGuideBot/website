import { Button } from '@lemonsqueezy/wedges'
import * as React from 'react'

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

interface RemoveUserGiveawayDialogProps {
  children: React.ReactNode
  onRemove?: () => void
}

export function RemoveUserGiveawayDialog({ children, onRemove }: RemoveUserGiveawayDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir retirer cet utilisateur ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action retirera l'utilisateur des participants.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button variant="secondary" onClick={onRemove}>
            Retirer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
