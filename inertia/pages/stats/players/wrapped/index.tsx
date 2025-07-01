import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import type { Infer } from '@vinejs/vine/types'
import { PlayCircleIcon, RefreshCcwIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import type PlayerController from '#stats/controllers/player_controller'
import type { playerWrappedValidator } from '#stats/validators/player_validator'
import { CoinIcon, QuestionIcon } from '~/components/icons'
import { HyperText } from '~/components/magicui/hyper_text'
import { NumberTicker } from '~/components/magicui/number_ticker'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { JobProgress } from '~/components/shared/paladium_job'
import { ThemeToggler } from '~/components/shared/theme_toggler'
import { SkinViewer3d } from '~/components/skin_viewer_3d'
import { MountViewer } from '~/components/three/mount'
import { PetViewer } from '~/components/three/pet'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { allianceToIcon } from '~/content/factions'
import { icons as jobIcons } from '~/content/jobs'
import { icons as leaderboardIcons } from '~/content/leaderboards'
import { getMountNameByType } from '~/content/mounts'
import { getPet, translatePet } from '~/content/pets'
import { getClickerBuildingImage } from '~/lib/clicker'
import { getFullBobyUrl, getSkinUrl } from '~/lib/minecraft'
import { noCase } from '~/lib/string'
import { cn } from '~/lib/utils'
import { SearchPlayerForm } from '../components/search_player_form'

type Player = Infer<typeof playerWrappedValidator>

export type PlayerWrappedPageProps = InferPageProps<PlayerController, 'wrapped'>

export default function PlayerWrappedPage(props: PlayerWrappedPageProps) {
  const { player } = props

  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 8

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const replaySlide = () => {
    setCurrentSlide(0)
  }

  if (!player) {
    return (
      <>
        <Head
          descriptors={[
            { title: 'Wrapped' },
            {
              name: 'description',
              content: 'Redécouvrez votre aventure sur Paladium au travers de ce Wrapped !',
            },
            {
              name: 'og:description',
              content: 'Redécouvrez votre aventure sur Paladium au travers de ce Wrapped !',
            },
          ]}
        />
        <main className="flex w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Page>
            <PageTitle>Paladium Wrapped</PageTitle>
            <p>Redécouvrez votre aventure sur Paladium au travers de ce Wrapped !</p>
            <SearchPlayerForm path={(username) => `/wrapped/${username}`} />
          </Page>
        </main>
      </>
    )
  }

  const slides = [
    <motion.div
      key="welcome"
      className="text-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold mb-8">Paladium Wrapped v10</h1>
      <p className="text-xl">
        Hey {player.username} ! Prêt à revenir sur les statistiques de votre aventure ?
      </p>
      <motion.div
        className="border-4 border-white/10 rounded-md w-80 flex items-center justify-center bg-emerald-700/10 backdrop-blur-sm shadow-2xl mx-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SkinViewer3d
          className="h-auto! w-full pointer-events-none!"
          width="278"
          height="450"
          skinUrl={getSkinUrl(player.username)}
          options={{ enableControls: false }}
        />
      </motion.div>
      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Pour une meilleure expérience, veuillez visiter cette page sur un ordinateur
      </motion.p>
    </motion.div>,

    <motion.div
      key="general"
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Général</h2>
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-3xl font-bold pb-4 border-b">Temps de jeu</p>
        {player.timePlayed > 0 ? (
          <p className="text-xl">
            Vous avez joué pendant{' '}
            <NumberTicker
              className="font-mc-dungueons text-primary text-2xl"
              value={player.timePlayed / 60}
            />{' '}
            heures
          </p>
        ) : (
          <p className="text-xl">
            Vous avez <span className="font-mc-dungueons text-primary">masqué</span> cette
            information
          </p>
        )}
      </motion.div>
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-3xl font-bold pb-4 border-b">Faction</p>
        <div className="flex flex-row gap-8 items-center">
          {player.faction.emblemUrl && (
            <img
              src={player.faction.emblemUrl}
              alt="Emblème de la faction"
              className="w-24 h-24 rounded-lg"
            />
          )}
          <div className="space-y-1.5">
            <p className="text-xl">
              Vous êtes dans la faction{' '}
              <span className="inline-flex flex-row items-center gap-2 font-mc-dungueons text-primary text-2xl">
                {player.faction.alliance && renderAllianceIcon(player.faction.alliance)}
                <span>{player.faction.name || 'Wilderness'}</span>
              </span>
            </p>
            {player.factionsCount > 1 ? (
              <p className="text-xl">
                Vous avez changé de faction{' '}
                <span className="font-mc-dungueons text-primary text-2xl">
                  <NumberTicker
                    className="font-mc-dungueons text-primary text-2xl"
                    value={player.factionsCount}
                    delay={1.2}
                  />
                </span>{' '}
                fois
              </p>
            ) : (
              <p className="text-xl">
                Vous n'avez <span className="font-mc-dungueons text-primary text-2xl">jamais</span>{' '}
                changé de faction
              </p>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <p className="text-3xl font-bold pb-4 border-b">Amis</p>
        {player.friends > 0 ? (
          <p className="text-xl">
            Vous êtes amis avec{' '}
            <NumberTicker
              className="font-mc-dungueons text-primary text-2xl"
              value={player.friends}
              delay={2.4}
            />{' '}
            joueurs
          </p>
        ) : (
          <p className="text-xl">
            Vous avez fait <span className="font-mc-dungueons text-primary text-2xl">aucune</span>{' '}
            demande d'amis 😔
          </p>
        )}
      </motion.div>
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4 }}
      >
        <p className="text-3xl font-bold pb-4 border-b">Succès</p>
        <p className="text-xl">
          Vous avez débloqué{' '}
          <NumberTicker
            className="font-mc-dungueons text-primary text-2xl"
            value={player.achievements.completed}
            delay={3.6}
          />{' '}
          succès pour un total de{' '}
          <NumberTicker
            className="font-mc-dungueons text-primary text-2xl"
            value={player.achievements.total}
            delay={3.6}
          />
        </p>
      </motion.div>
    </motion.div>,

    <motion.div
      key="companions"
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Vos compagnons</h2>
      <div className="grid sm:grid-cols-2 w-fit gap-8 justify-center mx-auto">
        <Card className="gap-4 border-4 border-white/10 bg-emerald-700/10 backdrop-blur-sm shadow-2xl">
          <CardHeader className="justify-center">
            <CardTitle className="text-2xl">Monture</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            {player.mount && (
              <>
                <MountViewer
                  model={getMountNameByType(player.mount.mountType)}
                  enableControls={false}
                  rotation={[0, Math.PI / 0.8, 0]}
                  isLooping
                />
                <ul className="flex flex-col gap-2 items-center font-mc-dungueons text-nowrap">
                  <li className="text-xl">
                    Nom : <span className="text-primary">{player.mount.name}</span>
                  </li>
                  <li className="text-xl">
                    Niveau : <NumberTicker className="text-primary" value={player.mount.level} />
                  </li>
                </ul>
              </>
            )}
            {!player.mount && (
              <div className="flex flex-col items-center justify-center gap-4 h-48">
                <QuestionIcon className="size-16" />
                <p>Vous ne possédez aucune monture</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="gap-4 border-4 border-white/10 bg-emerald-700/10 backdrop-blur-sm shadow-2xl">
          <CardHeader className="justify-center">
            <CardTitle className="text-2xl">Familier</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            {player.pet && (
              <>
                <PetViewer
                  className="pointer-events-none! sm:pointer-events-auto!"
                  model={getPet(player.pet.currentSkin)}
                  enableControls={false}
                  rotation={[0, Math.PI / -0.8, 0]}
                  isLooping
                />
                <ul className="flex flex-col gap-2 items-center font-mc-dungueons">
                  <li className="text-xl">
                    Skin :{' '}
                    <span className="text-primary">
                      {translatePet(getPet(player.pet.currentSkin))}
                    </span>
                  </li>
                  <li className="text-xl">
                    Niveau : <NumberTicker className="text-primary" value={player.pet.level} />
                  </li>
                </ul>
              </>
            )}
            {!player.pet && (
              <div className="flex flex-col items-center justify-center gap-4 h-48">
                <QuestionIcon className="size-16" />
                <p>Vous ne possédez aucun familier</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>,

    <motion.div
      key="jobs"
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Vos métiers</h2>
      <div className="w-fit grid sm:grid-cols-2 gap-8 items-center justify-center mx-auto">
        {Object.entries(player.jobs).map(([jobName, level], index) => {
          const jobIcon = jobIcons[jobName as 'miner']
          return (
            <motion.div
              key={jobName}
              className="p-4 gap-4 w-64 border-4 border-white/10 bg-emerald-700/10 flex flex-col py-4 rounded-md backdrop-blur-sm shadow-2xl"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index }}
            >
              <CardHeader className="justify-center">
                <CardTitle className="text-2xl uppercase">{jobName}</CardTitle>
              </CardHeader>
              <CardContent className="relative flex flex-col items-center justify-center">
                <div className="relative">
                  <JobProgress
                    className="absolute inset-0 h-full w-full p-[17%] pb-[13%]"
                    job={jobName}
                    info={{ level, xp: 0 }}
                  />
                  <img
                    src={jobIcon}
                    alt={`${jobName}'s icon`}
                    className="relative h-auto w-full max-w-32"
                  />
                </div>
                <p className="font-mc-dungueons">
                  Lvl. <NumberTicker className="text-primary" value={level} delay={index} />
                </p>
              </CardContent>
            </motion.div>
          )
        })}
      </div>
    </motion.div>,

    <motion.div
      key="wealth"
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Votre richesse</h2>
      <div className="flex flex-col gap-8 items-center justify-center py-8">
        <p className="text-4xl font-mc-dungueons text-primary">
          <NumberTicker value={player.moneyMax} /> $
        </p>
        <p className="text-lg">Le montant le plus élevé que vous avez atteint</p>
      </div>
    </motion.div>,

    <motion.div
      key="best-ranking"
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Votre meilleur classement</h2>
      <motion.div
        className="w-64 border-4 border-white/10 bg-emerald-700/10 flex flex-col gap-4 py-4 rounded-md backdrop-blur-sm shadow-2xl mx-auto"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CardHeader className="justify-center">
          <CardTitle className="text-2xl uppercase">
            {player.bestLeaderboard ? noCase(player.bestLeaderboard.name) : 'Inconnu'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {player.bestLeaderboard ? (
            <>
              {renderLeaderboardIcon(player.bestLeaderboard.name)}
              <p className="text-lg font-mc-dungueons text-primary">
                #<NumberTicker value={player.bestLeaderboard.value} />
              </p>
            </>
          ) : (
            <QuestionIcon className="size-16 my-12" />
          )}
        </CardContent>
      </motion.div>
    </motion.div>,

    <motion.div
      key="clicker"
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Clicker</h2>
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-3xl font-bold pb-4 border-b">Production</p>
        {player.clicker.production > 0 ? (
          <p className="text-xl">
            Vous avez produit un total de{' '}
            <span className="inline-flex flex-row items-center gap-2 font-mc-dungueons text-primary">
              <NumberTicker
                className="font-mc-dungueons text-primary text-2xl"
                value={player.clicker.production}
              />
              <CoinIcon className="size-6" />
            </span>
          </p>
        ) : (
          <p className="text-xl">
            Vous avez produit{' '}
            <span className="inline-flex flex-row items-center gap-2 font-mc-dungueons text-primary">
              <span>aucun</span>
              <CoinIcon className="size-6" />
            </span>
          </p>
        )}
      </motion.div>
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-3xl font-bold pb-4 border-b">Bâtiments</p>
        <div className="flex flex-row gap-8 items-center">
          <div className="space-y-1.5">
            <p className="text-xl">
              Vous avez débloqué{' '}
              <NumberTicker
                className="font-mc-dungueons text-primary text-2xl"
                value={player.clicker.buildings.unlocked}
                delay={1.2}
              />{' '}
              bâtiments pour un total de{' '}
              <NumberTicker
                className="font-mc-dungueons text-primary text-2xl"
                value={player.clicker.buildings.total}
                delay={1.2}
              />
            </p>
            {player.clicker.buildings.lastUnlocked && (
              <div className="flex flex-row items-end gap-2">
                <Card className="border-4 border-white/10 bg-emerald-700/10 backdrop-blur-sm shadow-2xl p-2">
                  <img
                    src={getClickerBuildingImage(player.clicker.buildings.lastUnlocked.name)}
                    alt={player.clicker.buildings.lastUnlocked.name}
                    className="w-16 h-auto object-cover"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </Card>
                <p className="text-xl">
                  <span className="font-mc-dungueons text-primary">
                    {player.clicker.buildings.lastUnlocked.label}
                  </span>{' '}
                  est le dernier bâtiment que vous avez débloqué
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <p className="text-3xl font-bold pb-4 border-b">Améliorations</p>
        <p className="text-xl">
          Vous avez débloqué{' '}
          <NumberTicker
            className="font-mc-dungueons text-primary text-2xl"
            value={player.clicker.upgrades.unlocked}
            delay={2.4}
          />{' '}
          améliorations pour un total de{' '}
          <NumberTicker
            className="font-mc-dungueons text-primary text-2xl"
            value={player.clicker.upgrades.total}
            delay={2.4}
          />
        </p>
      </motion.div>
    </motion.div>,

    <motion.div
      key="end"
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Fin</h2>
      <motion.div
        className="mx-auto min-w-2xl w-fit border-4 border-white/10 bg-emerald-700/10 rounded-md backdrop-blur-sm shadow-2xl"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CardContent className="pt-4 pb-0 relative flex flex-col sm:flex-row items-center gap-8">
          <div className="relative size-48 overflow-hidden">
            <img
              src={getFullBobyUrl(player.uuid, 'front')}
              alt={player.username}
              className="pt-6"
            />
          </div>
          <HyperText
            className="grow animate-glow text-xl sm:text-5xl text-center pb-4"
            charcacterClassName="font-mc-dungueons"
          >
            {player.username}
          </HyperText>
        </CardContent>
      </motion.div>
      <motion.p
        className="text-lg text-center"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Vous avez fait le tour de vos statistiques, merci de votre visite !
      </motion.p>
      <motion.p
        className="text-lg text-center"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        Vous avez la possibilité de sauvegarder une carte
        <br /> qui résume vos statistiques préférées en continuant la navigation.
      </motion.p>
      <motion.div
        className="flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Button variant="tertiary" onClick={replaySlide}>
          <RefreshCcwIcon />
          Recommencer
        </Button>
        <Button variant="tertiary" asChild>
          <Link href={`/wrapped/${player.username}/end`}>
            <PlayCircleIcon />
            Continuer
          </Link>
        </Button>
      </motion.div>
    </motion.div>,
  ]

  return (
    <>
      <Head descriptors={[{ title: `${player.username} : Wrapped` }]} />
      <main
        className="relative min-h-screen p-8 text-white flex flex-col gap-4 items-center justify-start"
        onClick={currentSlide + 1 !== totalSlides ? nextSlide : undefined}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cover bg-center dark:grayscale-0 grayscale"
          style={{
            backgroundImage: "url('/paladium-menu-background.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black to-black/80" />
        <div className="relative max-w-5xl w-full grow">
          <AnimatePresence mode="wait">{slides[currentSlide]}</AnimatePresence>
        </div>
        <div
          className={cn(
            'relative space-y-4',
            currentSlide + 1 === totalSlides ? 'hidden' : 'block'
          )}
        >
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                )}
              />
            ))}
          </div>
          <p className="text-center">Cliquez n'importe où pour continuer</p>
        </div>
      </main>
      <ThemeToggler variant="tertiary" className="fixed top-0 right-0 m-4" />
      {currentSlide === 0 && (
        <span className="text-sm fixed bottom-0 right-0 m-4 italic">Inspirée de Lunar Client</span>
      )}
    </>
  )
}

function renderAllianceIcon(alliance: Required<Player['faction']>['alliance']) {
  const Icon = allianceToIcon(alliance)
  return Icon && <Icon className="size-6" />
}

function renderLeaderboardIcon(leaderboard: string) {
  const Icon = leaderboardIcons[leaderboard as 'money']
  return <Icon className="size-32" />
}
