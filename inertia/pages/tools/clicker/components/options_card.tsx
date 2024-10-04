import { Button, Checkbox } from '@lemonsqueezy/wedges'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { usePlayerClickerStore } from '../stores/player_clicker_store'
import { Link } from '@inertiajs/react'

interface OptionsCardProps {
  onReset?: () => void
}

const OptionsCard = ({ onReset }: OptionsCardProps) => {
  const setOptions = usePlayerClickerStore((state) => state.setOptions)
  const { options, data } = usePlayerClickerStore()

  return (
    <Card>
      <CardHeader className="border-b p-2.5">
        <CardTitle>Options</CardTitle>
      </CardHeader>
      <CardContent className="text-sm p-2 space-y-2">
        {onReset && (
          <div className="space-y-1">
            <p className="font-semibold">Commandes</p>
            <div className="flex flex-row flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={onReset}>
                Réinitialiser
              </Button>
              {data?.username && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/players/${data.username}#evolution-du-clicker`}>
                    Voir le profil
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
        <Checkbox.Root asChild>
          <label className="font-semibold">
            <Checkbox.Item
              onCheckedChange={() =>
                setOptions('markOutLockedUpgrades', !options.markOutLockedUpgrades)
              }
              checked={options.markOutLockedUpgrades}
            />
            <span>Distinguer les améliorations bloquées</span>
          </label>
        </Checkbox.Root>
        <Checkbox.Root asChild>
          <label className="font-semibold">
            <Checkbox.Item
              onCheckedChange={() =>
                setOptions('markOutLockedBuildings', !options.markOutLockedBuildings)
              }
              checked={options.markOutLockedBuildings}
            />
            <span>Distinguer les batîments bloquées</span>
          </label>
        </Checkbox.Root>
        <Checkbox.Root asChild>
          <label className="font-semibold">
            <Checkbox.Item
              onCheckedChange={() =>
                setOptions('showUpgradeAdvantages', !options.showUpgradeAdvantages)
              }
              checked={options.showUpgradeAdvantages}
            />
            <span>Afficher les avantages</span>
          </label>
        </Checkbox.Root>
      </CardContent>
    </Card>
  )
}

export { OptionsCard }
