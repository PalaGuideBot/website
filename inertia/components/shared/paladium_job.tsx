import { useEffect } from 'react'
import { useIMask } from 'react-imask'

import { icons } from '~/content/jobs'
import { PALADIUM_OPTIONS } from '~/lib/paladium'
import { cn } from '~/lib/utils'
import type { Job } from '~/types'
import Input from '../ui/input'

type PaladiumJobProps = {
  job: string
  info: {
    level: number
    xp: number
  }
  onLevelChange?: (level: PaladiumJobProps['info']['level']) => void
}

const PaladiumJob = ({ job, info, onLevelChange }: PaladiumJobProps) => {
  const jobIcon = icons[job as Job]
  const jobColor = {
    alchemist: 'bg-job-alchemist',
    farmer: 'bg-job-farmer',
    hunter: 'bg-job-hunter',
    miner: 'bg-job-miner',
  }[job as Job]

  const {
    ref,
    setValue: setMaskValue,
    value: maskValue,
  } = useIMask(
    { mask: Number, min: PALADIUM_OPTIONS.MIN_JOB_LEVEL, max: PALADIUM_OPTIONS.MAX_JOB_LEVEL },
    {
      defaultValue: String(info.level),
      onAccept: (value) => {
        if (
          Number(value) >= PALADIUM_OPTIONS.MIN_JOB_LEVEL &&
          Number(value) <= PALADIUM_OPTIONS.MAX_JOB_LEVEL
        ) {
          onLevelChange?.(Number(value))
        }
      },
    }
  )

  useEffect(() => {
    if (maskValue !== String(info.level)) {
      setMaskValue(String(info.level))
    }
  }, [info.level])

  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="font-pixel text-sm">{job}</span>
      <div className="relative flex items-center justify-center">
        <div className="relative">
          <JobProgress
            className="absolute inset-0 h-full w-full p-[17%] pb-[13%]"
            job={job}
            info={info}
          />
          <img src={jobIcon} alt={`${job}'s icon`} className="relative h-auto w-full max-w-32" />
        </div>
        {onLevelChange ? (
          <Input
            // @ts-ignore
            ref={ref}
            inputMode="numeric"
            autoComplete="none"
            className={cn(
              'absolute bottom-0 h-8 p-0 max-w-12 text-white text-base text-center font-bold border-0 border-b-4 dark:border-black/50 border-black/50 dark:hover:border-black/50 rounded-none',
              jobColor
            )}
            onBlur={() => {
              if (!maskValue) {
                setMaskValue(String(info.level))
              }
            }}
          />
        ) : (
          <div
            className={cn(
              'absolute bottom-0 p-1 w-8 lg:w-12 text-white text-center text-xs lg:text-base font-bold border-b-4 border-black/50',
              jobColor
            )}
          >
            {info.level}
          </div>
        )}
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
        strokeWidth="60"
        strokeDasharray="2150"
        strokeDashoffset={2150 - (2150 * info.level) / 100}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
