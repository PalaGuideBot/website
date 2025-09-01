import type { InferPageProps } from '@adonisjs/inertia/types'
import { Loader2Icon, SaveIcon } from 'lucide-react'
import { useIsClient } from 'usehooks-ts'

import type PlayerController from '#stats/controllers/player_controller'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { ThemeToggler } from '~/components/shared/theme_toggler'
import { Button } from '~/components/ui/button'
import { Toaster } from '~/components/ui/toast'
import { useScreenshot } from '~/hooks/use_screenshot'
import { getHeadUrl } from '~/lib/minecraft'
import { WrappedCard } from '../components/wrapped_card'
import { WrappedPersonalization } from '../components/wrapped_personalization'
import { WrappedSettings } from '../components/wrapped_settings'

export type PlayerWrappedEndPageProps = InferPageProps<PlayerController, 'wrappedEnd'>

export default function PlayerWrappedEndPage(props: PlayerWrappedEndPageProps) {
  const { player } = props

  const isClient = useIsClient()

  const { ref, isLoading, takeScreenshot } = useScreenshot<HTMLDivElement>({
    filename: `${player?.username}_wrapped`,
  })

  return (
    <>
      <Head
        title={player.username}
        descriptors={[
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
                  <p className="text-muted-foreground">
                    Sur la droite, vous trouverez un résumé des statistiques de votre aventure sur
                    la v10.5 de Paladium.
                  </p>
                  <p className="text-muted-foreground">
                    Vous pouvez le personnaliser et l'envoyer à vos amis.
                  </p>
                </div>
                <h3 className="font-bold text-xl">Personnalisation</h3>
                <WrappedPersonalization />
                <div className="flex flex-row gap-2 items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-fit"
                    onClick={takeScreenshot}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2Icon className="animate-spin" /> : <SaveIcon />}
                    Sauvegarder
                  </Button>
                  <ThemeToggler variant="outline" />
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
