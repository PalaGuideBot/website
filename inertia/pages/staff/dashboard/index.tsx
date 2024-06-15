import { Head, router } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { Page, PageTitle } from '~/components/page'
import { useAuth } from '~/hooks/use_auth'

export default function DashboardIndexPage() {
  const user = useAuth()!
  return (
    <>
      <Head title="Tableau de bord" />
      <main className="h-dvh w-full p-4">
        <Page>
          <PageTitle>Tableau de bord</PageTitle>
          <pre>{JSON.stringify(user, null, 1)}</pre>
          <div>
            <Button destructive onClick={() => router.visit('/staff/logout')}>
              Se déconnecter
            </Button>
          </div>
        </Page>
      </main>
    </>
  )
}
