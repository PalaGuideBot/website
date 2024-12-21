export function translateItemType(type: string) {
  switch (type) {
    case 'ITEM':
      return 'Item'
    case 'LUCKY_DRAWER':
      return 'LD'
    case 'DRAWER':
      return 'Drawer'
    default:
      return type
  }
}

export const sortOptions: Array<{ label: string; value: string }> = [
  { label: 'Plus récent', value: 'recent' },
  { label: 'Alphabétique', value: 'alphabetic' },
  { label: 'Prix croissant', value: 'asc' },
  { label: 'Prix décroissant', value: 'desc' },
]
