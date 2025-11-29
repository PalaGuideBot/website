import { router } from '@inertiajs/react'

import Step1Image from '~/assets/images/link-steps/step-1.png'
import Step2Image from '~/assets/images/link-steps/step-2.png'
import Step3Image from '~/assets/images/link-steps/step-3.png'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useCopyToClipboard } from '~/hooks/use_copy_clipboard'

const SERVER_IP = 'play.palaguidebot.fr'

const Step1 = () => {
  const [, copy] = useCopyToClipboard()

  return (
    <Card className="bg-background lg:col-span-6">
      <CardHeader className="border-b justify-center">
        <CardTitle>Etape 1</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-1 flex-col justify-between gap-2">
        <p className="text-sm">Rejoignez notre serveur (Version 1.8):</p>
        <p>
          <Badge variant="secondary" stroke className="px-1.5">
            {SERVER_IP}
          </Badge>
          <Button variant="link" onClick={() => copy(SERVER_IP)}>
            Copier
          </Button>
        </p>
        <img
          src={Step1Image}
          alt="Etape 1"
          className="w-full h-auto object-contain rounded-md border"
        />
      </CardContent>
    </Card>
  )
}

const Step2 = () => {
  return (
    <Card className="bg-background lg:col-span-6">
      <CardHeader className="border-b justify-center">
        <CardTitle>Etape 2</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-1 flex-col justify-between gap-2">
        <p className="text-sm">
          Tapez la commande{' '}
          <Badge variant="secondary" stroke className="px-1.5">
            /link
          </Badge>{' '}
          avec votre code.
        </p>
        <img
          src={Step2Image}
          alt="Etape 2"
          className="w-full h-auto object-contain rounded-md border"
        />
      </CardContent>
    </Card>
  )
}

const Step3 = () => {
  return (
    <Card className="bg-background lg:col-start-4 lg:col-end-10">
      <CardHeader className="border-b justify-center">
        <CardTitle>Etape 3</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-1 flex-col justify-between gap-2">
        <p className="text-sm">
          <Button variant="link" className="p-0" onClick={() => router.reload()}>
            Actualisez
          </Button>{' '}
          cette page pour voir le résultat.
        </p>
        <img
          src={Step3Image}
          alt="Etape 3"
          className="w-full h-auto object-contain rounded-md border"
        />
      </CardContent>
    </Card>
  )
}

export function LinkSteps() {
  const steps = [Step1, Step2, Step3]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:place-content-center">
      {steps.map((Step, index) => (
        <Step key={index} />
      ))}
    </div>
  )
}
