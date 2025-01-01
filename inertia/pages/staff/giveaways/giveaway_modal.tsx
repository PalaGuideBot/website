import { useForm } from '@inertiajs/react'
import { Button, Checkbox } from '@lemonsqueezy/wedges'
import { Infer } from '@vinejs/vine/types'
import * as React from 'react'
import { toast } from 'sonner'

import type { giveawayValidator } from '#event/validators/giveaway_validator'
import { DateTimeInput } from '~/components/ui/datetime_input'
import {
  Dialog,
  DialogContentWithoutOverlay,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import Input from '~/components/ui/input'
import { TagsInput } from '~/components/ui/tags_input'
import { DateTime } from '~/lib/luxon'

type Giveaway = Infer<typeof giveawayValidator>

interface GiveawayModalProps {
  children: React.ReactNode
  giveaway?: Giveaway
}

const GiveawayModal = ({ children, giveaway }: GiveawayModalProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const form = useForm(
    giveaway
      ? {
          title: giveaway.title,
          start: DateTime.fromISO(giveaway.start).toJSDate()!,
          end: DateTime.fromISO(giveaway.end).toJSDate()!,
          active: giveaway.active,
          prizes: giveaway.prizes,
        }
      : {
          title: '',
          start: DateTime.now().toJSDate(),
          end: DateTime.now().toJSDate(),
          active: false,
          prizes: [] as string[],
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

    form.transform((data) => ({
      ...data,
      start: DateTime.fromJSDate(data.start).toFormat('yyyy-MM-dd HH:mm:ss'),
      end: DateTime.fromJSDate(data.end).toFormat('yyyy-MM-dd HH:mm:ss'),
    }))

    if (giveaway) {
      form.put(`/staff/giveaways/${giveaway._id}`, {
        preserveState: true,
        onSuccess: () => {
          setIsModalOpen(false)
          toast.success('Le giveaway a bien été modifié')
        },
      })
    } else {
      form.post('/staff/giveaways', {
        preserveState: true,
        onSuccess: () => {
          setIsModalOpen(false)
          toast.success('Le giveaway a bien été ajouté')
        },
      })
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentWithoutOverlay
        onOpenAutoFocus={(event) => event.preventDefault()}
        aria-describedby="modal-description"
        animation="right-to-left"
        className="flex flex-col gap-2 translate-x-0 translate-y-0 left-auto right-0 top-14 bottom-0 border-r-0"
      >
        <DialogTitle>
          {giveaway ? `Modifier le giveaway ${giveaway.title}` : 'Ajouter un giveaway'}
        </DialogTitle>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <FormItem>
              <FormLabel htmlFor="title">Titre</FormLabel>
              <Input
                id="title"
                name="title"
                value={form.data.title}
                onChange={(event) => form.setData('title', event.target.value)}
              />
              <FormMessage message={form.errors.title} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="start">Date de début</FormLabel>
              <DateTimeInput
                hideCalendarIcon
                format="dd/MM/yyyy HH:mm:ss"
                value={form.data.start}
                onChange={(date) => date && form.setData('start', date)}
              />
              <FormMessage message={form.errors.start} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="end">Date de fin</FormLabel>
              <DateTimeInput
                hideCalendarIcon
                format="dd/MM/yyyy HH:mm:ss"
                value={form.data.end}
                onChange={(date) => date && form.setData('end', date)}
              />
              <FormMessage message={form.errors.end} />
            </FormItem>
            {giveaway && (
              <FormItem>
                <Checkbox.Root className="items-center text-sm" asChild>
                  <label>
                    <Checkbox.Item
                      onCheckedChange={(checked) => form.setData('active', Boolean(checked))}
                      checked={form.data.active}
                    />
                    <span>Définir comme giveaway actif</span>
                  </label>
                </Checkbox.Root>
                <FormMessage message={form.errors.active} />
              </FormItem>
            )}
            <FormItem>
              <FormLabel htmlFor="prizes">Lots</FormLabel>
              <TagsInput
                placeholder="Renseignez les lots"
                value={form.data.prizes}
                onValueChange={(value) => {
                  form.setData('prizes', value)
                }}
              />
              <FormMessage message={form.errors.prizes} />
            </FormItem>
            <div className="flex justify-end mt-2">
              <Button variant="secondary" disabled={form.processing}>
                {giveaway ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContentWithoutOverlay>
    </Dialog>
  )
}

export { GiveawayModal }
