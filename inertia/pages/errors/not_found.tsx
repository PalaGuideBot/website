import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'

export default function NotFound() {
  return (
    <>
      <Head descriptors={[{ title: 'Page introuvable' }]} />
      <div className="h-dvh w-full flex flex-col items-center justify-center">
        <DisplayError>Page introuvable</DisplayError>
      </div>
    </>
  )
}
