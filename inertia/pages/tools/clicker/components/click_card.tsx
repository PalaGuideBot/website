import { Button } from '@lemonsqueezy/wedges'
import { useState } from 'react'

import type { ClickerClickUpgrade } from '#tools/types'
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
import { useClickerSettings } from './clicker_settings'
import { AccentText } from './accent_text'

const DEFAULT_CLICK: ClickerClickUpgrade = {
  name: 'click_0',
  label: 'Base Clic',
  price: 0,
  rate: 1,
  conditions: [],
}

interface ClickCardProps {}

const ClickCard = ({}: ClickCardProps) => {
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
      <Card className="flex flex-col flex-grow basis-1/4">
        <CardContent className="pt-4 flex flex-1 items-center justify-center">
          <AlertDialog open={isWarningDialogOpen} onOpenChange={setIsWarningDialogOpen}>
            <ConfettiButton
              className="size-20 hover:bg-transparent"
              variant="transparent"
              shape="pill"
              isIconOnly
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
                <AlertDialogAction asChild>
                  <Button variant="tertiary" onClick={() => setCount(0)}>
                    J'ai compris 😒
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      <Card className="flex-grow basis-1/2 text-nowrap">
        <CardHeader className="border-b p-2.5">
          <CardTitle>Dernier clic débloqué</CardTitle>
        </CardHeader>
        <CardContent className="p-2 text-sm space-y-1.5">
          <p>
            Nom: <AccentText>{click.label}</AccentText>
          </p>
          <p>
            Taux: <AccentText>{click.rate}</AccentText> par clic
          </p>
          <p>
            Prix: <AccentText>{formatNumber(click.price, { notation: 'standard' })}</AccentText>{' '}
            coins
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export { ClickCard }
