import type { InferPageProps } from '@adonisjs/inertia/types'

import type JobCalculatorController from '#tools/controller/job_calculator_controller'
import { DefaultLayout } from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { useSearchParams } from '~/hooks/use_search_params'
import { trackEvent } from '~/lib/umami'
import { CalculatorForm } from './components/calculator_form'
import { CalculatorResult } from './components/calculator_result'
import { JobCalculatorModeSelector } from './components/job_calculator_mode_selector'
import { JobCalculatorWrapper } from './components/job_calculator_wrapper'

export type JobCalculatorIndexProps = InferPageProps<JobCalculatorController, 'index'>

export default function JobCalculatorIndex(props: JobCalculatorIndexProps) {
  const { items, result } = props
  const [searchParams] = useSearchParams()

  return (
    <>
      <Head
        descriptors={[
          { title: 'Calculateur de métiers' },
          {
            name: 'description',
            content:
              "Calculez l'expérience et visualisez les éléments dont vous avez besoin pour progresser dans vos métiers.",
          },
          {
            name: 'og:description',
            content:
              "Calculez l'expérience et visualisez les éléments dont vous avez besoin pour progresser dans vos métiers.",
          },
        ]}
      />
      <DefaultLayout>
        <JobCalculatorWrapper
          mode={(searchParams.get('mode') ?? undefined) as 'standard' | 'reverse' | undefined}
          items={items}
        >
          <Page>
            <PageTitle>Calculateur de métiers</PageTitle>
            <p>
              Calculez l'xp et visualisez les éléments dont vous avez besoin pour progresser dans
              vos métiers.
            </p>
            <div className="flex flex-row items-center justify-between gap-2">
              <PageSubTitle>Paramètres</PageSubTitle>
              <div className="flex flex-row items-center gap-1">
                <span className="text-sm">Mode :</span>
                <JobCalculatorModeSelector />
              </div>
            </div>
            <CalculatorForm
              onSuccess={() => {
                if (result.state === 'STANDARD_SUBMITTED' && result.options.mode === 'standard') {
                  trackEvent('job-calculator', { mode: 'standard', job: result.options.job })
                }

                if (result.state === 'REVERSE_SUBMITTED' && result.options.mode === 'reverse') {
                  trackEvent('job-calculator', { mode: 'reverse', job: result.options.job })
                }
              }}
            />
            <CalculatorResult result={result} />
          </Page>
        </JobCalculatorWrapper>
      </DefaultLayout>
    </>
  )
}
