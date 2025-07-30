import { useState } from 'react'

import type { ClickerClickUpgrade } from '#tools/types'
import { SummerRushIcon } from '~/components/icons'
import { ConfettiButton, safeShapeFromText } from '~/components/magicui/confetti'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert_dialog'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getClickerUpgradeImage } from '~/lib/clicker'
import { formatNumber } from '~/lib/utils'
import { usePlayerClickerStore } from '../stores/player_clicker_store'
import { AccentText } from './accent_text'
import { useClickerSettings } from './clicker_settings'

const DEFAULT_CLICK: ClickerClickUpgrade = {
  name: 'click_0',
  label: 'Base Clic',
  price: 0,
  // SUMMER RUSH BOOST
  rate: 1 * (300 / 100),
  conditions: [],
}

export function ClickCard() {
  const { upgrades } = useClickerSettings()
  const playerClickerStore = usePlayerClickerStore()
  const [, setCount] = useState(0)
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false)

  const playerClicks = (playerClickerStore.data?.upgrades ?? [])
    .filter((upgrade) => upgrades.clicks.some((click) => click.name === upgrade))
    .toSorted(
      (a, b) =>
        upgrades.clicks.findIndex((c) => c.name === a) -
        upgrades.clicks.findIndex((c) => c.name === b)
    )

  const click = upgrades.clicks.find((c) => c.name === playerClicks.at(-1)) ?? DEFAULT_CLICK

  const onClick = () => {
    setCount((prev) => {
      const next = prev + 1

      if (next >= 5) {
        setIsWarningDialogOpen(true)
      }

      return next
    })
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Card className="p-0 grow basis-1/4">
        <CardContent className="pt-4 flex flex-1 items-center justify-center">
          <AlertDialog open={isWarningDialogOpen} onOpenChange={setIsWarningDialogOpen}>
            <ConfettiButton
              className="rounded-full size-20 hover:bg-transparent"
              variant="ghost"
              size="icon"
              onClick={onClick}
              options={{
                particleCount: 5,
                spread: 360,
                ticks: 120,
                gravity: 0,
                decay: 0.96,
                startVelocity: 20,
                // @ts-ignore - flat is not in the types
                flat: true,
                shapes: [safeShapeFromText({ text: '🚫', scalar: 4 })],
                scalar: 4,
              }}
            >
              <img
                className="opacity-100 group-hover:opacity-100 group-hover:scale-125 group-active:scale-110 transition-transform duration-75 w-16 h-auto object-cover"
                src={getClickerUpgradeImage({ type: 'click', data: click })}
              />
            </ConfettiButton>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Qu'est ce que tu fais ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Il n'y a pas un meilleur endroit où cliquer ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setCount(0)}>J'ai compris 😒</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      <Card className="pb-0 grow basis-1/2 text-nowrap">
        <CardHeader className="border-b">
          <CardTitle>Dernier clic débloqué</CardTitle>
        </CardHeader>
        <CardContent className="p-2 text-sm space-y-1.5">
          <p>
            Nom: <AccentText>{click.label}</AccentText>
          </p>
          <div className="flex gap-2 items-center">
            <p>
              Taux: <AccentText className="text-[#26b9ef]">{click.rate}</AccentText> par clic
            </p>
            <SummerRushIcon />
          </div>
          <p>
            Prix: <AccentText>{formatNumber(click.price, { notation: 'standard' })}</AccentText>{' '}
            coins
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
