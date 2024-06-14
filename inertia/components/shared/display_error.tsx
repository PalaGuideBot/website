import { TriangleAlertIcon } from 'lucide-react'

const DisplayError = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <TriangleAlertIcon className="size-20 animate-blink" />
      <span className="font-pixel animate-blink">Une erreur est survenue</span>
      <span className="font-bold text-lg text-destructive">{children}</span>
    </div>
  )
}

export { DisplayError }
