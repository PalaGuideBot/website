import { Button } from '@lemonsqueezy/wedges'
import { RowData, Table } from '@tanstack/react-table'
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '~/lib/utils'
import { Pagination, PaginationContent, PaginationItem } from '../pagination'

interface DataTablePaginationProps<TData extends RowData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
}

function DataTablePagination<TData extends RowData>({
  table,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  return (
    <div className={cn('flex flex-row items-center gap-4', className)} {...props}>
      <div className="text-surface-300 flex grow justify-end text-sm whitespace-nowrap">
        <p className="text-surface-300 text-sm whitespace-nowrap" aria-live="polite">
          <span className="text-foreground">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              Math.max(
                table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                0
              ),
              table.getRowCount()
            )}
          </span>{' '}
          sur <span className="text-foreground">{table.getRowCount().toString()}</span>
        </p>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                size="sm"
                isIconOnly
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Aller à la première page"
              >
                <ChevronFirstIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="sm"
                variant="outline"
                isIconOnly
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Aller à la page précédente"
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="sm"
                variant="outline"
                isIconOnly
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Go to next page"
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="sm"
                variant="outline"
                isIconOnly
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Go to last page"
              >
                <ChevronLastIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export { DataTablePagination }
