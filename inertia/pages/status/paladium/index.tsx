import type PaladiumController from '#status/controllers/paladium_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

type PaladiumStatusPageProps = InferPageProps<PaladiumController, 'index'>

export default function PaladiumStatusPage(props: PaladiumStatusPageProps) {
  const { status } = props

  return (
    <>
      <Head title="Status Paladium" />
      <DefaultLayout>
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-4">
          <h1 className="text-lg font-medium">Status: Paladium</h1>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      </DefaultLayout>
    </>
  )
}
