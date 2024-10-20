import { Badge } from '@lemonsqueezy/wedges'
import { Infer } from '@vinejs/vine/types'
import * as React from 'react'

import type { dailyEventsValidator } from '#event/validators/event_validator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel'
import { getEventImage } from '~/content/events'
import { translateWeekday } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { cn } from '~/lib/utils'

interface EventCardProps extends React.ComponentProps<typeof Card> {
  event: Infer<typeof dailyEventsValidator>[number]['events'][number]
}

const EventCard = ({ event, className, style, ...props }: EventCardProps) => {
  return (
    <Card
      className={cn(
        'relative w-full min-w-[280px] h-32 bg-cover bg-center bg-no-repeat mix-blend-plus-darker',
        className
      )}
      style={{
        backgroundImage: `url(${getEventImage(event.id)})`,
        ...style,
      }}
      {...props}
    >
      <Badge
        shape="pill"
        stroke
        className="absolute top-4 left-4 font-mc-dungueons tracking-wide text-xs dark:text-white dark:wg-bg-wg-black pointer-events-none"
      >
        {event.name}
      </Badge>
      <p className="absolute bottom-4 left-4 font-bold">{event.time}</p>
    </Card>
  )
}

interface DailyEventsCardProps extends React.ComponentProps<typeof Card> {
  events: Infer<typeof dailyEventsValidator>
}

const DailyEventsCard = ({ events, ...props }: DailyEventsCardProps) => {
  const [api, setApi] = React.useState<CarouselApi>()

  const today = DateTime.now().toFormat('cccc', { locale: 'en' }).toLowerCase()

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.scrollTo(events.findIndex((event) => event.day === today))
  }, [api])

  return (
    <Card {...props}>
      <Carousel setApi={setApi}>
        <CardHeader className="flex flex-row gap-4 items-center justify-between border-b space-y-0">
          <div className="space-y-1.5">
            <CardTitle>&Eacute;vénements quotidien</CardTitle>
            <CardDescription>
              Participez aux événements quotidien pour tenter de recevoir diverses récomponses.
            </CardDescription>
          </div>
          <div className="flex flex-row gap-2">
            <CarouselPrevious suppressHydrationWarning className="static translate-y-0" />
            <CarouselNext suppressHydrationWarning className="static translate-y-0" />
          </div>
        </CardHeader>
        <CardContent className="pt-4 px-0">
          <CarouselContent className="mx-4 -ml-1">
            {events.map((event) => (
              <CarouselItem
                key={event.day}
                className={cn(
                  'sm:basis-1/2 md:basis-1/3 opacity-15 hover:opacity-100 transition-opacity duration-200',
                  today === event.day && 'opacity-100'
                )}
              >
                <div className="flex flex-col">
                  <h3
                    className={cn(
                      'text-center uppercase',
                      today === event.day && 'font-bold drop-shadow-glow'
                    )}
                  >
                    {today === event.day ? "Aujourd'hui" : translateWeekday(event.day)}
                  </h3>
                  <div className="pt-4 flex flex-col gap-4">
                    {event.events.map((dailyEvent) => (
                      <EventCard key={`${dailyEvent.id}-${dailyEvent.time}`} event={dailyEvent} />
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </CardContent>
      </Carousel>
    </Card>
  )
}

export { DailyEventsCard }
