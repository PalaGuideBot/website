import type KothController from '#leaderboard/controllers/koth_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function KothIndex(props: InferPageProps<KothController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Leaderboard: Koth" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
