import { Link } from '@inertiajs/react'
import type { Infer } from '@vinejs/vine/types'
import * as React from 'react'

import type { userRoleValidator } from '#staff/validators/user_validator'
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
import { Button } from '~/components/ui/button'

interface DeleteRoleDialogProps {
  children: React.ReactNode
  role: Infer<typeof userRoleValidator>
  onSuccess?: (g: Infer<typeof userRoleValidator>) => void
}

export function DeleteRoleDialog({ children, role, onSuccess }: DeleteRoleDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer le rôle{' '}
            <span className="text-primary">{role.label}</span> ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible et supprimera définitivement le rôle.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button variant="secondary" asChild>
            <Link
              href={`/staff/roles/${role.name}`}
              method="delete"
              onSuccess={() => onSuccess?.(role)}
            >
              Supprimer
            </Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
