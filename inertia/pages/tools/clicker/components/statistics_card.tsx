import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { formatNumber } from '~/lib/utils'
import { usePlayerClickerStore } from '../stores/player_clicker_store'
import { useClickerSettings } from './clicker_settings'
import { CoinWrapper } from './coin_wrapper'

interface StatisticsCardProps {}

const StatisticsCard = ({}: StatisticsCardProps) => {
  const { calculator } = useClickerSettings()
  const playerClickerStore = usePlayerClickerStore()

  const rps = playerClickerStore.getRps(calculator)
  const totalProduction = playerClickerStore.getTotalProduction()

  return (
    <Card>
      <CardHeader className="border-b p-2.5">
        <CardTitle>Statistiques</CardTitle>
      </CardHeader>
      <CardContent className="text-sm p-2 space-y-4">
        <div className="space-y-1">
          <p className="font-bold">Production par seconde</p>
          <CoinWrapper>
            {formatNumber(rps, { notation: 'standard', maximumFractionDigits: 2 })}
          </CoinWrapper>
        </div>
        <div className="space-y-1">
          <p className="font-bold">Production totale</p>
          <CoinWrapper>
            {formatNumber(totalProduction, { notation: 'standard', maximumFractionDigits: 0 })}
          </CoinWrapper>
        </div>
      </CardContent>
    </Card>
  )
}

export { StatisticsCard }
