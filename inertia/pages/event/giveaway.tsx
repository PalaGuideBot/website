import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { HomeIcon } from 'lucide-react'

import type GiveawayController from '#event/controllers/giveaway_controller'
import { DiscordIcon } from '~/components/icons'
import { Head } from '~/components/shared/head'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Toaster } from '~/components/ui/toast'
import { GiveawayCardContent } from './components/giveaway_card_content'

const description = 'Un giveaway est en cours ! Participez pour tenter de gagner des récompenses'

export type GiveawayPageProps = InferPageProps<GiveawayController, 'index'>

export default function GiveawayPage(props: GiveawayPageProps) {
  const { giveaway, state } = props

  return (
    <>
      <Head
        descriptors={[
          { title: 'Giveaway' },
          {
            name: 'description',
            content: giveaway ? description : 'Aucun giveaway actif',
          },
          {
            name: 'og:description',
            content: giveaway ? description : 'Aucun giveaway actif',
          },
        ]}
      />
      <main className="min-h-dvh w-full flex items-center justify-center bg-muted">
        <div className="max-w-2xl w-full flex flex-col gap-2 px-2">
          <Card className="p-0 relative rounded-xl bg-background border-0 shadow-xl">
            <CardHeader className="p-4 sm:p-8">
              <img
                src="https://image.palaguidebot.fr/banner/bot.webp"
                className="object-contain rounded-md"
              />
            </CardHeader>
            {giveaway ? (
              <GiveawayCardContent giveaway={giveaway} state={state!} />
            ) : (
              <CardContent className="p-4 sm:p-8 pt-0!">
                <h1 className="text-center font-bold text-xl sm:text-2xl">
                  Aucun giveaway actif 😔
                </h1>
              </CardContent>
            )}
          </Card>
          <div className="flex flex-row items-center justify-between gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">
                <HomeIcon />
                Retour à l'accueil
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href="/discord" target="_blank">
                <DiscordIcon />
                Rejoindre le Discord
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  )
}
