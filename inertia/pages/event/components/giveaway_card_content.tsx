import { Link, useForm } from '@inertiajs/react'
import type { Infer } from '@vinejs/vine/types'
import { CheckCircleIcon, XCircleIcon } from 'lucide-react'
import { useRef } from 'react'
import { toast } from 'sonner'

import type { giveawayStateValidator } from '#event/validators/giveaway_validator'
import Confetti, { ConfettiRef } from '~/components/magicui/confetti'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { CardContent, CardDescription, CardFooter } from '~/components/ui/card'
import { Spinner } from '~/components/ui/spinner'
import { useDateCountdown } from '~/hooks/use_date_countdown'
import { DateTime } from '~/lib/luxon'
import { GiveawayPageProps } from '../giveaway'
import { GiveawayPrize } from './giveaway_prize'
import { GiveawayUser } from './giveaway_user'

const END_MESSAGE_COUNTDOWN = 'Terminé !'
const MAX_USERS_DISPLAYED = 5

interface GiveawayCardContentProps {
  giveaway: NonNullable<Required<GiveawayPageProps['giveaway']>>
  state: Infer<typeof giveawayStateValidator>
}

export function GiveawayCardContent({ giveaway, state }: GiveawayCardContentProps) {
  const confettiRef = useRef<ConfettiRef>(null)
  const [countdown] = useDateCountdown({
    countStart: DateTime.fromISO(giveaway.start).toMillis(),
    countStop: DateTime.fromISO(giveaway.end).toMillis(),
    endMessage: END_MESSAGE_COUNTDOWN,
  })
  const form = useForm()

  const countdownIsOver = countdown === END_MESSAGE_COUNTDOWN
  const giveawayIsOver = DateTime.fromISO(giveaway.end) < DateTime.now()

  const onSubmit = () => {
    form.post('/giveaway/participate', {
      onSuccess() {
        setTimeout(() => confettiRef.current?.fire({ ticks: 120 }))
        toast.success('Votre participation a bien été prise en compte !')
      },
    })
  }

  return (
    <>
      <CardContent className="p-4 sm:p-8 pt-0! flex flex-col gap-2">
        <p className="text-center uppercase font-semibold tracking-wider">Giveaway Exclusif</p>
        {giveawayIsOver && giveaway.winners.length !== 0 ? (
          <>
            <p className="text-center text-2xl font-bold">Voici les gagnants:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {giveaway.winners.map((winner) => (
                <GiveawayUser key={winner.discordId} user={winner} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center font-bold text-xl sm:text-2xl">
              Gagnez des prix incroyables !
            </h1>
            <CardDescription className="text-center text-base pb-2">
              Ne ratez pas l'opportunité et participez.
            </CardDescription>
            <p className="text-center text-2xl font-bold">Temps restant:</p>
            <p
              className="text-center text-lg sm:text-2xl font-bold tabular-nums"
              suppressHydrationWarning
            >
              {countdown}
            </p>
          </>
        )}
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {giveaway.prizes.map((prize, index) => (
            <GiveawayPrize key={index} prize={prize} />
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <CardDescription>Personnes ayant participés:</CardDescription>
          {giveaway.participants.length > 0 ? (
            <AvatarGroup>
              {giveaway.participants.slice(0, MAX_USERS_DISPLAYED).map((participant) => (
                <Avatar key={participant.avatarUrl}>
                  <AvatarImage src={participant.avatarUrl} />
                </Avatar>
              ))}
              {giveaway.participants.length - MAX_USERS_DISPLAYED > 0 && (
                <Avatar>
                  <AvatarFallback>{`+${giveaway.participants.length - MAX_USERS_DISPLAYED}`}</AvatarFallback>
                </Avatar>
              )}
            </AvatarGroup>
          ) : (
            <p className="text-sm">Aucune</p>
          )}
        </div>
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 pointer-events-none size-full"
        />
      </CardContent>
      <CardFooter className="p-4 sm:p-8 pt-0">
        {!state.participated && (!countdownIsOver || !giveawayIsOver) && (
          <Button
            disabled={form.processing}
            onClick={onSubmit}
            variant="secondary"
            className="w-full text-lg"
          >
            {form.processing && <Spinner variant="circle" className="size-6" />}
            Participer
          </Button>
        )}
        {state.participated && (
          <ul>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="size-4 min-w-4 text-emerald-500" />
              <p className="text-sm">Votre participation à bien été prise en compte</p>
            </li>
            <li className="flex items-center gap-2">
              {state.linked ? (
                <CheckCircleIcon className="size-4 min-w-4 text-emerald-500" />
              ) : (
                <XCircleIcon className="size-4 min-w-4 text-destructive" />
              )}
              <p className="text-sm">
                <Link href="/profile" className="underline">
                  Liez votre compte Minecraft
                </Link>{' '}
                pour augmenter vos chances de gagner
              </p>
            </li>
          </ul>
        )}
      </CardFooter>
    </>
  )
}
