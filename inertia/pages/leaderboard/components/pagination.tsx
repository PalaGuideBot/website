import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '~/components/ui/button'

export function Pagination({
  page,
  limit,
  total,
  onChange,
}: {
  page: number
  limit: number
  total: number
  onChange: (page: number) => void
}) {
  const maxPages = 10
  const totalPages = Math.min(Math.ceil(total / limit), maxPages)

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="outline"
        className="rounded-md"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="rounded-md"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
