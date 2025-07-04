import { ExternalLinkIcon } from 'lucide-react'

import { Alert, AlertDescription } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'

export function BetaAlert() {
  return (
    <Alert variant="info">
      <AlertDescription>
        L'outil est en phase de bêta, il se peut qu'il y ait des erreurs dans les calculs. Si vous
        avez des suggestions ou des retours, n'hésitez pas à nous les parvenir sur Discord.
      </AlertDescription>
      <Button variant="outline" className="w-fit" asChild>
        <a href="https://palaguidebot.fr/discord" target="_blank">
          Rejoindre le discord
          <ExternalLinkIcon />
        </a>
      </Button>
    </Alert>
  )
}
