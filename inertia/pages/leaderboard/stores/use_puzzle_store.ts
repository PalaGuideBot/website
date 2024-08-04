import { create } from 'zustand'

type State = {
  currentValue: string
  resolved: boolean
}

type Actions = {
  next: (side: 'left' | 'right') => void
}

const RESOLVED_PUZZLE = 'DGDDGDGG'

const initialState: State = {
  currentValue: '',
  resolved: false,
}

export const usePuzzleStore = create<State & Actions>((set) => ({
  ...initialState,
  next: (side) => {
    set((state) => {
      const sideMap: Record<typeof side, string> = {
        left: 'G',
        right: 'D',
      }

      const value = sideMap[side] ?? ''

      const currentValue = state.currentValue + value

      if (!RESOLVED_PUZZLE.startsWith(currentValue)) {
        return { currentValue: initialState.currentValue }
      }

      const resolved = currentValue === RESOLVED_PUZZLE

      if (resolved) {
        return {
          currentValue: '',
          resolved: !state.resolved,
        }
      }

      return {
        currentValue,
      }
    })
  },
}))
