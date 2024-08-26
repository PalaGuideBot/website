import { router } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { SearchIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'
import Input from '~/components/ui/input'

type SearchFactionFormProps = {
  defaultValue?: string
}

const SearchFactionForm = ({ defaultValue }: SearchFactionFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    router.visit(`/factions/${name}`, {
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
          placeholder="Nom"
          name="name"
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

export { SearchFactionForm }
