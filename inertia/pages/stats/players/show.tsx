import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, usePage } from '@inertiajs/react'
import { Alert, Button } from '@lemonsqueezy/wedges'
import { PackageIcon } from 'lucide-react'

import type { PageError } from '#app/types'
import type PlayerController from '#stats/controllers/player_controller'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DateRangeSelector } from '~/components/shared/date_range_selector'
import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { useAuth } from '~/hooks/use_auth'
import { getHeadUrl } from '~/lib/minecraft'
import { PlayerDetails } from './components/player_details'
import { SearchPlayerForm } from './components/search_player_form'

export type PlayerShowProps = InferPageProps<PlayerController, 'show'>

export default function PlayerShow(props: PlayerShowProps) {
  const { player, examplePlayer, options } = props

  const {
    props: { error },
  } = usePage<{ error?: PageError }>()
  const auth = useAuth()

  return (
    <>
      {player ? (
        <Head
          descriptors={[
            { title: player.username },
            { name: 'og:image', content: getHeadUrl(player.username) },
            { name: 'twitter:image', content: getHeadUrl(player.username) },
          ]}
        />
      ) : (
        <Head descriptors={[{ title: 'Joueur' }]} />
      )}
      <DefaultLayout className="p-0 gap-0 lg:p-0 lg:gap-0">
        {auth && examplePlayer && (
          <Alert
            className="rounded-none min-h-[60px] border-b"
            closable
            after={
              <Button variant="tertiary" className="px-4 text-nowrap" size="sm" asChild>
                <Link href="/profile">Associer un compte</Link>
              </Button>
            }
          >
            Associez votre compte Minecraft pour afficher vos statistiques par défaut.
          </Alert>
        )}
        <Page className="p-4 lg:p-6">
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <PageTitle>Statistiques de joueur</PageTitle>
            <div className="flex flex-row items-center gap-2">
              {player && (
                <Tooltip>
                  <TooltipProvider>
                    <TooltipTrigger asChild>
                      <Button variant="outline" isIconOnly className="h-10 aspect-square" asChild>
                        <Link href={`/wrapped/${player.username}`}>
                          <PackageIcon className="size-4 " />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Wrapped</TooltipContent>
                  </TooltipProvider>
                </Tooltip>
              )}
              <DateRangeSelector defaultOptions={options} />
            </div>
          </div>
          <SearchPlayerForm
            defaultValue={player?.username}
            path={(username) => `/players/${username}`}
          />
          {!error && !player && (
            <div className="flex flex-col gap-2 [&>p]:text-sm xs:[&>p]:text-base">
              <PageSubTitle>Informations</PageSubTitle>
              <p>
                Pour commencer à voir les statistiques, tapez le pseudo d'un joueur sur la barre de
                recherche au-dessus.
              </p>
              <p>
                Cet outil permet d'afficher les statistiques avancées d'un joueur jouant à Paladium.
                On y retrouve des statistiques telles que l'évolution des niveaux de métier,
                l'argent, et le temps de jeu.
              </p>
              <p>
                On a également l'historique de sa faction et de son rang. Toutes ces informations
                seront présentées sous forme d'une page intuitive et facile à lire.
              </p>
              {examplePlayer && (
                <>
                  <p>Un exemple de joueur est disponible juste en dessous.</p>
                  <PageSubTitle>Exemple</PageSubTitle>
                  <PlayerDetails player={examplePlayer} />
                </>
              )}
            </div>
          )}
          {error && !player && (
            <DisplayError error={error} className="outline-0">
              <div className="space-y-1.5">
                <h3 className="font-semibold">Information complémentaire</h3>
                <p>
                  Des erreurs peuvent survenir lors du chargement d'un joueur, si vous voulez plus
                  de précisions, consultez notre F.A.Q{' '}
                  <Link href="/faq" className="underline">
                    ici
                  </Link>
                  .
                </p>
              </div>
            </DisplayError>
          )}
          {player && <PlayerDetails player={player} />}
        </Page>
      </DefaultLayout>
    </>
  )
}
