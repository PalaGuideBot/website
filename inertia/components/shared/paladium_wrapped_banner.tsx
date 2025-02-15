import { Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const PaladiumWrappedBanner = () => {
  return (
    <Card className="border-4 border-white/10 bg-emerald-700/10 shadow-none">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-sm">Paladium Wrapped</CardTitle>
        <CardDescription>Redécouvrez votre aventure dès maintenant.</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Button variant="tertiary" className="w-full shadow-none" size="sm" asChild>
          <Link href="/wrapped">C'est parti !</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export { PaladiumWrappedBanner }
