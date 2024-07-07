import type AuthController from '#controllers/auth_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Button } from '@lemonsqueezy/wedges'
import * as Tabs from '@radix-ui/react-tabs'
import DefaultLayout from '~/components/layouts/default'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

type ProfilePageProps = InferPageProps<AuthController, 'profile'>

export default function ProfilePage(props: ProfilePageProps) {
  const tabs: Array<{ id: string; label: string }> = [
    {
      id: 'minecraft',
      label: 'Minecraft',
    },
    {
      id: 'soon',
      label: 'En construction...',
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
                <MinecraftTab />
              </Tabs.Content>
              <Tabs.Content value="soon" className="grid gap-4">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>En construction...</CardTitle>
                    <CardDescription>Cette page est en cours de construction.</CardDescription>
                  </CardHeader>
                </Card>
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </DefaultLayout>
    </>
  )
}

const MinecraftTab = () => {
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
          <Button size="sm" variant="tertiary">
            Générer un code
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
