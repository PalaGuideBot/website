import { Link } from '@inertiajs/react'
import ThemeToggler from '~/components/shared/theme_toggler'
import { Navigation } from './nav'

export default function Sidebar() {
  return (
    <aside className="hidden h-screen sticky top-0 overflow-y-auto w-72 lg:w-80 border-r bg-surface md:block">
      <div className="flex h-full flex-col">
        <div className="flex min-h-14 items-center justify-between gap-2 border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" className="h-6 lg:h-8 w-full object-contain" />
            <span className="font-bold">PalaGuideBot</span>
          </Link>
          <ThemeToggler />
        </div>
        <Navigation />
      </div>
    </aside>
  )
}
