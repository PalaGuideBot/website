import { Link } from '@inertiajs/react'
import { Button, DropdownMenu } from '@lemonsqueezy/wedges'
import {
  ArrowDownAZ,
  ArrowDownUpIcon,
  CalendarArrowDown,
  CalendarArrowUp,
  ChartNoAxesGantt,
  ChevronDown,
} from 'lucide-react'
import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { formatDate } from '~/lib/date'
import { getHeadUrl } from '~/lib/minecraft'
import { cn } from '~/lib/utils'
import { InformationLine } from '../../components/information_line'
import type { FactionShowProps } from '../show'

type FactionDetailsProps = {
  faction: NonNullable<FactionShowProps['faction']>
}

export const FactionDetails = ({ faction }: FactionDetailsProps) => {
  const [sortMembersType, setSortMembersType] = useState<'alpha' | 'desc' | 'asc' | 'rang'>('asc')

  const sortOptions = [
    { value: 'alpha', label: 'Ordre alphabétique', icon: ArrowDownAZ },
    { value: 'desc', label: 'Date décroissante', icon: CalendarArrowUp },
    { value: 'asc', label: 'Date croissante', icon: CalendarArrowDown },
    { value: 'rang', label: 'Grade', icon: ChartNoAxesGantt },
  ] as const

  const unselectedSortOptions = useMemo(() => {
    return sortOptions.filter((option) => option.value !== sortMembersType)
  }, [sortMembersType])

  const filteredMembers = useMemo(() => {
    return faction.players.sort((a, b) => {
      switch (sortMembersType) {
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
  }, [sortMembersType])
  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
        <Card className="flex flex-col lg:row-span-2">
          <CardHeader className="border-b">
            <CardTitle className="text-center font-pixel">{faction.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex justify-center">
            <img
              src={faction.emblemUrl}
              alt={`${faction.name}'s emblem`}
              className="object-contain h-auto w-full max-w-56"
            />
          </CardContent>
        </Card>
        <Card id="informations" className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle href="#informations">Informations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <ul className="h-full flex flex-col gap-2 justify-around">
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
        <Card id="description" className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle href="#description">Description</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <p>{faction.description.length > 0 ? faction.description : 'Aucune description'}</p>
          </CardContent>
        </Card>
      </div>
      <Card id="membres">
        <CardHeader className="border-b flex flex-row items-center justify-between py-2">
          <CardTitle href="#membres">Membres</CardTitle>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="outline"
                className="!m-0 w-50 flex items-center justify-between group"
                size="sm"
                before={<ArrowDownUpIcon className="size-4" />}
                after={
                  <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
                }
              >
                <span>{sortOptions.find((option) => option.value === sortMembersType)?.label}</span>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              {unselectedSortOptions.map((option) => (
                <DropdownMenu.Item
                  key={option.value}
                  onClick={() => setSortMembersType(option.value)}
                >
                  <option.icon className="size-4 mr-2" />
                  {option.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu>

          {/*<ToggleGroup
            type="single"
            value={sortedMembers}
            onValueChange={(value) => {
              if (value.length) {
                setSortedMembers(value as 'asc' | 'desc' | 'rang' | 'alpha')
              }
            }}
            size="sm"
            className="!m-0"
          >
            <ToggleGroup.Item value="asc">Ascendant</ToggleGroup.Item>
            <ToggleGroup.Item value="desc">Descendant</ToggleGroup.Item>
            <ToggleGroup.Item value="rang">Rang</ToggleGroup.Item>
            <ToggleGroup.Item value="alpha">Alphabétique</ToggleGroup.Item>
          </ToggleGroup>*/}
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

const MemberCard = ({ player }: { player: FactionDetailsProps['faction']['players'][number] }) => {
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
          <p className="font-pixel text-sm">{player.username}</p>
          <p className={cn('font-mc-dungueons text-xs', isLeader && 'text-primary')}>
            {player.group}
          </p>
          {!isLeader ? (
            <p className="dark:text-surface-200 text-md">
              Membre depuis: {formatDate(new Date(player.joinedAt), DateTime.DATE_MED)}
            </p>
          ) : (
            <p>
              <span className="dark:text-surface-200 text-md">Membre depuis la création</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
