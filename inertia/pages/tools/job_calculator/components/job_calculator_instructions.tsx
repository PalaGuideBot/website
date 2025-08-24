import { InfoIcon } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

export function JobCalculatorInstructions({
  size = 'icon',
  variant = 'ghost',
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={size} variant={variant} {...props}>
          <InfoIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end" sideOffset={4} className="max-w-96">
        <div className="space-y-2">
          <p>
            <span className="font-bold text-primary">Standard</span> : Entrez votre niveau actuel et
            votre niveau cible, puis obtenez la liste de tous les items ainsi que les quantités
            nécessaires pour atteindre ce niveau.
          </p>
          <p>
            <span className="font-bold text-primary">Inversé</span> : Entrez votre niveau actuel
            ainsi que les items que vous possédez, puis découvrez le niveau maximum que vous pouvez
            atteindre avec ces items.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
