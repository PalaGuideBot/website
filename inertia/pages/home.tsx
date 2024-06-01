import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageTitle } from '~/components/page'

export default function Home() {
  return (
    <>
      <Head title="Accueil" />
      <DefaultLayout>
        <Page className="max-w-none">
          <PageTitle>Accueil</PageTitle>
        </Page>
      </DefaultLayout>
    </>
  )
}
