import { Link } from '@inertiajs/react'
import { Alert, Button } from '@lemonsqueezy/wedges'

import { DiscordIcon } from '~/components/icons'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useSearchParams } from '~/hooks/use_search_params'

export default function LoginPage() {
  const [searchParams] = useSearchParams()

  const code = searchParams.get('code')

  return (
    <>
      <Head descriptors={[{ title: 'Connexion' }]} />
      <main className="h-dvh ww-full flex flex-col items-center justify-center px-4 gap-4">
        <div className="flex gap-4 items-center justify-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold">PalaGuideBot</span>
        </div>
        <div className="flex flex-col gap-2 max-w-96">
          {code && <Alert color="error">{translateCode(code)}</Alert>}
          <Card className="bg-background">
            <CardHeader className="border-b">
              <CardTitle>Connexion</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col p-4 justify-between min-h-[200px]">
              <p className="text-sm pb-4">
                En vous connectant, vous acceptez nos{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  conditions d'utilisations
                </Link>{' '}
                et vous avez pris connaissances de notre{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>
                .
              </p>
              <div className="flex flex-col gap-2 justify-center">
                <Button
                  before={<DiscordIcon className="mr-1 size-5" />}
                  className="p-2"
                  variant="outline"
                  asChild
                >
                  <a href="/auth/redirect">Se connecter</a>
                </Button>
                <Button variant="link" asChild>
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

function translateCode(code: string) {
  switch (code) {
    case 'E_DISCORD_ACCOUNT_LINK_INVALID':
      return "Votre compte n'est pas associé à Minecraft"
    default:
      return 'Erreur inconnue'
  }
}
