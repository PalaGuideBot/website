import { Link } from '@inertiajs/react'
import { MobileNavigation } from './nav'
import ThemeToggler from './shared/theme_toggler'

export default function Header() {
  return (
    <header className="md:hidden min-h-14 w-full border-b flex gap-4 justify-between items-center px-4 bg-surface">
      <MobileNavigation />
      <Link href="/">
        <img src="/logo.png" className="h-6 lg:h-8 w-full object-contain" />
      </Link>
      <ThemeToggler />
    </header>
  )
}
