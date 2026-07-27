import { type Infer } from '@vinejs/vine/types'
import { CalendarIcon } from 'lucide-react'

import type { latestPlayerDataValidator } from '#stats/validators/player_validator'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll_area'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { getHeadUrl } from '~/lib/minecraft'

export interface ApiLatestPlayersCardProps {
  data: Infer<typeof latestPlayerDataValidator>
}

export function ApiLatestPlayersCard({ data }: ApiLatestPlayersCardProps) {
  return (
    <Card className="pb-0 bg-background">
      <CardHeader className="border-b items-center justify-between">
        <CardTitle>Joueurs ajoutés récemment</CardTitle>
        <Badge className="size-6" shape="pill">
          {data.length}
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[570px]">
          <Table className="pr-2">
            <TableBody>
              {data
                .sort(
                  (a, b) =>
                    DateTime.fromISO(b.date).toMillis() - DateTime.fromISO(a.date).toMillis()
                )
                .map((player) => (
                  <TableRow key={player.uuid}>
                    <TableCell className="flex items-center gap-2">
                      <img
                        src={getHeadUrl(player.username)}
                        alt={`${player.username} avatar`}
                        className="size-12 rounded-sm"
                      />
                      <Button variant="link" className="no-underline hover:underline" asChild>
                        <a href={`/players/${player.username}`} target="_blank">
                          {player.username}
                        </a>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <CalendarIcon className="size-4 inline-block mr-2" />
                      Ajoutée le {formatDate(player.date)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
