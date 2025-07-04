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

export default function ToolsIndexPage() {
  const paths: Array<Path> = [
    {
      title: 'Clicker',
      description: 'Progressez rapidement dans le clicker en vous aidant de cet outil.',
      path: '/tools/clicker',
    },
    {
      title: 'Job Calculator',
      description:
        "Calculez l'xp et visualisez les éléments dont vous avez besoin pour progresser dans vos métiers.",
      path: '/tools/job-calculator',
    },
    {
      title: 'POG Calculator',
      description:
        "Calculez l'expérience et visualisez les éléments dont vous avez besoin pour améliorer votre pioche.",
      path: '/tools/pog-calculator',
    },
  ]

  return (
    <>
      <Head descriptors={[{ title: 'Outils' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>Outils</PageTitle>
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
