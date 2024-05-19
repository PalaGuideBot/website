import { Head } from '@inertiajs/react'
import ThemeToggler from '~/components/shared/theme_toggler'

export default function Home() {
  return (
    <>
      <Head title="Accueil" />

      <div className="h-dvh w-full flex gap-2 items-center justify-center">
        <h1 className="font-bold">PalaGuideBot</h1>
        <ThemeToggler />
      </div>
    </>
  )
}
