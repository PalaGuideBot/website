import { Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import React from 'react'

import type { PageError } from '#app/types'
import { cn } from '~/lib/utils'

interface DisplayErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: PageError
}

const DisplayError = ({ error, className, children, ...props }: DisplayErrorProps) => {
  return (
    <div className={cn('min-h-[400px] flex flex-col', className)} {...props}>
      <div className="flex-1 flex flex-col gap-4 justify-evenly">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="space-y-1 text-center">
            <span className="text-primary font-extrabold text-4xl">{error?.status || 500}</span>
            <p className="text-lg text-surface-500">Une erreur est survenue.</p>
          </div>
          <Button className="w-fit" variant="outline" asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
        {error && (
          <div className="space-y-1.5">
            <h3 className="font-semibold">Message</h3>
            <p>{error.message}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export { DisplayError }
