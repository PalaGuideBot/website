import { Link, router } from '@inertiajs/react'
import { Button, Loading } from '@lemonsqueezy/wedges'
import { Infer } from '@vinejs/vine/types'
import { HTTPError } from 'ky'
import { PartyPopperIcon } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import type { giveawayValidator } from '#event/validators/giveaway_validator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import Input from '~/components/ui/input'
import { client } from '~/lib/client'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { GiveawayPrize } from '~/pages/event/components/giveaway_prize'
import { GiveawayUser } from '~/pages/event/components/giveaway_user'

type Giveaway = Infer<typeof giveawayValidator>

interface GiveawayDrawModalProps {
  children: React.ReactNode
  giveaway: Giveaway
}

const GiveawayDrawModal = ({ children, giveaway }: GiveawayDrawModalProps) => {
  const [drawStatus, setDrawStatus] = React.useState('pending')
  const [count, setCount] = React.useState(1)

  const giveawayIsOver = DateTime.fromISO(giveaway.end) < DateTime.now()

  const onDraw = async () => {
    setDrawStatus('loading')
    try {
      const response = await client
        .post(`staff/giveaways/${giveaway._id}/draw`, {
          body: JSON.stringify({ count }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .json<{ message: string }>()
      toast.success(response.message)
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const message = await error.response.json<{ message: string }>()
        toast.error(message.message)
      }
    } finally {
      setDrawStatus('pending')
      router.reload()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        aria-describedby="modal-description"
        className="max-w-3xl"
      >
        <DialogTitle>{`Giveaway: ${giveaway.title}`}</DialogTitle>
        <DialogDescription>
          Informations sur le giveaway et possibilité de tirer au sort les gagnants.
        </DialogDescription>
        <dl className="grid grid-cols-2 gap-4">
          <dt className="font-semibold">ID</dt>
          <dd>{giveaway._id}</dd>
          <dt className="font-semibold">Titre</dt>
          <dd>{giveaway.title}</dd>
          <dt className="font-semibold">Actif</dt>
          <dd>{giveaway.active ? 'Oui' : 'Non'}</dd>
          <dt className="font-semibold">Date de début</dt>
          <dd>{formatDate(giveaway.start)}</dd>
          <dt className="font-semibold">Date de fin</dt>
          <dd>{formatDate(giveaway.end)}</dd>
          <dt className="font-semibold col-span-2">Lots</dt>
          <dd className="col-span-2 flex flex-wrap gap-2">
            {giveaway.prizes.map((prize) => (
              <GiveawayPrize key={prize} prize={prize} />
            ))}
          </dd>
          <dt className="font-semibold col-span-2">Participants</dt>
          <dd className="col-span-2 flex flex-wrap gap-2">
            {giveaway.participants.length !== 0 ? (
              giveaway.participants.map((user) => <GiveawayUser key={user.discordId} user={user} />)
            ) : (
              <p>Aucun participant</p>
            )}
          </dd>
          {giveaway.winners.length !== 0 && (
            <>
              <dt className="font-semibold col-span-2">Gagnants</dt>
              <dd className="col-span-2 flex flex-wrap gap-2">
                {giveaway.winners.map((user) => (
                  <GiveawayUser key={user.discordId} user={user} />
                ))}
              </dd>
            </>
          )}
          <dt className="font-semibold">Actions</dt>
          <dd className="flex items-center gap-2 flex-wrap">
            <Input
              autoComplete="none"
              inputMode="numeric"
              type="number"
              min={1}
              disabled={drawStatus === 'loading' || !giveawayIsOver}
              className="bg-transparent h-8 px-1 max-w-16 text-center"
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
            />
            <Button
              disabled={drawStatus === 'loading' || !giveawayIsOver}
              size="sm"
              variant="outline"
              before={
                drawStatus === 'loading' ? (
                  <Loading size="sm" />
                ) : (
                  <PartyPopperIcon className="size-4" />
                )
              }
              onClick={onDraw}
            >
              Tirer au sort
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/giveaway">Accéder à la page</Link>
            </Button>
          </dd>
        </dl>
      </DialogContent>
    </Dialog>
  )
}

export { GiveawayDrawModal }
