import type { Infer } from '@vinejs/vine/types'
import * as React from 'react'

import type { playerWrappedValidator } from '#stats/validators/player_validator'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { banners } from '~/content/banner'
import { DateTime } from '~/lib/luxon'
import { getFullBobyUrl } from '~/lib/minecraft'
import { cn } from '~/lib/utils'
import {
  WrappedMetricCard,
  WrappedMetricCardContent,
  WrappedMetricCardDelete,
  WrappedMetricCardDroppable,
  WrappedMetricCardTitle,
} from './wrapped_metric_card'
import { metrics } from './wrapped_metrics'
import { useWrappedSettings } from './wrapped_settings'

interface WrappedCardProps extends React.ComponentProps<typeof Card> {
  player: Infer<typeof playerWrappedValidator>
}

export function WrappedCard({ player, className, ...props }: WrappedCardProps) {
  const { banner, slots, changeSlot } = useWrappedSettings()

  const today = DateTime.now()

  return (
    <Card
      className={cn(
        'p-0 min-w-[672px] h-fit rounded-none border-0 bg-[#f7f7f8] dark:bg-[#2a2a2f]',
        className
      )}
      {...props}
    >
      <CardContent className="px-0 flex flex-col gap-8">
        <div
          className="relative flex flex-row px-8 gap-4 items-center justify-around h-52"
          style={{
            backgroundImage: banner !== 'none' ? `url(${banners[banner]})` : undefined,
          }}
        >
          <div className="overflow-hidden bg-background/80 size-40 rounded-xl border-y">
            <div>
              <img
                src={getFullBobyUrl(player.uuid, 'front')}
                alt={player.username}
                className="pt-6"
              />
            </div>
          </div>
          <p className="font-mc-dungueons text-center text-3xl drop-shadow-[0px_3px_0px_rgba(0,0,0,0.5)]">
            <span className="text-primary">{player.username}</span> sur la v10.5
            <br /> de Paladium
          </p>
        </div>
        <div className="px-8 grid grid-cols-2 gap-4">
          {Object.entries(slots).map(([slot, metricId]) => {
            const metric = metrics.find((m) => m.id === metricId)

            if (!metric) {
              return <WrappedMetricCardDroppable id={slot} key={slot} />
            }

            return (
              <WrappedMetricCard id={slot} key={slot}>
                <WrappedMetricCardDelete onClick={() => changeSlot(slot, '')} />
                <WrappedMetricCardTitle>{metric.title}</WrappedMetricCardTitle>
                <WrappedMetricCardContent>{metric.renderContent(player)}</WrappedMetricCardContent>
              </WrappedMetricCard>
            )
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between gap-2 p-8 pt-4 font-bold text-lg">
        <p className="uppercase">PalaGuideBot</p>
        <p>{today.year}</p>
      </CardFooter>
    </Card>
  )
}
