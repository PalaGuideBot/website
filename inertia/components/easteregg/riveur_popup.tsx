import { DialogTrigger } from '@radix-ui/react-dialog'

import { AnimatedSpan, Terminal, TypingAnimation } from '~/components/magicui/terminal'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'

function TerminalRiveur() {
  return (
    <Terminal className="mt-2">
      <TypingAnimation>&gt; ssh root@84.32.21.111</TypingAnimation>

      <AnimatedSpan delay={1500} className="text-green-500">
        <span>✔ Connection established.</span>
      </AnimatedSpan>

      <TypingAnimation delay={2000}>&gt; sudo iptables -L -v -n</TypingAnimation>

      <AnimatedSpan delay={4000} className="text-blue-500">
        <span>ℹ Listing iptables rules...</span>
      </AnimatedSpan>

      <TypingAnimation delay={4500}>&gt; sudo iptables -P INPUT DROP</TypingAnimation>

      <AnimatedSpan delay={6500} className="text-green-500">
        <span>✔ Blocked all incoming connections.</span>
      </AnimatedSpan>

      <TypingAnimation delay={7000}>&gt; sudo iptables -P OUTPUT DROP</TypingAnimation>

      <AnimatedSpan delay={9500} className="text-green-500">
        <span>✔ Blocked all outgoing connections.</span>
      </AnimatedSpan>

      <TypingAnimation delay={10500}>&gt; sudo iptables -F</TypingAnimation>

      <AnimatedSpan delay={12000} className="text-green-500">
        <span>✔ Flushed all firewall rules.</span>
      </AnimatedSpan>

      <TypingAnimation delay={12500}>&gt; sudo iptables -X</TypingAnimation>

      <AnimatedSpan delay={14000} className="text-green-500">
        <span>✔ Deleted all custom chains.</span>
      </AnimatedSpan>

      <TypingAnimation delay={14500} className="text-red-500">
        Connection to server closed.
      </TypingAnimation>

      <TypingAnimation delay={16500} className="text-red-500">
        PalaGuideBot Dropped by Riveur ! Ouups.
      </TypingAnimation>
    </Terminal>
  )
}

export function RiveurPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-xs text-primary hover:no-underline cursor-default"
        >
          Riveur
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-transparent">
        <DialogTitle className="sr-only">Riveur EasterEgg</DialogTitle>
        <TerminalRiveur />
      </DialogContent>
    </Dialog>
  )
}
