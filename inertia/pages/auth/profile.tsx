import type AuthController from '#controllers/auth_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { router } from '@inertiajs/react'
import { Alert, Button } from '@lemonsqueezy/wedges'
import * as Tabs from '@radix-ui/react-tabs'
import { CheckIcon, CopyIcon, UnlinkIcon } from 'lucide-react'
import { useState } from 'react'
import DefaultLayout from '~/components/layouts/default'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { useCopyToClipboard } from '~/hooks/use_copy_clipboard'
import { client } from '~/lib/client'
import { getHeadUrl } from '~/lib/minecraft'

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
      <Head descriptors={[{ title: 'Profil' }]} />
      <DefaultLayout className="bg-secondary-50 flex-grow">
        <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Profil</h1>
          </div>
          <Tabs.Root
            defaultValue="minecraft"
            className="mx-auto grid w-full max-w-6xl items-start gap-6 lg:grid-cols-[250px_1fr]"
          >
            <Tabs.List className="grid gap-4 text-sm text-surface-400">
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

const MinecraftTab = ({ account }: { account?: ProfilePageProps['minecraftAccount'] }) => {
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
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Lier mon compte Minecraft</CardTitle>
          <CardDescription>
            Enregistrez votre compte Minecraft pour bénéficier de fonctionnalités supplémentaires.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {account && (
            <>
              <Alert color="success">Votre compte est lié.</Alert>
              <Card>
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
                        before={<UnlinkIcon />}
                        size="sm"
                        variant="link"
                        className="no-underline hover:underline"
                        onClick={unlinkAccount}
                      >
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
                  isIconOnly
                  variant="tertiary"
                  onClick={() => handleCopy(token)}
                  className="transition-all"
                >
                  {copied ? (
                    <CheckIcon className="size-4 text-wg-green" />
                  ) : (
                    <CopyIcon className="size-4" />
                  )}
                </Button>
              </div>
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
