import DefaultLayout from '~/components/layouts/default'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'

type Question = {
  id: number
  content: string
  answer: string
}

const questions: Question[] = [
  {
    id: 1,
    content: 'Comment ça va ?',
    answer: 'On est là ca bouge pas.',
  },
]

export default function FaqPage() {
  return (
    <>
      <Head descriptors={[{ title: 'Foire aux questions' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>Foire aux questions</PageTitle>
          <p>Vous trouverez ici les questions les plus fréquemment posées par nos utilisateurs.</p>
          <Accordion type="multiple">
            {questions.map((question) => (
              <AccordionItem key={question.id} value={String(question.id)}>
                <AccordionTrigger>{question.content}</AccordionTrigger>
                <AccordionContent>{question.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Page>
      </DefaultLayout>
    </>
  )
}
