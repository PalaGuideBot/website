import { router } from '@inertiajs/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { Infer } from '@vinejs/vine/types'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import { FormEvent, useRef, useState } from 'react'

import type { playerSearchResultValidator } from '#stats/validators/player_validator'
import { Command, CommandGroup, CommandItem, CommandList } from '~/components/ui/command'
import { Input } from '~/components/ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '~/components/ui/popover'
import { useDebounce } from '~/hooks/use_debounce'
import { client } from '~/lib/client'
import { getHeadUrl } from '~/lib/minecraft'

type PlayerSearchResult = Infer<typeof playerSearchResultValidator>

interface SearchPlayerFormProps {
  defaultValue?: string
  path: (username: string) => string
  onSuccess?: () => void
}

export function SearchPlayerForm({ defaultValue, path, onSuccess }: SearchPlayerFormProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverContentRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const [username, setUsername] = useState(defaultValue || '')
  const debouncedUsername = useDebounce(username, 500)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setOpen(false)

    router.visit(path(username), {
      preserveState: true,
      onStart: () => setIsLoading(true),
      onFinish: () => {
        setIsLoading(false)

        const exisitingSearch = queryClient.getQueryData<PlayerSearchResult>([
          'players',
          'search',
          username,
        ])

        if (exisitingSearch?.length === 0) {
          queryClient.invalidateQueries({ queryKey: ['players', 'search', username] })
        }
      },
      onSuccess: onSuccess,
    })
  }

  function onSelect(value: string) {
    setUsername(value)

    router.visit(path(value), {
      preserveState: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
      onSuccess: onSuccess,
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <SearchPlayerFormAutoComplete
        query={debouncedUsername}
        open={open}
        setOpen={setOpen}
        onSelect={onSelect}
        popoverContentRef={popoverContentRef}
        onInteractOutside={(event) => {
          const isPopoverContent = event.target === popoverContentRef.current
          const isTrigger = triggerRef.current?.contains(event.target as Node)

          if (isPopoverContent || isTrigger) {
            event.preventDefault()
          }
        }}
      >
        <div ref={triggerRef} className="relative" role="combobox" aria-expanded={open}>
          <Input
            className="peer ps-9 pe-9"
            placeholder="Pseudo"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={isLoading}
            autoComplete="off"
            onFocus={() => setOpen(true)}
          />

          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="submit"
            disabled={isLoading}
          >
            <ArrowRightIcon size={16} aria-hidden="true" />
          </button>
        </div>
      </SearchPlayerFormAutoComplete>
    </form>
  )
}

interface SearchPlayerFormAutoCompleteProps {
  query: string
  open?: boolean
  setOpen?: (open: boolean) => void
  onSelect?: (username: string) => void
  onInteractOutside?: React.ComponentProps<typeof PopoverContent>['onInteractOutside']
  popoverContentRef?: React.Ref<HTMLDivElement>
  children: React.ReactNode
}

function SearchPlayerFormAutoComplete({
  query,
  open,
  setOpen,
  onSelect,
  onInteractOutside,
  popoverContentRef,
  children,
}: SearchPlayerFormAutoCompleteProps) {
  const { data, isLoading, isError, isEnabled } = useQuery({
    queryKey: ['players', 'search', query],
    queryFn: async () => {
      const response = await client.post('players/search', { json: { q: query } })
      if (response.ok) {
        return response.json<Infer<typeof playerSearchResultValidator>>()
      }
      return []
    },
    enabled: query.length > 2,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>{children}</PopoverAnchor>
      {isEnabled && (
        <PopoverContent
          sideOffset={8}
          className="p-0 w-(--radix-popper-anchor-width)"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={onInteractOutside}
          ref={popoverContentRef}
        >
          <Command>
            <CommandList>
              {isLoading && (
                <CommandGroup>
                  <CommandItem disabled>Recherche...</CommandItem>
                </CommandGroup>
              )}
              {isError && (
                <CommandGroup>
                  <CommandItem disabled>Erreur lors de la recherche</CommandItem>
                </CommandGroup>
              )}
              {!isLoading && data && (
                <CommandGroup>
                  {data.length === 0 ? (
                    <CommandItem
                      value={query}
                      onSelect={(value) => {
                        onSelect?.(value)
                        setOpen?.(false)
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-muted flex size-8 items-center justify-center rounded">
                          <SearchIcon size={16} className="text-muted-foreground" />
                        </div>
                        <span>
                          Rechercher <span className="font-bold text-primary">{query}</span> sur
                          Paladium
                        </span>
                      </div>
                    </CommandItem>
                  ) : (
                    data.map((player) => (
                      <CommandItem
                        key={player.username}
                        value={player.username}
                        onSelect={(value) => {
                          onSelect?.(value)
                          setOpen?.(false)
                        }}
                      >
                        <img src={getHeadUrl(player.uuid)} className="object-cover size-8" />
                        <span>{player.username}</span>
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  )
}
