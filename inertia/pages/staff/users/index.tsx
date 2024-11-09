import { InferPageProps } from '@adonisjs/inertia/types'
import { Button } from '@lemonsqueezy/wedges'

import type UserController from '#staff/controllers/user_controller'
import StaffLayout from '~/components/layouts/staff'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Card, CardContent } from '~/components/ui/card'
import { columns } from './columns'
import { DataTable } from './data_table'
import { PageSettings } from './page_settings'
import { UserModal } from './user_modal'

type UserIndexPageProps = InferPageProps<UserController, 'index'>

export default function UserIndexPage(props: UserIndexPageProps) {
  const { users, roles } = props

  return (
    <>
      <Head descriptors={[{ title: 'Utilisateurs' }]} />
      <StaffLayout>
        <PageSettings value={{ roles }}>
          <Page className="mx-0 max-w-none">
            <div className="flex justify-end">
              <UserModal>
                <Button type="button" size="sm" variant="outline">
                  Ajouter un utilisateur
                </Button>
              </UserModal>
            </div>
            <Card>
              <CardContent className="p-0">
                <DataTable columns={columns} data={users} />
              </CardContent>
            </Card>
          </Page>
        </PageSettings>
      </StaffLayout>
    </>
  )
}
