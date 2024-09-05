import { InferPageProps } from '@adonisjs/inertia/types'

import type EventController from '#event/controllers/event_controller'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { QDFEventCard } from './components/qdf_event_card'

type EventIndexPageProps = InferPageProps<EventController, 'index'>

export default function EventIndexPage(props: EventIndexPageProps) {
  const { factionQuest } = props

  return (
    <>
      <Head descriptors={[{ title: 'Événements' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>&Eacute;vénements</PageTitle>
          <QDFEventCard event={factionQuest} />
        </Page>
      </DefaultLayout>
    </>
  )
}
