import { Button, Checkbox } from '@lemonsqueezy/wedges'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { usePlayerClickerStore } from '../stores/player_clicker_store'

interface OptionsCardProps {
  onReset?: () => void
}

const OptionsCard = ({ onReset }: OptionsCardProps) => {
  const playerClickerStore = usePlayerClickerStore()

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
          onCheckedChange={() => playerClickerStore.toggleMarkOutLockedUpgrades()}
          checked={playerClickerStore.markOutLockedUpgrades}
          className="font-semibold"
          label="Distinguer les améliorations bloquées"
        />
      </CardContent>
    </Card>
  )
}

export { OptionsCard }
