import { Alert, Button } from '@lemonsqueezy/wedges'
import { ExternalLinkIcon } from 'lucide-react'

const BetaAlert = () => {
  return (
    <Alert
      color="info"
      variant="expanded"
      closable
      after={
        <Button variant="outline" after={<ExternalLinkIcon className="size-4" />} asChild>
          <a href="https://palaguidebot.fr/discord" target="_blank">
            Rejoindre le discord
          </a>
        </Button>
      }
    >
      L'outil est en phase de bêta, il se peut qu'il y ait des erreurs dans les calculs. Si vous
      avez des suggestions ou des retours, n'hésitez pas à nous les parvenir sur Discord.
    </Alert>
  )
}

export { BetaAlert }
