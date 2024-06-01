import type PaladiumController from '#status/controllers/paladium_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageTitle } from '~/components/page'

type PaladiumStatusPageProps = InferPageProps<PaladiumController, 'index'>

export default function PaladiumStatusPage(props: PaladiumStatusPageProps) {
  const { status } = props

  return (
    <>
      <Head title="Status Paladium" />
      <DefaultLayout>
        <Page>
          <PageTitle>Status: Paladium</PageTitle>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </Page>
      </DefaultLayout>
    </>
  )
}
