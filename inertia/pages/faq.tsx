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
    content: "Pourquoi je n'arrive pas à voir les statisitiques d'un joueur ?",
    answer:
      "Pour voir les statistiques d'un joueur, il faut que le joueur se soit connecté au moins une fois à Paladium.",
  },
  {
    id: 2,
    content: "Pourquoi je n'arrive pas à charger les statistiques d'un nouveau joueur ?",
    answer:
      "Il se peut que lorsque un joueur s'est déjà connecté à Paladium, on ne peut pas charger ses statistiques. Pour cela il faut patienter quelques minutes et réessayer, car notre application est dépendante de l'API publique de Paladium (limitée au niveau du nombre de requêtes).",
  },
  {
    id: 3,
    content: 'Pourquoi il y a des statistiques qui sont masquées ?',
    answer:
      "Si les statistiques d'un joueur sont masquées, cela signifie que le joueur l'a désactivé sur son profil en jeu.",
  },
  {
    id: 4,
    content: "J'ai une erreur 500, que dois-je faire ?",
    answer:
      'Si vous avez une erreur 500, cela signifie que notre application a rencontré un problème. Vous devez patienter le temps que ce soit résolu ou vous pouvez nous contacter via notre serveur Discord.',
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
                <AccordionTrigger className="font-semibold">{question.content}</AccordionTrigger>
                <AccordionContent>{question.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Page>
      </DefaultLayout>
    </>
  )
}
