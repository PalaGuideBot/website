import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { formatNumber } from '~/lib/utils'
import { usePlayerClickerStore } from '../stores/player_clicker_store'
import { CoinWrapper } from './coin_wrapper'

interface StatisticsCardProps {}

const StatisticsCard = ({}: StatisticsCardProps) => {
  const playerClickerStore = usePlayerClickerStore()

  const totalProduction = playerClickerStore.getTotalProduction()

  return (
    <Card>
      <CardHeader className="border-b p-2.5">
        <CardTitle>Statistiques</CardTitle>
      </CardHeader>
      <CardContent className="text-sm p-2 space-y-4">
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
