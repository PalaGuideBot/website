type Item = {
  quantity: number
  itemId: string
  action: string
}

/**
 * Parse une chaîne du format "34:diamond,94:paladium_ore"
 * en un tableau d'objets de type Item.
 */
export function parseItems(input: string) {
  if (!input.trim()) return [] as Item[]

  return input.split(',').map((part) => {
    const [quantityStr, itemId, action] = part.split(':')
    return {
      quantity: Number.parseInt(quantityStr, 10),
      itemId: itemId.trim(),
      action: action.trim(),
    }
  })
}

/**
 * Transforme un tableau de Item
 * en une chaîne du format "34:diamond,94:paladium_ore".
 */
export function stringifyItems(items: Item[]): string {
  return items.map((item) => `${item.quantity}:${item.itemId}:${item.action}`).join(',')
}
