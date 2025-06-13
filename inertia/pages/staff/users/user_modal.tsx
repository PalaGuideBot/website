import { useForm } from '@inertiajs/react'
import { Infer } from '@vinejs/vine/types'
import * as React from 'react'
import { toast } from 'sonner'

import type { userValidator } from '#staff/validators/user_validator'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { MultiSelect } from '~/components/ui/multi_select'
import { usePageSettings } from './page_settings'

type User = Infer<typeof userValidator>

interface UserModalProps {
  children: React.ReactNode
  user?: User
}

const UserModal = ({ children, user }: UserModalProps) => {
  const { roles } = usePageSettings()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const form = useForm(
    user
      ? { ...user, roles: user.roles.map((role) => role.name) }
      : {
          discordId: '',
          roles: [],
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

    if (user) {
      form.put(`/staff/users/${user.discordId}`, {
        preserveState: true,
        onSuccess: () => {
          setIsModalOpen(false)
          toast.success("L'utilisateur a bien été modifié")
        },
      })
    } else {
      form.post('/staff/users', {
        preserveState: true,
        onSuccess: () => {
          setIsModalOpen(false)
          toast.success("L'utilisateur a bien été ajouté")
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
        <DialogTitle>
          {user ? `Modifier l'utilisateur #${user.discordId}` : 'Ajouter un utilisateur'}
        </DialogTitle>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <FormItem>
              <FormLabel htmlFor="discord-id">ID</FormLabel>
              <Input
                id="discord-id"
                name="discordId"
                value={form.data.discordId}
                onChange={(event) => form.setData('discordId', event.target.value)}
                disabled={!!user}
              />
              <FormMessage message={form.errors.discordId} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="roles">Rôles</FormLabel>
              <MultiSelect
                modalPopover
                options={roles.map((role) => ({ label: role.label, value: role.name }))}
                onValueChange={(value) => form.setData('roles', value)}
                defaultValue={form.data.roles}
                placeholder="Choisissez un ou plusieurs rôles"
                variant="inverted"
              />
              <FormMessage message={form.errors.roles} />
            </FormItem>
            <div className="flex justify-end mt-2">
              <Button variant="secondary" disabled={form.processing}>
                {user ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { UserModal }
