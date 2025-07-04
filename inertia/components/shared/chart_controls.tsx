import { Settings2Icon } from 'lucide-react'

import { useChart } from '~/components/shared/chart_container'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { ScrollArea } from '~/components/ui/scroll_area'
import { cn } from '~/lib/utils'

interface ChartControlsProps {
  className?: string
}

export function ChartControls({ className }: ChartControlsProps) {
  const { series, toggleSeries, toggleAll } = useChart()
  const allVisible = series.every((s) => s.visible !== false)
  const someVisible = series.some((s) => s.visible !== false)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className={cn('size-8', className)}>
          <Settings2Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-w-60" align="end">
        <div>
          <div className="flex items-center space-x-2 border-b p-2">
            <Checkbox
              id="toggle-all"
              checked={!allVisible && someVisible ? 'indeterminate' : allVisible}
              onCheckedChange={(checked) => toggleAll(!!checked)}
            />
            <Label htmlFor="toggle-all">Tout basculer</Label>
          </div>
          <ScrollArea className="h-64">
            <div className="space-y-2 p-2">
              {series.map((s) => (
                <div key={s.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={s.id}
                    checked={s.visible !== false}
                    onCheckedChange={() => toggleSeries(s.id)}
                  />
                  <Label
                    htmlFor={s.id}
                    asChild
                    className="flex items-center space-x-2 text-sm font-medium"
                  >
                    <label>
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: s.color }} />
                      <span>{s.name}</span>
                    </label>
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
