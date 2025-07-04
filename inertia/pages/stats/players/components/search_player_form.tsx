import { router } from '@inertiajs/react'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'

import { Input } from '~/components/ui/input'

interface SearchPlayerFormProps {
  defaultValue?: string
  path: (username: string) => string
  onSuccess?: () => void
}

export function SearchPlayerForm({ defaultValue, path, onSuccess }: SearchPlayerFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    router.visit(path(username), {
      preserveState: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
      onSuccess: onSuccess,
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <Input
          className="peer ps-9 pe-9"
          placeholder="Pseudo"
          name="username"
          defaultValue={defaultValue}
          disabled={isLoading}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
