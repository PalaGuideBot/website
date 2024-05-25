import { icons } from '~/content/jobs'
import { cn } from '~/lib/utils'
import type { Job } from '~/types'

type PaladiumJobProps = {
  job: string
  info: {
    level: number
    xp: number
  }
}

const PaladiumJob = ({ job, info }: PaladiumJobProps) => {
  const jobIcon = icons[job as Job]
  const jobColor = {
    alchemist: 'bg-job-alchemist',
    farmer: 'bg-job-farmer',
    hunter: 'bg-job-hunter',
    miner: 'bg-job-miner',
  }[job as Job]

  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="font-pixel text-xs">{job}</span>
      <div className="relative flex items-center justify-center">
        <img src={jobIcon} className="h-auto w-full max-w-32" />
        <div
          className={cn(
            'absolute bottom-0 p-1 w-8 lg:w-12 text-white text-center text-xs lg:text-base font-bold border-b-4 border-black/50',
            jobColor
          )}
        >
          {info.level}
        </div>
      </div>
    </div>
  )
}

export default PaladiumJob
