import type { Infer } from '@vinejs/vine/types'

import type {
  calculatorOptionsValidator,
  calculatorResultValidator,
} from '#tools/validators/pog_validator'
import { Card, CardContent } from '~/components/ui/card'

interface CalculatorResultProps {
  options: Infer<typeof calculatorOptionsValidator>
  result: Infer<typeof calculatorResultValidator>
}

const CalculatorResult = ({ options, result }: CalculatorResultProps) => {
  return (
    <Card>
      <CardContent className="pt-4">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </CardContent>
    </Card>
  )
}

export { CalculatorResult }
