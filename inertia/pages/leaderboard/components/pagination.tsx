import { Button } from '@lemonsqueezy/wedges'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

export const Pagination = ({
  page,
  limit,
  total,
  onChange,
}: {
  page: number
  limit: number
  total: number
  onChange: (page: number) => void
}) => {
  const maxPages = 10
  const totalPages = Math.min(Math.ceil(total / limit), maxPages)

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="rounded-md"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        isIconOnly
      >
        <ChevronLeftIcon className="size-6" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="rounded-md"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        isIconOnly
      >
        <ChevronRightIcon className="size-6" />
      </Button>
    </div>
  )
}
