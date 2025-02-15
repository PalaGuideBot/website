import { Link } from '@inertiajs/react'
import { Alert, Button } from '@lemonsqueezy/wedges'
import { HomeIcon, UserIcon } from 'lucide-react'

const WrappedNotAvailableBanner = () => {
  return (
    <Alert
      title="Information"
      variant="expanded"
      color="info"
      after={
        <div className="flex flex-row items-center gap-2">
          <Button variant="outline" size="sm" before={<UserIcon className="size-4 mr-1" />} asChild>
            <Link href="/profile">Se rendre au profil</Link>
          </Button>
          <Button variant="outline" size="sm" before={<HomeIcon className="size-4 mr-1" />} asChild>
            <Link href="/">Retour à l'acceuil</Link>
          </Button>
        </div>
      }
    >
      Pour accéder au Wrapped, votre compte doit être lié à un compte Minecraft. Pour avoir les
      instructions, rendez-vous sur votre Profil.
    </Alert>
  )
}

export { WrappedNotAvailableBanner }
