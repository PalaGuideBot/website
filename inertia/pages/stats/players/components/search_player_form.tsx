import { router } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { SearchIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'

import Input from '~/components/ui/input'

type SearchPlayerFormProps = {
  defaultValue?: string
}

const SearchPlayerForm = ({ defaultValue }: SearchPlayerFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    router.visit(`/players/${username}`, {
      preserveState: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <Input
          className="rounded-r-none w-full"
          placeholder="Pseudo"
          name="username"
          defaultValue={defaultValue}
          disabled={isLoading}
        />
        <Button variant="tertiary" className="rounded-l-none w-12" disabled={isLoading} isIconOnly>
          <SearchIcon className="size-4" />
        </Button>
      </div>
    </form>
  )
}

export { SearchPlayerForm }
