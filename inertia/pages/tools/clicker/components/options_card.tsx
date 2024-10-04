import { Button, Checkbox } from '@lemonsqueezy/wedges'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { usePlayerClickerStore } from '../stores/player_clicker_store'

interface OptionsCardProps {
  onReset?: () => void
}

const OptionsCard = ({ onReset }: OptionsCardProps) => {
  const setOptions = usePlayerClickerStore((state) => state.setOptions)
  const { options } = usePlayerClickerStore()

  return (
    <Card>
      <CardHeader className="border-b p-2.5">
        <CardTitle>Options</CardTitle>
      </CardHeader>
      <CardContent className="text-sm p-2 space-y-2">
        {onReset && (
          <div className="space-y-1">
            <p className="font-semibold">Réinitialiser les informations</p>
            <Button variant="outline" size="sm" onClick={onReset}>
              Réinitialiser
            </Button>
          </div>
        )}
        <Checkbox
          onCheckedChange={() =>
            setOptions('markOutLockedUpgrades', !options.markOutLockedUpgrades)
          }
          checked={options.markOutLockedUpgrades}
          className="font-semibold"
          label="Distinguer les améliorations bloquées"
        />
        <Checkbox
          onCheckedChange={() =>
            setOptions('markOutLockedBuildings', !options.markOutLockedBuildings)
          }
          checked={options.markOutLockedBuildings}
          className="font-semibold"
          label="Distinguer les batîments bloquées"
        />
      </CardContent>
    </Card>
  )
}

export { OptionsCard }
