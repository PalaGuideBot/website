import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import Autoplay from 'embla-carousel-autoplay'
import {
  ArrowRightIcon,
  BellIcon,
  ExternalLinkIcon,
  FileTextIcon,
  LayersPlus,
  ShieldCheckIcon,
  UserPlus2Icon,
} from 'lucide-react'

import type PageController from '#controllers/page_controller'
import { DiscordIcon } from '~/components/icons'
import { DefaultLayout } from '~/components/layouts/default'
import { CreditCard } from '~/components/shared/credit_card'
import { GiveawayBanner } from '~/components/shared/giveaway_banner'
import { Head } from '~/components/shared/head'
import { ModuleCarouselCard } from '~/components/shared/module_carousel_card'
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
        <section className="p-4 lg:p-6 pb-14 max-w-7xl mx-auto min-h-dvh grid items-center border-b">
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
        <section className="p-4 lg:p-6 pb-14 max-w-7xl mx-auto min-h-dvh grid items-center">
          <div className="grid lg:grid-cols-2 gap-8 items-center justify-center">
            <div className="space-y-6 order-last lg:order-first">
              <h1 className="text-3xl text-center font-black md:text-4xl lg:text-left xl:text-6xl">
                <span className="text-orange-400">Reverant</span>
              </h1>
              <p className="leading-6 text-center lg:text-left xl:text-lg">
                L'allié de votre faction, bot de gestion Discord. Gérez votre discord de faction
                avec <span className="text-orange-400 font-bold">Reverant</span> et ses divers
                modules,{' '}
                <span className="text-orange-400">
                  Check de base claim, recrutement, notification programmée
                </span>{' '}
                et bien plus encore.
              </p>

              <div className="grid items-center justify-center w-full md:grid-cols-2 gap-4">
                <Button
                  variant="secondary"
                  className="xl:text-lg py-2 px-8 group bg-white/80 text-black hover:bg-white/50"
                  asChild
                >
                  <a href="https://discord.gg/8XB69sm5vJ" target="_blank">
                    Discord
                  </a>
                </Button>
                <Button variant="outline" className="xl:text-lg py-2 px-8 group" asChild>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://beta.reverant.fr/?utm_source=palaguidebot"
                  >
                    <ExternalLinkIcon />
                    Découvrir Reverant
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center h-full order-first lg:order-last">
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
                    {
                      icon: ShieldCheckIcon,
                      name: 'Alertes Base Claim',
                      description: "Suivez l'avancée et la gestion de votre base claim.",
                    },
                    {
                      icon: FileTextIcon,
                      name: 'Logs Discord',
                      description: 'Surveillez les activités de votre serveur Discord.',
                    },
                    {
                      icon: UserPlus2Icon,
                      name: 'Recrutement',
                      description: 'Recrutez de nouveaux membres pour votre serveur Discord.',
                    },
                    {
                      icon: BellIcon,
                      name: 'Rappel Notifications',
                      description: 'Créer et envoyez des rappels pour les événements importants.',
                    },
                  ].map((card) => (
                    <CarouselItem key={card.name}>
                      <div className="flex items-center justify-center h-full">
                        <ModuleCarouselCard
                          className="w-full max-w-md h-full"
                          icon={card.icon}
                          name={card.name}
                          description={card.description}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <div className="pt-12 mt-12">
            <div className="space-y-8">
              <div className="space-y-3 text-center">
                <h2 className="text-3xl font-black md:text-4xl xl:text-5xl">
                  Des modules conçus pour <span className="text-orange-400">votre faction</span>
                </h2>
                <p className="leading-6 text-muted-foreground max-w-2xl mx-auto xl:text-lg">
                  Découvrez une séléction de modules disponibles sur Reverant pour améliorer la
                  gestion de votre faction et de votre serveur Discord.
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-4 w-full">
                <Card className="group hover:shadow-lg transition-all border">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      <span className="text-2xl">
                        <ShieldCheckIcon />
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">Alertes Base Claim</h3>
                      <p className="text-sm text-muted-foreground">
                        Facilitez la gestions de votre base claim avec des alertes en temps réel,
                        historiques...
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="group hover:shadow-lg transition-all duration-300 border">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      <span className="text-2xl">
                        <UserPlus2Icon />
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">Recrutement</h3>
                      <p className="text-sm text-muted-foreground">
                        Alternative aux formulaires classiques, recevez des notifications sur votre
                        discord
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="group hover:shadow-lg transition-all duration-300 border">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      <span className="text-2xl">
                        <BellIcon />
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">Rappel Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Plannifier vos notifications et rappel pour que vos membres ne manquent rien
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="group hover:shadow-lg transition-all duration-300 border">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      <span className="text-2xl">
                        <LayersPlus />
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">Développement</h3>
                      <p className="text-sm text-muted-foreground">
                        Reverant est en constante évolution avec de nouveaux modules
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
      <CreditCard className="fixed bottom-0 right-0 rounded-tr-none rounded-b-none border-b-0 border-r-0" />
    </>
  )
}
