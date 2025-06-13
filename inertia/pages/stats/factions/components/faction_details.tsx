import { Link } from '@inertiajs/react'
import {
  ArrowDownAZ,
  ArrowDownUpIcon,
  CalendarArrowDown,
  CalendarArrowUp,
  ChartNoAxesGantt,
  ChevronDown,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import FactionAlliance from '~/components/shared/faction_alliance'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown_menu'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { getHeadUrl } from '~/lib/minecraft'
import { cn } from '~/lib/utils'
import { InformationLine } from '../../components/information_line'
import type { FactionShowProps } from '../show'

type FactionDetailsProps = {
  faction: NonNullable<FactionShowProps['faction']>
}

export function FactionDetails({ faction }: FactionDetailsProps) {
  const [sort, setSort] = useState<'alpha' | 'desc' | 'asc' | 'rang'>('asc')

  const sortOptions = [
    { value: 'alpha', label: 'Ordre alphabétique', icon: ArrowDownAZ },
    { value: 'desc', label: 'Date décroissante', icon: CalendarArrowUp },
    { value: 'asc', label: 'Date croissante', icon: CalendarArrowDown },
    { value: 'rang', label: 'Grade', icon: ChartNoAxesGantt },
  ] as const

  const unselectedSortOptions = useMemo(() => {
    return sortOptions.filter((option) => option.value !== sort)
  }, [sort])

  const filteredMembers = useMemo(() => {
    return faction.players.sort((a, b) => {
      switch (sort) {
        case 'asc':
          return a.joinedAt - b.joinedAt
        case 'desc':
          return b.joinedAt - a.joinedAt
        case 'rang':
          const isALeader = a.group.toLowerCase().includes('leader')
          const isBLeader = b.group.toLowerCase().includes('leader')

          if (isALeader && !isBLeader) {
            return -1
          }
          if (!isALeader && isBLeader) {
            return 1
          }
          return a.group.localeCompare(b.group)
        default:
          return a.username.localeCompare(b.username)
      }
    })
  }, [sort, faction.players])

  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
        <Card className="pt-2 lg:row-span-2">
          <CardHeader className="border-b justify-center pb-2!">
            <CardTitle>{faction.bgName}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex justify-center">
            <img
              src={faction.emblemUrl}
              alt={`${faction.name}'s emblem`}
              className="object-contain h-auto w-full max-w-56"
            />
          </CardContent>
        </Card>
        <Card id="informations" className="pt-2 lg:col-span-2">
          <CardHeader className="border-b pb-2!">
            <CardTitle href="#informations">Informations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <ul className="h-full flex flex-col gap-2 justify-around">
              <li>
                <InformationLine
                  label="Alliance"
                  value={
                    <FactionAlliance alliance={faction.alliance ? faction.alliance : 'NULL'} />
                  }
                />
              </li>
              <li>
                <InformationLine
                  label="Date de création"
                  value={formatDate(new Date(faction.createdAt), DateTime.DATE_MED)}
                />
              </li>
              <li>
                <InformationLine label="Effectif" value={`${faction.players.length} joueurs`} />
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card id="description" className="pt-2 lg:col-span-2">
          <CardHeader className="border-b pb-2!">
            <CardTitle href="#description">Description</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <p>{faction.description.length > 0 ? faction.description : 'Aucune description'}</p>
          </CardContent>
        </Card>
      </div>
      <Card id="membres" className="pt-2">
        <CardHeader className="border-b items-center justify-between pr-2 pb-2!">
          <CardTitle href="#membres">Membres</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-50 flex items-center justify-between group"
                size="sm"
              >
                <ArrowDownUpIcon />
                <span>{sortOptions.find((option) => option.value === sort)?.label}</span>
                <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-(--radix-dropdown-menu-trigger-width)">
              {unselectedSortOptions.map((option) => (
                <DropdownMenuItem key={option.value} onClick={() => setSort(option.value)}>
                  <option.icon />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMembers.map((player) => (
            <MemberCard key={player.username} player={player} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function MemberCard({ player }: { player: FactionDetailsProps['faction']['players'][number] }) {
  const isLeader = player.group.toLowerCase().includes('leader')
  return (
    <Link href={`/players/${player.username}`}>
      <div className="flex gap-4 border p-4 bg-background/50 rounded-md hover:bg-background/30">
        <img
          src={getHeadUrl(player.username)}
          alt={`${player.username}'s avatar`}
          className="object-contain h-full w-auto"
        />
        <div className="flex flex-col justify-between gap-2">
          <p className="font-bold">{player.username}</p>
          <p className={cn('font-mc-dungueons text-xs', isLeader && 'text-primary')}>
            {player.group}
          </p>
          {!isLeader ? (
            <p className="text-muted-foreground text-md">
              Membre depuis: {formatDate(new Date(player.joinedAt), DateTime.DATE_MED)}
            </p>
          ) : (
            <p>
              <span className="text-muted-foreground text-md">Membre depuis la création</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
