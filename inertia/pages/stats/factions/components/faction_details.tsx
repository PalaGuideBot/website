import type { FactionShowProps } from '../show'

type FactionDetailsProps = {
  faction: NonNullable<FactionShowProps['faction']>
}

export const factionDetails = ({ faction }: FactionDetailsProps) => {
  return <pre>{JSON.stringify(faction, null, 1)}</pre>
}
