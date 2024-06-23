import DefaultLayout from '~/components/layouts/default'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import {
  PathCard,
  PathCardContent,
  PathCardDescription,
  PathCardTitle,
  PathCardWrapper,
} from '~/components/shared/path_card'
import { Path } from '~/types'

export default function StatsIndexPage() {
  const paths: Array<Path> = [
    {
      title: 'Joueurs',
      description: "Consultez les statistiques d'un joueur.",
      path: '/stats/users',
    },
    {
      title: 'Factions',
      description: "Consultez les statistiques d'une faction.",
      path: '/stats/factions',
    },
  ]

  return (
    <>
      <Head title="Statistiques" />
      <DefaultLayout>
        <Page>
          <PageTitle>Statistiques</PageTitle>
          <PathCardWrapper>
            {paths.map((path) => (
              <PathCard key={path.path}>
                <PathCardContent>
                  <PathCardTitle href={path.path} external={path.external}>
                    {path.title}
                  </PathCardTitle>
                  <PathCardDescription>{path.description}</PathCardDescription>
                </PathCardContent>
              </PathCard>
            ))}
          </PathCardWrapper>
        </Page>
      </DefaultLayout>
    </>
  )
}
