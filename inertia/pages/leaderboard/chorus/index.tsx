import type ChorusController from '#leaderboard/controllers/chorus_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function ChorusIndex(props: InferPageProps<ChorusController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Leaderboard: Chorus" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
