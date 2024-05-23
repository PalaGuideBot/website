import type ClickerController from '#leaderboard/controllers/clicker_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function ClickerIndex(props: InferPageProps<ClickerController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Leaderboard: Clicker" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
