import { Link, useForm } from '@inertiajs/react'
import { FilterIcon } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import { MarketMoneyIcon, MarketPbIcon, QuestionIcon } from '~/components/icons'
import { HiddenInformationController } from '~/components/shared/hidden_information_controller'
import { PaladiumJob } from '~/components/shared/paladium_job'
import { PaladiumRank } from '~/components/shared/paladium_rank'
import { PlayerBadge } from '~/components/shared/player_badge'
import { SkinViewer3d } from '~/components/skin_viewer_3d'
import { Alert, AlertDescription } from '~/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { FormLabel } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { ScrollArea } from '~/components/ui/scroll_area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { sortOptions } from '~/content/market'
import { useCopyToClipboard } from '~/hooks/use_copy_clipboard'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { getMinecraftItemUrl, getSkinUrl, removeColorCodes } from '~/lib/minecraft'
import { cn, formatDuration, formatNumber, formatPrice } from '~/lib/utils'
import { InformationLine } from '../../pages/stats/components/information_line'
import type { PlayerShowProps } from '../../pages/stats/players/show'

interface AurelianPlayerDetailsProps {
  player: NonNullable<PlayerShowProps['player']>
}

export const AurelianPlayerDetails = ({ player }: AurelianPlayerDetailsProps) => {
  const lastPlayerDataExists = Boolean(player.data.at(-1))

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <CardContent className="p-2">
          <div className="flex items-center justify-center gap-4 text-center">
            <div>
              <h2 className="text-2xl font-bold text-yellow-500 mb-2">🎉 Profil spécial 🎉</h2>
              <p className="text-lg">
                <span className="text-yellow-500 font-bold">aureliancnx</span> est un ancien
                développeur de Paladium, développeur de l'API qui a permis à PalaGuideBot et
                d'autres services de voir le jour.
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-sm text-yellow-600">Ex. Développeur Senior Paladium</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!lastPlayerDataExists && (
        <Alert variant="warning">
          <AlertDescription>Aucune donnée trouvée pour la période sélectionnée.</AlertDescription>
        </Alert>
      )}
      {lastPlayerDataExists && (
        <>
          <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
            <AurelianSkinSection player={player} />
            <AurelianInformationsSection player={player} />
            <JobsSection player={player} />
          </div>
          <MarketSection player={player} />
        </>
      )}
    </div>
  )
}

interface AurelianSkinSectionProps extends React.ComponentProps<typeof Card> {
  player: AurelianPlayerDetailsProps['player']
}

const AurelianSkinSection = ({ player, className, ...props }: AurelianSkinSectionProps) => {
  return (
    <Card
      className={cn(
        'lg:row-span-2 pt-2 border-yellow-500/30 bg-gradient-to-b from-yellow-500/5 to-transparent',
        className
      )}
      {...props}
    >
      <CardHeader className="border-b justify-center pb-2!">
        <div className="inline-flex items-center gap-2">
          <CardTitle className="block text-yellow-600">{player.username}</CardTitle>
          <PlayerBadge player={player} />
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex justify-center">
        <div className="relative">
          <SkinViewer3d
            className="h-auto! w-full pointer-events-none! sm:pointer-events-auto!"
            width="278"
            height="450"
            skinUrl={getSkinUrl(player.username)}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-xl -z-10"></div>
        </div>
      </CardContent>
    </Card>
  )
}

interface AurelianInformationsSectionProps extends React.ComponentProps<typeof Card> {
  player: AurelianPlayerDetailsProps['player']
}

const AurelianInformationsSection = ({
  player,
  className,
  ...props
}: AurelianInformationsSectionProps) => {
  const lastPlayerData = player.data.at(-1)

  return (
    <Card
      id="informations"
      className={cn('lg:col-span-2 pt-2 border-yellow-500/30', className)}
      {...props}
    >
      <CardHeader className="border-b pb-2!">
        <div className="flex items-center gap-2">
          <CardTitle href="#informations">Informations</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-1">
        <ul className="h-full flex flex-col gap-2">
          <li>
            <InformationLine
              label="Première connexion"
              value={
                player.firstSeen === 3600000
                  ? 'Inconnu'
                  : formatDate(new Date(player.firstSeen), DateTime.DATE_MED)
              }
            />
          </li>
          {lastPlayerData && (
            <>
              <li>
                <InformationLine
                  label="Rank"
                  value={<PaladiumRank rank={lastPlayerData.data.rank} />}
                />
              </li>
              <li>
                <InformationLine
                  label="Faction"
                  value={
                    <Link
                      className="text-sm font-mc-dungueons"
                      href={`/factions/${lastPlayerData.data.faction}`}
                    >
                      <span>{lastPlayerData.data.faction || 'Wilderness'}</span>
                      {lastPlayerData.data.factionRank && (
                        <span>{` - ${lastPlayerData.data.factionRank}`}</span>
                      )}
                    </Link>
                  }
                />
              </li>
              <li>
                <InformationLine
                  label="Money"
                  value={
                    <div className="text-xs sm:text-sm font-mc-dungueons">
                      <span>
                        {lastPlayerData.data.money === -1
                          ? 'Indisponible'
                          : formatPrice(lastPlayerData.data.money)}
                      </span>
                    </div>
                  }
                />
              </li>
              <li>
                <InformationLine
                  label="Temps de jeu"
                  value={
                    lastPlayerData.data.timePlayed === 0 ? (
                      <span className="text-xs sm:text-sm font-mc-dungueons">
                        Aucun cette saison
                      </span>
                    ) : (
                      <HiddenInformationController
                        active={lastPlayerData.data.timePlayed === -1}
                        children={
                          <span className="text-xs sm:text-sm font-mc-dungueons">Masqué</span>
                        }
                        side="right"
                        align="center"
                        fallback={
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-mc-dungueons">
                              {formatDuration(lastPlayerData.data.timePlayed)}
                            </span>
                          </div>
                        }
                      />
                    )
                  }
                />
              </li>
            </>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}

const JobsSection = ({
  player,
  className,
  ...props
}: { player: AurelianPlayerDetailsProps['player']; className?: string } & React.ComponentProps<
  typeof Card
>) => {
  const lastPlayerData = player.data.at(-1)

  if (!lastPlayerData) {
    return null
  }

  return (
    <Card
      id="metiers"
      className={cn('lg:col-span-2 pt-2 border-yellow-500/30', className)}
      {...props}
    >
      <CardHeader className="border-b pb-2!">
        <CardTitle href="#metiers">Métiers</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center flex-1">
        {Object.entries(lastPlayerData.data.jobs).map(([job, info]) => (
          <PaladiumJob key={job} job={job} info={info} />
        ))}
      </CardContent>
    </Card>
  )
}

const MarketSection = ({
  player,
  className,
  ...props
}: { player: AurelianPlayerDetailsProps['player']; className?: string } & React.ComponentProps<
  typeof Card
>) => {
  const [, copy] = useCopyToClipboard()

  const form = useForm({
    search: '',
    sort: 'recent',
  })

  const onCopy = () => {
    const criteria = [`@p:${player.username}`, form.data.search]
      .filter((c) => c.length > 0)
      .join(' ')

    toast.promise(() => copy(criteria), {
      success: 'Critère copié !',
      error: 'Erreur lors de la copie',
    })
  }

  const data = React.useMemo(() => {
    return player.market.data
      .filter((entry) => {
        if (form.data.search.length === 0) {
          return true
        }

        return entry.name.toLowerCase().includes(form.data.search.toLowerCase())
      })
      .toSorted((a, b) => {
        switch (form.data.sort) {
          case 'recent':
            return b.createdAt - a.createdAt
          case 'alphabetic':
            return a.name.localeCompare(b.name)
          case 'asc':
            return a.price - b.price
          case 'desc':
            return b.price - a.price
          default:
            return 0
        }
      })
  }, [form.data.search, form.data.sort, player.market.data])

  return (
    <Card id="market" className={cn('pt-2 pb-0 border-yellow-500/30', className)} {...props}>
      <CardHeader className="border-b pr-2 pb-2! items-center justify-between">
        <CardTitle href="#market">Market</CardTitle>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-xs">
            Dernière mise à jour: {formatDate(player.market.lastUpdate, DateTime.DATETIME_SHORT)}
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <FilterIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="right">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm leading-none">Rechercher</h4>
                  <p className="text-xs text-muted-foreground">Entrez vos critères de recherche.</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <FormLabel htmlFor="search">Recherche</FormLabel>
                    <Input
                      id="search"
                      className="col-span-2 h-8"
                      value={form.data.search}
                      onChange={(event) => form.setData('search', event.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <FormLabel htmlFor="sort">Trier par</FormLabel>
                    <Select
                      value={form.data.sort}
                      onValueChange={(value) => form.setData('sort', value)}
                    >
                      <SelectTrigger id="sort" className="h-8 w-full col-span-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sortOptions.map((option) => (
                            <SelectItem value={option.value} key={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <FormLabel>Critère</FormLabel>
                    <Button
                      type="button"
                      onClick={onCopy}
                      variant="outline"
                      size="sm"
                      className="group col-span-2"
                      asChild
                    >
                      <button>
                        <span className="group-hover:hidden">@p:{player.username}</span>
                        <span className="hidden group-hover:inline">Copier</span>
                      </button>
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {data.length !== 0 ? (
          <ScrollArea className="h-[256px]">
            <Table>
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.createdAt}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={getMinecraftItemUrl(`${entry.item.name}:${entry.item.meta}`)}
                          alt={entry.name}
                          style={{ imageRendering: 'pixelated' }}
                          className="rounded-[inherit] h-8 w-auto object-contain"
                        />
                        <AvatarFallback className="dark:bg-inherit bg-inherit">
                          <QuestionIcon className="size-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1.5">
                        <p className="text-xs font-pixel truncate">
                          {removeColorCodes(entry.name)}
                        </p>
                        <p className="text-xs">
                          {formatDate(
                            DateTime.fromMillis(entry.createdAt).toISO()!,
                            DateTime.DATE_SHORT
                          )}{' '}
                          · Expire {DateTime.fromMillis(entry.expireAt).toRelative()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-pixel text-xs">
                      <span>{entry.type !== 'LUCKY_DRAWER' && `x${entry.item.quantity}`}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row flex-wrap justify-end gap-1">
                        {entry.pricePb !== 0 && (
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Badge
                                className="text-xs font-pixel min-w-20 justify-between rounded"
                                variant="outline"
                              >
                                <MarketPbIcon className="w-4" />
                                {formatNumber(entry.pricePb, { roundingMode: 'floor' })}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              {formatNumber(entry.pricePb, { notation: 'standard' })} PB
                            </TooltipContent>
                          </Tooltip>
                        )}
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Badge
                              className="text-xs font-pixel min-w-20 justify-between rounded"
                              variant="outline"
                            >
                              <MarketMoneyIcon className="w-4" />
                              {formatNumber(entry.price, { roundingMode: 'floor' })}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {formatPrice(entry.price, { notation: 'standard' })}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <p className="text-center p-4">Aucun élément trouvé</p>
        )}
      </CardContent>
    </Card>
  )
}
