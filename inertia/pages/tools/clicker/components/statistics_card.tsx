import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { formatNumber } from '~/lib/utils'
import { usePlayerClickerStore } from '../stores/player_clicker_store'
import { useClickerSettings } from './clicker_settings'
import { CoinWrapper } from './coin_wrapper'

interface StatisticsCardProps {}

const StatisticsCard = ({}: StatisticsCardProps) => {
  const { calculator } = useClickerSettings()
  const playerClickerStore = usePlayerClickerStore()

  const totalProduction = playerClickerStore.getTotalProduction()
  const totalSpent = playerClickerStore.getTotalSpent(calculator)

  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle>Statistiques</CardTitle>
      </CardHeader>
      <CardContent className="text-sm p-2 space-y-4">
        <div className="space-y-1">
          <p className="font-semibold">Production totale</p>
          <CoinWrapper>
            {formatNumber(totalProduction, { notation: 'standard', maximumFractionDigits: 0 })}
          </CoinWrapper>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Total dépensé (hors Shop)</p>
          <CoinWrapper>
            {formatNumber(totalSpent, { notation: 'standard', maximumFractionDigits: 0 })}
          </CoinWrapper>
        </div>
      </CardContent>
    </Card>
  )
}

export { StatisticsCard }
