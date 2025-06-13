import { Link } from '@inertiajs/react'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { usePlayerClickerStore } from '../stores/player_clicker_store'

interface OptionsCardProps {
  onReset?: () => void
}

export function OptionsCard({ onReset }: OptionsCardProps) {
  const setOptions = usePlayerClickerStore((state) => state.setOptions)
  const { options, data } = usePlayerClickerStore()

  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle>Options</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm p-2">
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
        <div className="inline-flex items-center gap-2">
          <Checkbox
            id="markOutLockedUpgrades"
            onCheckedChange={() =>
              setOptions('markOutLockedUpgrades', !options.markOutLockedUpgrades)
            }
            checked={options.markOutLockedUpgrades}
          />
          <label htmlFor="markOutLockedUpgrades" className="cursor-pointer font-semibold">
            Distinguer les améliorations bloquées
          </label>
        </div>
        <div className="inline-flex items-center gap-2">
          <Checkbox
            id="markOutLockedBuildings"
            onCheckedChange={() =>
              setOptions('markOutLockedBuildings', !options.markOutLockedBuildings)
            }
            checked={options.markOutLockedBuildings}
          />
          <label htmlFor="markOutLockedBuildings" className="cursor-pointer font-semibold">
            Distinguer les batîments bloqués
          </label>
        </div>
        <div className="inline-flex items-center gap-2">
          <Checkbox
            id="showUpgradeAdvantages"
            onCheckedChange={() =>
              setOptions('showUpgradeAdvantages', !options.showUpgradeAdvantages)
            }
            checked={options.showUpgradeAdvantages}
          />
          <label htmlFor="showUpgradeAdvantages" className="cursor-pointer font-semibold">
            Afficher les avantages
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
