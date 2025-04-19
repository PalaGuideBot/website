import { Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import type { Infer } from '@vinejs/vine/types'
import * as React from 'react'

import type { userValidator } from '#staff/validators/user_validator'
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

interface DeleteUserDialogProps {
  children: React.ReactNode
  user: Infer<typeof userValidator>
  onSuccess?: (g: Infer<typeof userValidator>) => void
}

export function DeleteUserDialog({ children, user, onSuccess }: DeleteUserDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
            <span className="text-primary">{user.username}</span> ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible et supprimera définitivement l'utilisateur.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button variant="secondary" asChild>
            <Link
              href={`/staff/users/${user.discordId}`}
              method="delete"
              onSuccess={() => onSuccess?.(user)}
            >
              Supprimer
            </Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
