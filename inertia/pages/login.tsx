import { Link } from '@inertiajs/react'
import { Alert, Button } from '@lemonsqueezy/wedges'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
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
          <Button
            before={<DiscordLogoIcon className="mr-1 size-5" />}
            className="p-2"
            variant="outline"
            asChild
          >
            <a href="/auth/redirect">Se connecter</a>
          </Button>
          <Card className="bg-background">
            <CardHeader className="border-b">
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm pb-2">
                Votre compte Discord doit être lié à votre compte Minecraft.
              </p>
              <p className="text-sm">Pour cela, accédez à notre guide :</p>
              <Button variant="link" asChild>
                <Link href="/link">Voir le guide</Link>
              </Button>
            </CardContent>
          </Card>
          <Button variant="link" asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
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
