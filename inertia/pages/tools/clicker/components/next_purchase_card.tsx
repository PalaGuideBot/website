import { Button } from '@lemonsqueezy/wedges'
import { ShoppingCartIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getBuildingPrice, getClickerBuildingImage, getClickerUpgradeImage } from '~/lib/clicker'
import { formatNumber } from '~/lib/utils'
import { usePlayerClickerStore } from '../stores/player_clicker_store'
import { useClickerSettings } from './clicker_settings'
import { CoinWrapper } from './coin_wrapper'

interface NextPurchaseCardProps {}

const NextPurchaseCard = ({}: NextPurchaseCardProps) => {
  const { calculator } = useClickerSettings()
  const playerClickerStore = usePlayerClickerStore()

  const nextPurchase = playerClickerStore.data
    ? calculator.getBestBuildingOrUpgradeToBuy(playerClickerStore.data)
    : null

  const currentRps = playerClickerStore.getRps(calculator)

  const buy = () => {
    if (!nextPurchase) {
      return
    }

    switch (nextPurchase.type) {
      case 'building':
        playerClickerStore.adjustBuildingQuantity(nextPurchase.building.name, 1)
        break
      case 'upgrade':
        playerClickerStore.addUpgrade(nextPurchase.upgrade.data.name)
        break
    }
  }

  return (
    <Card>
      <CardHeader className="border-b p-2.5">
        <CardTitle>Achat le plus rentable</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm p-2">
        <div className="flex flex-row gap-2">
          {nextPurchase?.type === 'building' && (
            <>
              <img
                className="h-10 w-auto object-cover"
                src={getClickerBuildingImage(nextPurchase.building.name)}
              />
              <div className="flex flex-col flex-grow space-y-1">
                <p className="text-sm lg:text-xs xl:text-sm text-left">
                  {nextPurchase.building.label} - Level {nextPurchase.building.quantity}
                </p>
                <CoinWrapper>
                  {formatNumber(
                    getBuildingPrice(
                      nextPurchase.building.base_price,
                      nextPurchase.building.quantity - 1
                    ),
                    {
                      notation: 'standard',
                      maximumFractionDigits: 0,
                    }
                  )}
                </CoinWrapper>
              </div>
            </>
          )}
          {nextPurchase?.type === 'upgrade' && (
            <>
              <img
                className="h-10 w-auto object-cover"
                src={getClickerUpgradeImage(nextPurchase.upgrade)}
              />
              <div className="flex flex-col flex-grow space-y-1">
                <p className="text-sm lg:text-xs xl:text-sm text-left">
                  {'label' in nextPurchase.upgrade.data
                    ? nextPurchase.upgrade.data.label
                    : nextPurchase.upgrade.data.name}
                </p>
                <CoinWrapper>
                  {formatNumber(nextPurchase.upgrade.data.price, {
                    notation: 'standard',
                    maximumFractionDigits: 0,
                  })}
                </CoinWrapper>
              </div>
            </>
          )}
        </div>
        {nextPurchase && (
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-sm lg:text-xs xl:text-sm">Production/sec. en plus</p>
            <CoinWrapper>
              +
              {formatNumber(nextPurchase.upgradedRps - currentRps, {
                notation: 'standard',
                maximumFractionDigits: 2,
              })}
            </CoinWrapper>
          </div>
        )}
        <div className="flex flex-row justify-between items-center">
          <p className="font-semibold text-sm lg:text-xs xl:text-sm">Production/sec. actuelle</p>
          <CoinWrapper>
            {formatNumber(currentRps, {
              notation: 'standard',
              maximumFractionDigits: 2,
            })}
          </CoinWrapper>
        </div>
        {nextPurchase && (
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-sm lg:text-xs xl:text-sm">
              Production/sec. après achat
            </p>
            <CoinWrapper>
              {formatNumber(nextPurchase.upgradedRps, {
                notation: 'standard',
                maximumFractionDigits: 2,
              })}
            </CoinWrapper>
          </div>
        )}
        <Button before={<ShoppingCartIcon className="size-4" />} variant="outline" onClick={buy}>
          Acheter
        </Button>
      </CardContent>
    </Card>
  )
}

export { NextPurchaseCard }
