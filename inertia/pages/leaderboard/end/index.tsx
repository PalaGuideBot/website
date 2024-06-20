import type EndController from '#leaderboard/controllers/end_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import DefaultLayout from '~/components/layouts/default'
import { Head } from '~/components/shared/head'

export default function EndIndex(props: InferPageProps<EndController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Leaderboard: End" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
