import type { InferPageProps } from '@adonisjs/inertia/types'
import { router } from '@inertiajs/react'
import { Alert } from '@lemonsqueezy/wedges'
import * as React from 'react'
import { useIsClient } from 'usehooks-ts'

import type ClickerController from '#tools/controller/clicker_controller'
import DefaultLayout from '~/components/layouts/default'
import { PageSubTitle, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import PaladiumJob from '~/components/shared/paladium_job'
import { Card, CardContent } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll_area'
import { getBustUrl } from '~/lib/minecraft'
import { cn } from '~/lib/utils'
import { SearchPlayerForm } from '~/pages/stats/players/components/search_player_form'
import { BuildingCard } from './components/building_card'
import { ClickCard } from './components/click_card'
import { ClickerSettings } from './components/clicker_settings'
import { StatisticsCard } from './components/statistics_card'
import { UpgradeCard } from './components/upgrade_card'
import {
  UpgradeWrapper,
  UpgradeWrapperContent,
  UpgradeWrapperTitle,
} from './components/upgrade_wrapper'
import { usePlayerClickerStore } from './stores/player_clicker_store'

type ClickerShowProps = InferPageProps<ClickerController, 'show'>

export default function ClickerShow(props: ClickerShowProps) {
  const { clicker, upgrades } = props

  const isClient = useIsClient()
  const playerClickerStore = usePlayerClickerStore()

  React.useEffect(() => {
    // If the local data is present and the clicker is different, we reinitialize the store
    if (playerClickerStore.data && clicker && playerClickerStore.data.uuid !== clicker.uuid) {
      playerClickerStore.init(clicker)
    }
  }, [clicker, playerClickerStore.data])

  React.useEffect(() => {
    // If the clicker is present and the store is not initialized, we initialize it
    if (isClient && !playerClickerStore.data && clicker) {
      playerClickerStore.init(clicker)
    }
  }, [isClient, clicker, playerClickerStore.data])

  React.useEffect(() => {
    // If the clicker is not present and the store is initialized, we navigate to right player
    if (!clicker && playerClickerStore.data) {
      router.replace(`/tools/clicker/${playerClickerStore.data.username}`)
    }
  }, [clicker, playerClickerStore.data])

  const onFormSuccess = () => {
    // Reset current player if the form is successful
    if (clicker && clicker.uuid === playerClickerStore.data?.uuid) {
      playerClickerStore.init(clicker)
    }
  }

  return (
    <>
      <Head descriptors={[{ title: 'Clicker' }]} />
      <DefaultLayout className="grid grid-cols-12 p-0 lg:p-0 gap-0 lg:gap-0">
        {isClient && !clicker && !playerClickerStore.data && (
          <div className="flex flex-col gap-4 py-4 px-3 col-span-12 xl:col-start-4 xl:col-end-10">
            <ClickerShowHeader onFormSuccess={onFormSuccess} />
            <p className="text-sm">
              Pour commencer à utiliser l'outil vous devez renseigner le pseudo d'un joueur sur le
              champ texte juste au-dessus.
            </p>
            <p className="text-sm">
              Une fois que vous aurez choisi un joueur, les changements que vous aurez effectuées
              seront mises en cache et sera acessible même si vous quittez la page.
            </p>
            <Alert>
              Les informations seront réinitialisées dès lors que vous changez de joueur.
            </Alert>
            <p className="text-sm">
              Une erreur peut survenir lorsque vous essayez de charger les informations d'un joueur.
              Cela pourrait s'expliquer par le fait que nous sommes restreints au niveau du nombre
              de requêtes que nous autorise Paladium.
            </p>
            <p className="text-sm">
              Si vous êtes dans ce cas, veuillez réessayer plus tard et évitez le plus possible de
              changer de joueur.
            </p>
          </div>
        )}
        {playerClickerStore.data && (
          <ClickerSettings
            value={{
              buildings: playerClickerStore.data.buildings.map(
                ({ production, quantity, ...building }) => building
              ),
              upgrades: upgrades,
            }}
          >
            <ClickerShowHeader
              className="col-span-12 py-4 px-3 lg:hidden"
              defaultFormValue={playerClickerStore.data.username}
              onFormSuccess={onFormSuccess}
            />
            <ScrollArea className="col-span-12 lg:col-span-3 lg:h-dvh">
              <div className="flex flex-col gap-4 py-4 px-3">
                <PageTitle className="font-mc-dungueons text-md tracking-wide">
                  Informations
                </PageTitle>
                <div className="flex flex-col gap-2">
                  <ClickCard />
                  <StatisticsCard />
                </div>
              </div>
            </ScrollArea>
            <ScrollArea className="col-span-12 lg:col-span-6 lg:h-dvh">
              <div className="flex flex-col gap-4 py-4 px-3">
                <ClickerShowHeader
                  className="hidden lg:flex"
                  defaultFormValue={playerClickerStore.data.username}
                  onFormSuccess={onFormSuccess}
                />
                <div className="flex flex-col gap-2">
                  <PageSubTitle>Métiers</PageSubTitle>
                  <Card>
                    <CardContent className="pt-4 pb-0 grid grid-cols-3 gap-4 xl:gap-0 place-items-center xl:place-items-stretch">
                      <div className="col-span-3 xl:col-span-1 border-b xl:border-b-0">
                        <img
                          className="object-contain"
                          src={getBustUrl(playerClickerStore.data.uuid)}
                        />
                      </div>
                      <div className="col-span-3 xl:col-span-2 grid grid-cols-2 xl:grid-cols-4 gap-4 items-center flex-1 pb-4">
                        {Object.entries(playerClickerStore.data.jobs).map(([job, info]) => (
                          <PaladiumJob
                            key={job}
                            job={job}
                            info={info}
                            onLevelChange={(jobLevel) =>
                              playerClickerStore.updateJobLevel(
                                job as keyof typeof playerClickerStore.data.jobs,
                                jobLevel
                              )
                            }
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <UpgradeWrapper>
                  <UpgradeWrapperTitle>Click</UpgradeWrapperTitle>
                  <UpgradeWrapperContent>
                    {upgrades.clicks.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.name}
                        upgrade={{ type: 'click', data: upgrade }}
                        unlocked={playerClickerStore.hasUpgrade(upgrade.name)}
                        unlockable={playerClickerStore.isUpgradeUnlockable({
                          type: 'click',
                          data: upgrade,
                        })}
                        onClick={() =>
                          playerClickerStore.unlockClick(upgrade.name, upgrades.clicks)
                        }
                      />
                    ))}
                  </UpgradeWrapperContent>
                </UpgradeWrapper>
                <UpgradeWrapper>
                  <PageSubTitle>Global</PageSubTitle>
                  <UpgradeWrapperContent>
                    {upgrades.globals.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.name}
                        upgrade={{ type: 'global', data: upgrade }}
                        unlocked={playerClickerStore.hasUpgrade(upgrade.name)}
                        unlockable={playerClickerStore.isUpgradeUnlockable({
                          type: 'global',
                          data: upgrade,
                        })}
                        onClick={() => playerClickerStore.toggleUpgrade(upgrade.name)}
                      />
                    ))}
                  </UpgradeWrapperContent>
                </UpgradeWrapper>
                <UpgradeWrapper>
                  <UpgradeWrapperTitle>Terrain</UpgradeWrapperTitle>
                  <UpgradeWrapperContent>
                    {upgrades.terrains.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.name}
                        upgrade={{ type: 'terrain', data: upgrade }}
                        unlocked={playerClickerStore.hasUpgrade(upgrade.name)}
                        unlockable={playerClickerStore.isUpgradeUnlockable({
                          type: 'terrain',
                          data: upgrade,
                        })}
                        onClick={() => playerClickerStore.toggleUpgrade(upgrade.name)}
                      />
                    ))}
                  </UpgradeWrapperContent>
                </UpgradeWrapper>
                <UpgradeWrapper>
                  <UpgradeWrapperTitle>Building</UpgradeWrapperTitle>
                  <UpgradeWrapperContent>
                    {upgrades.buildings.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.name}
                        upgrade={{ type: 'building', data: upgrade }}
                        unlocked={playerClickerStore.hasUpgrade(upgrade.name)}
                        unlockable={playerClickerStore.isUpgradeUnlockable({
                          type: 'building',
                          data: upgrade,
                        })}
                        onClick={() => playerClickerStore.toggleUpgrade(upgrade.name)}
                      />
                    ))}
                  </UpgradeWrapperContent>
                </UpgradeWrapper>
                <UpgradeWrapper>
                  <UpgradeWrapperTitle>Many</UpgradeWrapperTitle>
                  <UpgradeWrapperContent>
                    {upgrades.many.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.name}
                        upgrade={{ type: 'many', data: upgrade }}
                        unlocked={playerClickerStore.hasUpgrade(upgrade.name)}
                        unlockable={playerClickerStore.isUpgradeUnlockable({
                          type: 'many',
                          data: upgrade,
                        })}
                        onClick={() => playerClickerStore.toggleUpgrade(upgrade.name)}
                      />
                    ))}
                  </UpgradeWrapperContent>
                </UpgradeWrapper>
                <UpgradeWrapper>
                  <UpgradeWrapperTitle>Posterior</UpgradeWrapperTitle>
                  <UpgradeWrapperContent>
                    {upgrades.posteriors.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.name}
                        upgrade={{ type: 'posterior', data: upgrade }}
                        unlocked={playerClickerStore.hasUpgrade(upgrade.name)}
                        unlockable={playerClickerStore.isUpgradeUnlockable({
                          type: 'posterior',
                          data: upgrade,
                        })}
                        onClick={() => playerClickerStore.toggleUpgrade(upgrade.name)}
                      />
                    ))}
                  </UpgradeWrapperContent>
                </UpgradeWrapper>
                <UpgradeWrapper>
                  <UpgradeWrapperTitle>Category</UpgradeWrapperTitle>
                  <UpgradeWrapperContent>
                    {upgrades.categories.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.name}
                        upgrade={{ type: 'category', data: upgrade }}
                        unlocked={playerClickerStore.hasUpgrade(upgrade.name)}
                        unlockable={playerClickerStore.isUpgradeUnlockable({
                          type: 'category',
                          data: upgrade,
                        })}
                        onClick={() => playerClickerStore.toggleUpgrade(upgrade.name)}
                      />
                    ))}
                  </UpgradeWrapperContent>
                </UpgradeWrapper>
              </div>
            </ScrollArea>
            <ScrollArea className="col-span-12 lg:col-span-3 lg:h-dvh">
              <div className="flex flex-col gap-4 py-4 px-3">
                <PageTitle className="font-mc-dungueons text-md tracking-wide">Buildings</PageTitle>
                <div className="grid grid-cols-1 gap-2">
                  {playerClickerStore.data.buildings.map((building) => (
                    <BuildingCard
                      key={building.name}
                      building={building}
                      onDecreaseQuantity={() =>
                        playerClickerStore.adjustBuildingQuantity(building.name, -1)
                      }
                      onIncreaseQuantity={() =>
                        playerClickerStore.adjustBuildingQuantity(building.name, 1)
                      }
                      onQuantityChange={(quantity) =>
                        playerClickerStore.setBuildingQuantity(building.name, quantity)
                      }
                    />
                  ))}
                </div>
              </div>
            </ScrollArea>
          </ClickerSettings>
        )}
      </DefaultLayout>
    </>
  )
}

interface ClickerShowHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  defaultFormValue?: string
  onFormSuccess?: () => void
}

const ClickerShowHeader = ({
  className,
  defaultFormValue,
  onFormSuccess,
  ...props
}: ClickerShowHeaderProps) => {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <PageTitle>Clicker</PageTitle>
      <p>Progressez rapidement dans le clicker en vous aidant de cet outil.</p>
      <SearchPlayerForm
        defaultValue={defaultFormValue}
        path={(username) => `/tools/clicker/${username}`}
        onSuccess={onFormSuccess}
      />
    </div>
  )
}
