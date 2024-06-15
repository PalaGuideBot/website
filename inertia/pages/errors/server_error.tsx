import { Head } from '@inertiajs/react'
import { DisplayError } from '~/components/shared/display_error'

type ServerErrorProps = {
  error: {
    code: string
    status: number
    message: string
  }
}

export default function ServerError(props: ServerErrorProps) {
  const { error } = props

  return (
    <>
      <Head title="Erreur" />
      <div className="h-dvh w-full flex flex-col items-center justify-center">
        <DisplayError>
          {error.code} - {error.message}
        </DisplayError>
      </div>
    </>
  )
}
