import { DisplayError } from '~/components/shared/display_error'
import { Head } from '~/components/shared/head'

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
      <Head descriptors={[{ title: 'Erreur' }]} />
      <div className="h-dvh w-full flex flex-col items-center justify-center">
        <DisplayError>
          {error.code} - {error.message}
        </DisplayError>
      </div>
    </>
  )
}
