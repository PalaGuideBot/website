import type FactionsController from '#leaderboard/controllers/factions_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function FactionsIndex(props: InferPageProps<FactionsController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Leaderboard: Factions" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
