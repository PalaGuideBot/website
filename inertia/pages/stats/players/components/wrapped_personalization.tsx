import { BanIcon } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { banners } from '~/content/banner'
import { WrappedMetricCardDraggable } from './wrapped_metric_card'
import { metrics } from './wrapped_metrics'
import { useWrappedSettings } from './wrapped_settings'

export function WrappedPersonalization() {
  const { player, banner, changeBanner } = useWrappedSettings()

  return (
    <>
      <FormItem>
        <FormLabel>Bannière</FormLabel>
        <FormMessage
          message="Cliquez sur une bannière pour la sélectionner."
          className="text-foreground"
        />
        <div className="flex flex-row flex-wrap gap-2">
          {Object.entries(banners)
            .concat([['none', 'none']])
            .map(([key, value]) => (
              <Button
                variant="outline"
                className="size-16 overflow-hidden p-0 transition-all duration-75 focus:outline-2 hover:outline-2 hover:outline-offset-2 data-[selected=true]:outline-2 data-[selected=true]:outline-offset-2"
                data-selected={banner === key}
                key={key}
                onClick={() => changeBanner(key as 'none')}
                asChild
              >
                <button>
                  {key === 'none' ? (
                    <BanIcon className="size-8" />
                  ) : (
                    <img className="size-16 object-cover object-center" src={value} alt={key} />
                  )}
                </button>
              </Button>
            ))}
        </div>
      </FormItem>
      <FormItem>
        <FormLabel>Métriques</FormLabel>
        <FormMessage
          message="Glissez-déposez les métriques pour les afficher sur votre carte."
          className="text-foreground"
        />
        <div className="flex flex-row flex-wrap gap-2">
          {metrics
            .filter((metric) => metric.isVisible(player))
            .map((metric) => (
              <WrappedMetricCardDraggable
                key={metric.id}
                type={metric.id}
                children={metric.title}
              />
            ))}
        </div>
      </FormItem>
    </>
  )
}
