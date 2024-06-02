import { create } from 'zustand'

type State = {
  dateInterval: 'last-30-days' | 'today'
}

type Actions = {
  setDateInterval: (interval: State['dateInterval']) => void
}

const initialState: State = {
  dateInterval: 'today',
}

export const useDateIntervalStore = create<State & Actions>((set) => ({
  ...initialState,
  setDateInterval: (interval) => set({ dateInterval: interval }),
}))
