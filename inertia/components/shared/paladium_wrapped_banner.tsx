import { Link } from '@inertiajs/react'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '../ui/badge'

export function PaladiumWrappedBanner() {
  return (
    <Card className="relative gap-4 border-4 border-white/10 bg-indigo-500/10 shadow-none">
      <CardHeader className="flex-col">
        <CardTitle className="text-sm">Paladium Wrapped</CardTitle>
        <CardDescription>Redécouvrez votre aventure dès maintenant.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="secondary"
          className="w-full shadow-none bg-gradient-to-tr from-indigo-500/10 to-indigo-500/40"
          size="sm"
          asChild
        >
          <Link href="/wrapped">C'est parti !</Link>
        </Button>
      </CardContent>
      <Badge
        variant="outline"
        stroke
        className="border-white/10 bg-indigo-500 absolute -top-2 -right-2 animate-bounce"
      >
        v11
      </Badge>
    </Card>
  )
}
