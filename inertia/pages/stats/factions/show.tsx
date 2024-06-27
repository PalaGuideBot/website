import type FactionsController from '#stats/controllers/factions_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'
import { FactionDetails } from './components/faction_details'
import { SearchFactionForm } from './components/search_faction_form'

export type FactionShowProps = InferPageProps<FactionsController, 'show'>

export default function FactionShow(props: FactionShowProps) {
  const { faction, exampleFaction } = props
  const {
    props: { error },
  } = usePage<{ error?: string }>()

  return (
    <>
      {faction ? (
        <Head title={faction.name}>
          <meta property="og:image" content={faction.emblemUrl} />
          <meta name="twitter:image" content={faction.emblemUrl} />
        </Head>
      ) : (
        <Head title="Faction" />
      )}
      <DefaultLayout>
        <Page>
          <PageTitle>Statistiques faction</PageTitle>
          <SearchFactionForm defaultValue={faction?.bgName ?? faction?.name} />
          {!error && !faction && (
            <div className="flex flex-col gap-2 [&>p]:text-sm xs:[&>p]:text-base">
              <PageSubTitle>Informations</PageSubTitle>
              <p>
                Pour commencer à voir les statistiques, tapez le nom d'une faction sur la barre de
                recherche au-dessus.
              </p>
              {exampleFaction && (
                <>
                  <p>Un exemple de faction est disponible juste en dessous.</p>
                  <PageSubTitle>Exemple</PageSubTitle>
                  <FactionDetails faction={exampleFaction} />
                </>
              )}
            </div>
          )}
          {error && !faction && <DisplayError>{error}</DisplayError>}
          {faction && <FactionDetails faction={faction} />}
        </Page>
      </DefaultLayout>
    </>
  )
}
