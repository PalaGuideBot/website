import type { InferPageProps } from '@adonisjs/inertia/types'
import { router } from '@inertiajs/react'
import * as Tabs from '@radix-ui/react-tabs'
import { CheckIcon, CopyIcon, UnlinkIcon } from 'lucide-react'
import { useState } from 'react'

import type AuthController from '#controllers/auth_controller'
import { DefaultLayout } from '~/components/layouts/default'
import { Head } from '~/components/shared/head'
import { LinkSteps } from '~/components/shared/link_steps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { useCopyToClipboard } from '~/hooks/use_copy_clipboard'
import { client } from '~/lib/client'
import { getHeadUrl } from '~/lib/minecraft'
import { Alert, AlertDescription } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'

type ProfilePageProps = InferPageProps<AuthController, 'profile'>

export default function ProfilePage(props: ProfilePageProps) {
  const { minecraftAccount } = props

  const tabs: Array<{ id: string; label: string }> = [
    {
      id: 'minecraft',
      label: 'Minecraft',
    },
  ]

  return (
    <>
      <Head title="Profil" />
      <DefaultLayout className="bg-secondary-50 grow">
        <div className="flex min-h-[calc(100vh-(--spacing(16)))] flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Profil</h1>
          </div>
          <Tabs.Root
            defaultValue="minecraft"
            className="mx-auto grid w-full max-w-6xl items-start gap-6 lg:grid-cols-[250px_1fr]"
          >
            <Tabs.List className="grid gap-4 text-sm text-muted-foreground">
              {tabs.map((tab) => (
                <Tabs.Trigger
                  key={tab.id}
                  value={tab.id}
                  className="text-left hover:text-foreground data-[state=active]:font-bold data-[state=active]:text-foreground"
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <div>
              <Tabs.Content value="minecraft" className="grid gap-4">
                <MinecraftTab account={minecraftAccount} />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </DefaultLayout>
    </>
  )
}

function MinecraftTab({ account }: { account?: ProfilePageProps['minecraftAccount'] }) {
  const [token, setToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [, copy] = useCopyToClipboard()

  const generateToken = async () => {
    const response = await client.post('minecraft/link/generate-token').json<{ token: string }>()
    setToken(response.token)
  }

  const unlinkAccount = async () => {
    await client.delete('minecraft/unlink')
    router.reload()
  }

  const handleCopy = (text: string) => {
    copy(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <Card className="bg-background gap-4">
        <CardHeader className="flex-col">
          <CardTitle>Lier mon compte Minecraft</CardTitle>
          <CardDescription>
            Enregistrez votre compte Minecraft pour bénéficier de fonctionnalités supplémentaires.
          </CardDescription>
          {!account && (
            <Alert variant="destructive">
              <AlertDescription>
                Pour les comptes Paladium Crack, cette fonctionnalité n'est pas disponible. Vous
                pouvez tout de même demander à être link via le support Discord.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {account && (
            <>
              <Alert variant="success">
                <AlertDescription>Votre compte est lié.</AlertDescription>
              </Alert>
              <Card className="p-0">
                <CardContent className="p-2">
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      src={getHeadUrl(account.uuid)}
                      alt={`${account.username}'s head`}
                      className="w-16 h-auto object-contain rounded-sm"
                    />
                    <div className="flex-1 flex flex-row items-center justify-between">
                      <div>
                        <p className="text-lg font-bold w-fit">{account.username}</p>
                        <p className="hidden sm:block text-sm">{account.uuid}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="link"
                        className="no-underline hover:underline"
                        onClick={unlinkAccount}
                      >
                        <UnlinkIcon />
                        Dissocier
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          {!account && token && (
            <>
              <p className="text-sm">Code de liaison</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">{token}</p>
                <Button
                  size="icon"
                  variant="tertiary"
                  onClick={() => handleCopy(token)}
                  className="transition-all"
                >
                  {copied ? <CheckIcon className="text-emerald-500" /> : <CopyIcon />}
                </Button>
              </div>
              <p className="text-sm pt-4">Comment lier son compte ?</p>
              <LinkSteps />
            </>
          )}
          {!account && !token && (
            <Button size="sm" variant="tertiary" onClick={generateToken}>
              Générer un code
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  )
}
