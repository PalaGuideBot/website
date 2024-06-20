import type PageController from '#controllers/page_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'
import CardPreview from '~/assets/images/card-preview.png'
import CraftPreview from '~/assets/images/craft-preview.png'
import LeaderboardPreview from '~/assets/images/leaderboard-preview.png'
import LookupPreview from '~/assets/images/lookup-preview.png'
import QdfPreview from '~/assets/images/qdf-preview.png'
import StatsPreview from '~/assets/images/stats-preview.png'
import StatusPreview from '~/assets/images/status-preview.png'
import { DiscordIcon } from '~/components/icons'
import DefaultLayout from '~/components/layouts/default'
import { CreditCard } from '~/components/shared/credit_card'
import { Card, CardContent } from '~/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel'
import { formatNumber } from '~/lib/utils'

const CAROUSEL_DELAY = 5000

type HomePageProps = InferPageProps<PageController, 'home'>

export default function Home(props: HomePageProps) {
  const { discordStats } = props

  return (
    <>
      <Head title="Accueil" />
      <DefaultLayout className="relative p-0 lg:p-0 gap-0 lg:gap-0">
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
                <Button
                  variant="secondary"
                  className="xl:text-lg p-2 group"
                  after={<ArrowRightIcon className="transition-all h-6 w-0 group-hover:w-6" />}
                  asChild
                >
                  <Link href="/stats/users">Voir les statistiques</Link>
                </Button>
                <Button
                  variant="outline"
                  className="xl:text-lg p-2 group"
                  before={<DiscordIcon className="mr-2" />}
                  asChild
                >
                  <a target="_blank" href="/discord">
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
                {[StatsPreview, LeaderboardPreview, StatusPreview].map((path, index) => (
                  <CarouselItem key={index}>
                    <div className="flex items-center justify-center h-full">
                      <img src={path} className="object-contain h-auto w-full rounded-md" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
        <section className="p-4 lg:p-6 max-w-7xl mx-auto min-h-dvh grid items-center">
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
                  {[CardPreview, CraftPreview, LookupPreview, QdfPreview].map((path, index) => (
                    <CarouselItem key={index}>
                      <div className="flex items-center justify-center h-full">
                        <img src={path} className="object-contain h-auto w-full rounded-md" />
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
                amis. Améloirez votre <span className="text-primary font-bold">Expérience</span> de
                jeu en temps réel avec nos outils.
              </p>
              <div className="flex flex-col md:flex-row gap-2 items-center justify-center w-full">
                <Card className="w-56">
                  <CardContent className="p-4 flex flex-col gap-1 items-center justify-center">
                    <p className="font-black text-lg font-mc-dungueons tracking-[0.15rem]">
                      {formatNumber(discordStats.guildsCount)}
                    </p>
                    <p className="text-surface-300 text-center">Serveurs</p>
                  </CardContent>
                </Card>
                <Card className="w-56">
                  <CardContent className="p-4 flex flex-col gap-1 items-center justify-center">
                    <p className="font-black text-lg font-mc-dungueons tracking-[0.15rem]">
                      {formatNumber(discordStats.usersCount)}
                    </p>
                    <p className="text-surface-300 text-center">Utilisateurs uniques</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid items-center justify-center w-full">
                <Button
                  variant="outline"
                  className="xl:text-lg py-2 px-8 group"
                  before={<ExternalLinkIcon className="mr-2" />}
                  asChild
                >
                  <a target="_blank" href="/discord">
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
