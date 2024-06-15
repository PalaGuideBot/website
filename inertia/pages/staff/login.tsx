import { Head } from '@inertiajs/react'
import { Alert, Button } from '@lemonsqueezy/wedges'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export default function LoginPage() {
  return (
    <>
      <Head title="Connexion" />
      <main className="h-dvh ww-full flex items-center justify-center px-4">
        <Card className="w-96">
          <CardHeader className="border-b">
            <CardTitle className="font-pixel">Connexion</CardTitle>
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
