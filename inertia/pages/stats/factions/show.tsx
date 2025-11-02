import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, usePage } from '@inertiajs/react'

import type { PageError } from '#app/types'
import type FactionController from '#stats/controllers/faction_controller'
import { DefaultLayout } from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'
import { FactionDetails } from './components/faction_details'
import { SearchFactionForm } from './components/search_faction_form'

export type FactionShowProps = InferPageProps<FactionController, 'show'>

export default function FactionShow(props: FactionShowProps) {
  const { faction, exampleFaction } = props
  const {
    props: { error },
  } = usePage<{ error?: PageError }>()

  return (
    <>
      {faction ? (
        <Head
          title={faction.bgName}
          descriptors={[
            { name: 'og:image', content: faction.emblemUrl },
            { name: 'twitter:image', content: faction.emblemUrl },
          ]}
        />
      ) : (
        <Head title="Faction" />
      )}
      <DefaultLayout>
        <Page>
          <PageTitle>Statistiques faction</PageTitle>
          <SearchFactionForm defaultValue={faction?.bgName ?? faction?.name} />
          {!error && !faction && (
            <div className="flex flex-col gap-2 [&>p]:text-sm sm:[&>p]:text-base">
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
          {error && !faction && (
            <DisplayError error={error} className="outline-0">
              <div className="space-y-1.5">
                <h3 className="font-semibold">Information complémentaire</h3>
                <p>
                  Des erreurs peuvent survenir lors du chargement d'une faction, si vous voulez plus
                  de précisions, consultez notre F.A.Q{' '}
                  <Link href="/faq" className="underline">
                    ici
                  </Link>
                  .
                </p>
              </div>
            </DisplayError>
          )}
          {faction && <FactionDetails faction={faction} />}
        </Page>
      </DefaultLayout>
    </>
  )
}
