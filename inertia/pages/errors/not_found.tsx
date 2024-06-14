import { Head } from '@inertiajs/react'
import { DisplayError } from '~/components/shared/display_error'

export default function NotFound() {
  return (
    <>
      <Head title="Page introuvable" />
      <div className="h-dvh w-full flex flex-col items-center justify-center">
        <DisplayError>Page introuvable</DisplayError>
      </div>
    </>
  )
}
