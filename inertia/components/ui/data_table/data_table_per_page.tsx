import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@lemonsqueezy/wedges'
import type { RowData, Table } from '@tanstack/react-table'
import { useId } from 'react'

interface DataTablePerPageProps<TData extends RowData> {
  table: Table<TData>
}

function DataTablePerPage<TData extends RowData>({ table }: DataTablePerPageProps<TData>) {
  const id = useId()

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor={id} className="max-sm:sr-only">
        Résultats par page
      </Label>
      <Select
        value={table.getState().pagination.pageSize.toString()}
        onValueChange={(value) => {
          table.setPageSize(Number(value))
        }}
      >
        <SelectTrigger id={id} className="p-6px h-8 w-fit min-w-8 whitespace-nowrap">
          <SelectValue placeholder="Choisir le nombre de résultat" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
          {[5, 10, 25, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize.toString()}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export { DataTablePerPage }
