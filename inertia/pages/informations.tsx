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
import { type Path } from '~/types'

export default function InformationsPage() {
  const paths: Array<Path> = [
    {
      title: 'Giveaway',
      description: 'Retrouvez les giveaways de PalaGuideBot.',
      path: '/giveaway',
    },
    {
      title: 'Politique de confidentialité',
      description: 'Consultez notre politique de confidentialité.',
      path: '/privacy',
    },
    {
      title: "Conditions d'utilisation",
      description: "Consultez nos conditions d'utilisation.",
      path: '/terms',
    },
    {
      title: 'Changelog',
      description: 'Consultez les dernières mises à jour.',
      path: '/changelog',
    },
  ]

  return (
    <>
      <Head
        title="Informations"
        description="Retrouvez ici toutes les informations concernant PalaGuideBot."
        defaultOg
      />
      <DefaultLayout>
        <Page>
          <PageTitle>Informations</PageTitle>
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
