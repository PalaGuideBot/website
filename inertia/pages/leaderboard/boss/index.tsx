import type BossController from '#leaderboard/controllers/boss_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'

export default function BossIndex(props: InferPageProps<BossController, 'index'>) {
  const { leaderboard } = props
  return (
    <>
      <Head title="Leaderboard: Boss" />
      <DefaultLayout>
        <pre>{JSON.stringify(leaderboard, null, 1)}</pre>
      </DefaultLayout>
    </>
  )
}
