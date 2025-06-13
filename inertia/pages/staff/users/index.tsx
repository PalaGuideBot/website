import { InferPageProps } from '@adonisjs/inertia/types'

import type UserController from '#staff/controllers/user_controller'
import { StaffLayout } from '~/components/layouts/staff'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { columns } from './columns'
import { DataTable } from './data_table'
import { PageSettings } from './page_settings'

type UserIndexPageProps = InferPageProps<UserController, 'index'>

export default function UserIndexPage(props: UserIndexPageProps) {
  const { users, roles } = props

  return (
    <>
      <Head descriptors={[{ title: 'Utilisateurs' }]} />
      <StaffLayout>
        <PageSettings value={{ roles }}>
          <Page className="mx-0 max-w-none">
            <DataTable columns={columns} data={users} />
          </Page>
        </PageSettings>
      </StaffLayout>
    </>
  )
}
