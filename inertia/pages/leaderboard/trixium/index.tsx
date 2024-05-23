import type TrixiumController from '#leaderboard/controllers/trixium_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function TrixiumIndex(props: InferPageProps<TrixiumController, 'index'>) {
  const { leaderboardFaction, leaderboardPlayer } = props
  return (
    <>
      <Head title="Leaderboard: Trixium" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboardFaction, null, 1)}</pre>
        <pre>{JSON.stringify(leaderboardPlayer, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
