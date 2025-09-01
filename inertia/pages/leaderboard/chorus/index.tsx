import type ChorusController from '#leaderboard/controllers/chorus_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { DefaultLayout } from '~/components/layouts/default'
import { Head } from '~/components/shared/head'

export default function ChorusIndex(props: InferPageProps<ChorusController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Classement: Chorus" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
