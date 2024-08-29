import { InferPageProps } from '@adonisjs/inertia/types'

import type EventController from '#event/controllers/event_controller'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

type EventIndexPageProps = InferPageProps<EventController, 'index'>

export default function EventIndexPage(props: EventIndexPageProps) {
  const { factionQuest } = props

  return (
    <>
      <Head descriptors={[{ title: 'Evènements' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>Evènements</PageTitle>
          <Card id="quete-de-faction">
            <CardHeader className="border-b">
              <CardTitle href="#quete-de-faction">Quête de faction</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <pre>{JSON.stringify(factionQuest, null, 2)}</pre>
            </CardContent>
          </Card>
        </Page>
      </DefaultLayout>
    </>
  )
}
