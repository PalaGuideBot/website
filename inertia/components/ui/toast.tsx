import { Toaster as Sonner } from 'sonner'

import { useTheme } from '../theme_provider'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-surface-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-surface-500',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-secondary group-[.toast]:text-white',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
