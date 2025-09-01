import { DefaultLayout } from '~/components/layouts/default'
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

export default function LeaderboardIndexPage() {
  const paths: Array<Path> = [
    {
      title: 'Factions',
      description: 'Consultez le classement des factions les mieux classées.',
      path: '/leaderboard/factions',
    },
    {
      title: 'Money',
      description: 'Consultez le classement des joueurs les plus riches.',
      path: '/leaderboard/money',
    },
    {
      title: 'Trixium',
      description:
        'Consultez le classement des joueurs et factions les plus hauts dans le trixium.',
      path: '/leaderboard/trixium',
    },
    {
      title: 'Clicker',
      description: 'Consultez le classement des joueurs qui cliquent le plus.',
      path: '/leaderboard/clicker',
    },
    {
      title: 'Boss',
      description: 'Consultez le classement des joueurs qui tuent le plus de boss.',
      path: '/leaderboard/boss',
    },
    {
      title: 'EggHunt',
      description:
        "Consultez le classement des joueurs qui ont tenu plus longtemps lors de l'event EggHunt.",
      path: '/leaderboard/egghunt',
    },
    {
      title: 'Koth',
      description: 'Consultez le classement des joueurs qui ont gagnés le King Of The Hill (KOTH).',
      path: '/leaderboard/koth',
    },
    {
      title: 'Alignement',
      description:
        "Consultez le classement des joueurs ayant capturés le plus de chunk de l'alignement.",
      path: '/leaderboard/alignement',
    },
    {
      title: 'Métiers',
      description: 'Consultez le classement des joueurs qui ont le plus de niveau dans un métier.',
      path: '/leaderboard/jobs',
    },
  ]

  return (
    <>
      <Head
        title="Classements"
        description="Consultez les classements des meilleurs joueurs et factions sur Paladium."
        defaultOg
      />
      <DefaultLayout>
        <Page>
          <PageTitle>Classements</PageTitle>
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
