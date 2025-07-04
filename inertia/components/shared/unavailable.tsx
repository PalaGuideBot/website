import { Alert, Button } from '@lemonsqueezy/wedges'

export function Unavailable() {
  return (
    <Alert color="error" variant="expanded" className="mb-4 rounded-none">
      L'API de Paladium est actuellement indisponible, certaines fonctionnalités peuvent ne pas
      fonctionner.
      <Button variant="link" className="ml-2" asChild>
        <a href="https://status.palaguidebot.fr/">Status</a>
      </Button>
    </Alert>
  )
}
