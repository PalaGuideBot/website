import { Alert, AlertDescription } from '~/components/ui/alert'

export function Unavailable() {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        L'information est actuellement indisponible via l'API de Paladium. Si vous avez des
        questions, n'hésitez pas à nous les poser sur Discord.
      </AlertDescription>
    </Alert>
  )
}
