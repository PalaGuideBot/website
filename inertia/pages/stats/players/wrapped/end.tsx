import type { InferPageProps } from '@adonisjs/inertia/types'
import { Button } from '@lemonsqueezy/wedges'
import { Loader2Icon, SaveIcon } from 'lucide-react'
import { useIsClient } from 'usehooks-ts'

import type PlayerController from '#stats/controllers/player_controller'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import ThemeToggler from '~/components/shared/theme_toggler'
import { Toaster } from '~/components/ui/toast'
import { useScreenshot } from '~/hooks/use_screenshot'
import { getHeadUrl } from '~/lib/minecraft'
import { WrappedCard } from '../components/wrapped_card'
import { WrappedNotAvailableBanner } from '../components/wrapped_not_available_banner'
import { WrappedPersonalization } from '../components/wrapped_personalization'
import { WrappedSettings } from '../components/wrapped_settings'

export type PlayerWrappedEndPageProps = InferPageProps<PlayerController, 'wrappedEnd'>

export default function PlayerWrappedEndPage(props: PlayerWrappedEndPageProps) {
  const { player } = props

  const isClient = useIsClient()

  const { ref, isLoading, takeScreenshot } = useScreenshot<HTMLDivElement>({
    filename: `${player?.username}_wrapped`,
  })

  if (!player) {
    return (
      <>
        <Head
          descriptors={[
            { title: 'Wrapped' },
            {
              name: 'description',
              content: 'Redécouvrez votre aventure sur Paladium au travers de ce Wrapped !',
            },
            {
              name: 'og:description',
              content: 'Redécouvrez votre aventure sur Paladium au travers de ce Wrapped !',
            },
          ]}
        />
        <main className="flex w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Page>
            <PageTitle>Paladium Wrapped</PageTitle>
            <p>Redécouvrez votre aventure sur Paladium au travers de ce Wrapped !</p>
            <WrappedNotAvailableBanner />
          </Page>
        </main>
      </>
    )
  }

  return (
    <>
      <Head
        descriptors={[
          { title: player.username },
          { name: 'og:image', content: getHeadUrl(player.username) },
          { name: 'twitter:image', content: getHeadUrl(player.username) },
        ]}
      />
      {isClient && (
        <WrappedSettings player={player}>
          <main className="min-h-screen w-full">
            <Page className="p-8 max-w-none lg:flex-row w-fit">
              <div className="max-w-xl flex flex-col gap-4">
                <div className="space-y-1.5 pb-8">
                  <PageTitle>Paladium Wrapped</PageTitle>
                  <p className="text-surface-300">
                    Sur la droite, vous trouverez un résumé des statistiques de votre aventure sur
                    la v10 de Paladium.
                  </p>
                  <p className="text-surface-300">
                    Vous pouvez le personnaliser et l'envoyer à vos amis.
                  </p>
                </div>
                <h3 className="font-bold text-xl">Personnalisation</h3>
                <WrappedPersonalization />
                <div className="flex flex-row gap-2">
                  <Button
                    variant="outline"
                    className="w-fit"
                    onClick={takeScreenshot}
                    disabled={isLoading}
                    before={
                      isLoading ? (
                        <Loader2Icon className="size-4 animate-spin" />
                      ) : (
                        <SaveIcon className="size-4" />
                      )
                    }
                  >
                    Sauvegarder
                  </Button>
                  <ThemeToggler variant="outline" className="aspect-square" />
                </div>
              </div>
              <WrappedCard ref={ref} player={player} />
            </Page>
          </main>
        </WrappedSettings>
      )}
      <Toaster />
    </>
  )
}
