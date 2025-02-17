import { InferPageProps } from '@adonisjs/inertia/types'

import type EventController from '#event/controllers/event_controller'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { DailyEventsCard } from './components/daily_events_card'
import { PaladiumNextVersion } from '~/components/shared/paladium_next_version'
// import { OnYourMarksEventCard } from './components/on_your_marks_event_card'
// import { QDFEventCard } from './components/qdf_event_card'

type EventIndexPageProps = InferPageProps<EventController, 'index'>

export default function EventIndexPage(props: EventIndexPageProps) {
  const { /* factionQuest, factionOnYourMarks, */ dailyEvents } = props

  return (
    <>
      <Head descriptors={[{ title: 'Événements' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>&Eacute;vénements</PageTitle>
          <PaladiumNextVersion />
          {/* <QDFEventCard event={factionQuest} /> */}
          {/* <OnYourMarksEventCard event={factionOnYourMarks} /> */}
          <DailyEventsCard events={dailyEvents} />
        </Page>
      </DefaultLayout>
    </>
  )
}
