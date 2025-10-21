import { InferPageProps } from '@adonisjs/inertia/types'

import type EventController from '#event/controllers/event_controller'
import { DefaultLayout } from '~/components/layouts/default'
import { Page, PageTitle } from '~/components/page'
import { HalloweenEyes } from '~/components/shared/halloween_decorations'
import { Head } from '~/components/shared/head'
import SpiderWeb from '~/components/shared/spider_web'
import { DailyEventsCard } from './components/daily_events_card'
import { OnYourMarksEventCard } from './components/on_your_marks_event_card'
import { QDFEventCard } from './components/qdf_event_card'

type EventIndexPageProps = InferPageProps<EventController, 'index'>

export default function EventIndexPage(props: EventIndexPageProps) {
  const { factionQuest, factionOnYourMarks, dailyEvents } = props

  return (
    <>
      <Head
        title="Événements"
        description="Suivez les événements en cours et à venir sur Paladium."
        defaultOg
      />
      <DefaultLayout>
        <Page>
          <PageTitle>&Eacute;vénements</PageTitle>
          <SpiderWeb />
          <QDFEventCard event={factionQuest} />
          <OnYourMarksEventCard event={factionOnYourMarks} />
          <DailyEventsCard events={dailyEvents} />
        </Page>
      </DefaultLayout>
      <HalloweenEyes />
    </>
  )
}
