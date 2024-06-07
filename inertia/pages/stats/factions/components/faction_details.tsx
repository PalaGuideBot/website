import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { FactionShowProps } from '../show'
import { InformationLine } from '../../components/information_line'
import { formatDate } from '~/lib/date'
import { getHeadUrl } from '~/lib/minecraft'
import { cn } from '~/lib/utils'
import { Link } from '@inertiajs/react'

type FactionDetailsProps = {
  faction: NonNullable<FactionShowProps['faction']>
}

export const factionDetails = ({ faction }: FactionDetailsProps) => {
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
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <ul className="h-full flex flex-col gap-2 justify-around">
              <li>
                <InformationLine
                  label="Date de création"
                  value={formatDate(new Date(faction.createdAt), 'PP')}
                />
              </li>
              <li>
                <InformationLine label="Effectif" value={`${faction.players.length} joueurs`} />
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <p>{faction.description.length > 0 ? faction.description : 'Pas de description'}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Membres</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {faction.players.map((player) => (
            <MemberCard key={player.uuid} player={player} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

const MemberCard = ({ player }: { player: FactionDetailsProps['faction']['players'][number] }) => {
  const isLeader = player.group.toLowerCase().includes('leader')
  return (
    <Link href={`/stats/users/${player.username}`}>
      <div className="flex gap-4 border p-4 bg-background/50 rounded-md hover:bg-background/30">
        <img src={getHeadUrl(player.username)} className="object-contain h-full w-auto" />
        <div className="flex flex-col justify-between gap-2">
          <p className="font-pixel text-sm">{player.username}</p>
          <p className={cn('font-mc-dungueons text-xs', isLeader && 'text-primary')}>
            {player.group}
          </p>
          {!isLeader ? (
            <p className="dark:text-surface-200 text-md">
              Membre depuis: {formatDate(new Date(player.joinedAt), 'PP')}
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
