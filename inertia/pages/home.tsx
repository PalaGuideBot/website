import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'

import type PageController from '#controllers/page_controller'
import { DiscordIcon } from '~/components/icons'
import { DefaultLayout } from '~/components/layouts/default'
import { CreditCard } from '~/components/shared/credit_card'
import { GiveawayBanner } from '~/components/shared/giveaway_banner'
import { Head } from '~/components/shared/head'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel'
import { formatNumber } from '~/lib/utils'

const CAROUSEL_DELAY = 5000

type HomePageProps = InferPageProps<PageController, 'home'>

export default function Home(props: HomePageProps) {
  const { discordStats, isActiveGiveaway } = props

  return (
    <>
      <Head title="Accueil" defaultOg />
      <DefaultLayout className="relative p-0 lg:p-0 gap-0 lg:gap-0">
        {isActiveGiveaway && <GiveawayBanner className="rounded-none min-h-[60px]" />}
        <section className="p-4 lg:p-6 max-w-7xl mx-auto min-h-dvh grid items-center border-b">
          <div className="grid lg:grid-cols-2 gap-8 items-center justify-center">
            <div className="space-y-6">
              <h1 className="text-3xl text-center font-black md:text-4xl lg:text-left xl:text-6xl">
                Comprenez vos statistiques.
                <br />
                <span className="text-primary">Améliorez votre expérience de jeu.</span>
              </h1>
              <p className="leading-6 text-center lg:text-left xl:text-lg">
                Accédez à une panoplie de statistiques sur le serveur Minecraft{' '}
                <span className="text-primary font-bold">Paladium</span>, et prenez l'avantage sur
                vos adversaires.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="secondary" className="xl:text-lg p-2 group" asChild>
                  <Link href="/players">
                    Voir les statistiques
                    <ArrowRightIcon className="transition-all size-6 w-0! group-hover:w-6!" />
                  </Link>
                </Button>
                <Button variant="outline" className="xl:text-lg p-2 group" asChild>
                  <a target="_blank" href="/discord">
                    <DiscordIcon />
                    Rejoindre
                  </a>
                </Button>
              </div>
            </div>
            <Carousel
              plugins={[
                Autoplay({
                  delay: CAROUSEL_DELAY,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {[
                  'https://image.palaguidebot.fr/home/stats-preview.webp',
                  'https://image.palaguidebot.fr/home/leaderboard-preview.webp',
                  'https://image.palaguidebot.fr/home/status-preview.webp',
                ].map((path) => (
                  <CarouselItem key={path}>
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={path}
                        alt="Preview image"
                        className="object-contain h-auto w-full rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
        <section className="p-4 lg:p-6 pb-14 max-w-7xl mx-auto min-h-dvh grid items-center">
          <div className="grid lg:grid-cols-2 gap-8 items-center justify-center">
            <div className="flex items-center justify-center h-full">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: CAROUSEL_DELAY,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {[
                    'https://image.palaguidebot.fr/home/card-preview.webp',
                    'https://image.palaguidebot.fr/home/lookup-preview.webp',
                    'https://image.palaguidebot.fr/home/qdf-preview.webp',
                  ].map((path) => (
                    <CarouselItem key={path}>
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={path}
                          alt="Preview image"
                          className="object-contain h-auto w-full rounded-md"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl text-center font-black md:text-4xl lg:text-left xl:text-6xl">
                <span className="text-primary">Intégrez notre bot Discord.</span>
              </h1>
              <p className="leading-6 text-center lg:text-left xl:text-lg">
                Consultez vos statistiques directement sur{' '}
                <span className="text-primary font-bold">Discord</span>, et partagez-les avec vos
                amis. Améliorez votre <span className="text-primary font-bold">Expérience</span> de
                jeu en temps réel avec nos outils.
              </p>
              <div className="flex flex-col md:flex-row gap-2 items-center justify-center w-full">
                <Card className="p-0 w-56">
                  <CardContent className="p-4 flex flex-col gap-1 items-center justify-center">
                    <p className="font-black text-lg font-mc-dungueons tracking-[0.15rem]">
                      {formatNumber(discordStats.guildsCount)}
                    </p>
                    <p className="text-muted-foreground text-center">Serveurs</p>
                  </CardContent>
                </Card>
                <Card className="p-0 w-56">
                  <CardContent className="p-4 flex flex-col gap-1 items-center justify-center">
                    <p className="font-black text-lg font-mc-dungueons tracking-[0.15rem]">
                      {formatNumber(discordStats.usersCount)}
                    </p>
                    <p className="text-muted-foreground text-center">Utilisateurs uniques</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid items-center justify-center w-full">
                <Button variant="outline" className="xl:text-lg py-2 px-8 group" asChild>
                  <a
                    target="_blank"
                    href="https://discord.com/application-directory/1182646034661392394"
                  >
                    <ExternalLinkIcon />
                    En savoir plus
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
      <CreditCard className="fixed bottom-0 right-0 rounded-tr-none rounded-b-none border-b-0 border-r-0" />
    </>
  )
}
