import { Alert, Button } from '@lemonsqueezy/wedges'
import { ArrowUpRightIcon } from 'lucide-react'

const MaintenanceBanner = () => {
  return (
    <Alert
      title="PalaGuideBot revient en v10 !"
      color="primary"
      variant="inline"
      className="bg-backgroud rounded-none min-h-[60px] border-surface-200 border-b"
      after={
        <Button
          variant="outline"
          className="light:bg-white"
          size="sm"
          after={<ArrowUpRightIcon />}
          asChild
        >
          <a target="_blank" href="/discord">
            Me tenir au courant
          </a>
        </Button>
      }
    />
  )
}

export { MaintenanceBanner }
