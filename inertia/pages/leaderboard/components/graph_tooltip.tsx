import { TooltipProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { Card, CardContent } from '~/components/ui/card'
import { formatDate } from '~/lib/date'

export const GraphTooltip = <TValue extends ValueType, TName extends NameType>({
  active,
  payload,
  label,
  pageOffset,
}: TooltipProps<TValue, TName> & { pageOffset?: number }) => {
  if (active && payload && payload.length) {
    return (
      <Card className="bg-background">
        <CardContent className="p-4 space-y-2 min-w-52">
          <div className="font-pixel text-xs">{formatDate(label, 'PP')}</div>
          {payload.map((p, index) => (
            <div key={p.dataKey} className="flex gap-2 items-center text-sm">
              {pageOffset !== undefined && (
                <span className="font-mc-dungueons text-xs"># {index + 1 + pageOffset}</span>
              )}
              <span>{p.dataKey}</span>
              <span className="font-bold">{p.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
}
