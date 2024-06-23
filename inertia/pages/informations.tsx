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

export default function InformationsPage() {
  const paths: Array<Path> = [
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
      title: 'Changelogs',
      description: 'Consultez les dernières mises à jour.',
      path: '/changelogs',
    },
  ]

  return (
    <>
      <Head title="Informations" />
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
