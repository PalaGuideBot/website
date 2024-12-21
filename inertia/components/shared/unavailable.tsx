import { Alert } from '@lemonsqueezy/wedges'

const Unavailable = () => {
  return (
    <Alert color="error" variant="expanded" closable>
      L'information est actuellement indisponible via l'API de Paladium. Si vous avez des questions,
      n'hésitez pas à nous les poser sur Discord.
    </Alert>
  )
}

export { Unavailable }
