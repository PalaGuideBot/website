import { Link } from '@inertiajs/react'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '../ui/badge'

export function ReverantBanner() {
  return (
    <Card className="relative gap-4 border-4 border-white/20 bg-orange-500/10 shadow-none">
      <CardHeader className="flex-col">
        <CardTitle className="text-sm">Reverant</CardTitle>
        <CardDescription>L'allié de votre faction, bot de gestion Discord.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="secondary"
          className="w-full shadow-none bg-gradient-to-tr from-orange-500/10 to-orange-500/40"
          size="sm"
          asChild
        >
          <Link href="https://beta.reverant.fr/?utm_source=palaguidebot" target="_blank">
            Découvrir Reverant
          </Link>
        </Button>
      </CardContent>
      <Badge
        variant="outline"
        stroke
        className="border-white/10 bg-orange-500 absolute -top-2 -right-2 animate-bounce"
      >
        Bêta
      </Badge>
    </Card>
  )
}
