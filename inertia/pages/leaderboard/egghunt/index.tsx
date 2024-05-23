import type EgghuntController from '#leaderboard/controllers/egghunt_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function EgghuntIndex(props: InferPageProps<EgghuntController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Leaderboard: Egghunt" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
