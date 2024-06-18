import { Head, Link } from '@inertiajs/react'
import { Alert, Button } from '@lemonsqueezy/wedges'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { HomeIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export default function LoginPage() {
  return (
    <>
      <Head title="Connexion" />
      <main className="h-dvh ww-full flex items-center justify-center px-4">
        <Card className="w-96">
          <CardHeader className="border-b flex flex-row justify-between items-center">
            <CardTitle className="font-pixel">Connexion</CardTitle>
            <Button className="p-2 !m-0" size="xs-icon" variant="transparent" asChild>
              <Link href="/">
                <HomeIcon className="size-4" />
                <span className="sr-only">Retour à l'accueil</span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-4 flex flex-col gap-4">
            <Alert color="warning">Réservée au staff</Alert>
            <Button before={<DiscordLogoIcon />} className="p-2 text-lg" variant="outline" asChild>
              <a href="/staff/auth/redirect">Se connecter</a>
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
