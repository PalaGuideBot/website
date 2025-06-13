import { InferPageProps } from '@adonisjs/inertia/types'

import type GiveawayController from '#staff/controllers/giveaway_controller'
import { StaffLayout } from '~/components/layouts/staff'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { columns } from './columns'
import { DataTable } from './data_table'

type GiveawayIndexPageProps = InferPageProps<GiveawayController, 'index'>

export default function GiveawayIndexPage(props: GiveawayIndexPageProps) {
  const { giveaways } = props

  return (
    <>
      <Head descriptors={[{ title: 'Giveaways' }]} />
      <StaffLayout>
        <Page className="mx-0 max-w-none">
          <DataTable columns={columns} data={giveaways} />
        </Page>
      </StaffLayout>
    </>
  )
}
