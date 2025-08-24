import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { useJobCalculator } from './job_calculator_wrapper'

export function JobCalculatorModeSelector({
  size = 'sm',
  ...props
}: React.ComponentProps<typeof SelectTrigger>) {
  const { mode, setMode } = useJobCalculator()

  return (
    <Select value={mode} onValueChange={setMode}>
      <SelectTrigger size={size} {...props}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="reverse">Inversé</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
