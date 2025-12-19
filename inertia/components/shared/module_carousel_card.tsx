import * as React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

type ModuleCarouselCardProps = {
  icon: React.ComponentType<{ className?: string }>
  name: string
  description: string
  onEnable?: () => void
  className?: string
}

export function ModuleCarouselCard({
  icon: Icon,
  name,
  description,
  onEnable,
  className,
}: ModuleCarouselCardProps) {
  const [isEnabled, setIsEnabled] = React.useState(false)

  const handleClick = () => {
    setIsEnabled(true)
    onEnable?.()
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row gap-4 justify-between items-start pb-4">
        <div className="flex items-center justify-center size-12 rounded-md bg-white text-primary-foreground [&>svg]:size-6">
          <Icon />
        </div>
      </CardHeader>
      <CardContent className="grow space-y-1.5">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="mt-5">
        {isEnabled ? (
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="bg-white text-black hover:bg-white/50"
          >
            <a
              href="https://beta.reverant.fr/?utm_source=palaguidebot"
              target="_blank"
              rel="noopener noreferrer"
            >
              Configurer
            </a>
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClick}
            className="bg-white text-black hover:bg-white/50"
          >
            Activer
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
