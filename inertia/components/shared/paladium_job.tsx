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
        <div className="relative">
          <JobProgress className="absolute -top-[5px] scale-[0.64]" job={job} info={info} />
          <img src={jobIcon} className="relative h-auto w-full max-w-32" />
        </div>
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

type JobProgressProps = PaladiumJobProps & React.SVGProps<SVGSVGElement>

const JobProgress = ({ job, info, ...props }: JobProgressProps) => {
  return (
    <svg viewBox="0 0 667 769" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        className="animate-job-progress"
        d="M333.5 25.9808 L333.5 25.9808 L643.987 205.24 V563.76 L333.5 743.019 L23.0132 563.76 V205.24 Z"
        stroke={`var(--job-${job})`}
        strokeWidth="45"
        strokeDasharray="2150"
        strokeDashoffset={2150 - (2150 * info.level) / 100}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
