import { useForm } from '@inertiajs/react'
import { type Infer } from '@vinejs/vine/types'
import * as React from 'react'
import { toast } from 'sonner'

import type { userRoleValidator } from '#staff/validators/user_validator'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

type Role = Infer<typeof userRoleValidator>

interface RoleModalProps {
  children: React.ReactNode
  role?: Role
}

export function RoleModal({ children, role }: RoleModalProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const form = useForm(
    role
      ? { ...role }
      : {
          name: '',
          label: '',
          priority: 0,
          description: '',
        }
  )

  const onOpenChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen)

    if (form.isDirty && !isOpen) {
      form.reset()
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (role) {
      form.put(`/staff/roles/${role.name}`, {
        preserveState: true,
        onSuccess: () => {
          setIsModalOpen(false)
          toast.success('Le rôle a bien été modifié')
        },
      })
    } else {
      form.post('/staff/roles', {
        preserveState: true,
        onSuccess: () => {
          setIsModalOpen(false)
          toast.success('Le rôle a bien été ajouté')
        },
      })
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        transparentOverlay
        onOpenAutoFocus={(event) => event.preventDefault()}
        aria-describedby="modal-description"
        animation="right-to-left"
        className="flex flex-col gap-2 translate-x-0 translate-y-0 left-auto right-0 top-14 bottom-0 border-r-0"
      >
        <DialogTitle>{role ? `Modifier le rôle ${role.name}` : 'Ajouter un rôle'}</DialogTitle>
        <DialogDescription className="sr-only">Modification d'un rôle</DialogDescription>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <FormItem>
              <FormLabel htmlFor="name">Nom</FormLabel>
              <Input
                id="name"
                name="name"
                value={form.data.name}
                onChange={(event) => form.setData('name', event.target.value)}
              />
              <FormMessage message={form.errors.name} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="label">Label</FormLabel>
              <Input
                id="label"
                name="label"
                value={form.data.label}
                onChange={(event) => form.setData('label', event.target.value)}
              />
              <FormMessage message={form.errors.label} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="priority">Priorité</FormLabel>
              <Input
                id="priority"
                name="priority"
                type="number"
                value={form.data.priority}
                onChange={(event) => form.setData('priority', Number(event.target.value))}
              />
              <FormMessage message={form.errors.priority} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                name="description"
                value={form.data.description}
                onChange={(event) =>
                  form.setData('description', (event.target as HTMLTextAreaElement).value)
                }
              />
              <FormMessage message={form.errors.description} />
            </FormItem>
            <div className="flex justify-end mt-2">
              <Button variant="secondary" disabled={form.processing}>
                {role ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
