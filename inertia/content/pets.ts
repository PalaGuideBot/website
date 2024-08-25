const DEFAULT_PET = 'cat'

export const pets = [
  DEFAULT_PET,
  'dog',
  'dragon',
  'feng_uang',
  'kapio_koi',
  'pet_blobfish',
  'pet_mini_golem',
  'pet_ufo',
  'rabbit',
] as const

export function getPet(value: string) {
  if (pets.includes(value as any)) {
    return value as PetType
  }
  return DEFAULT_PET
}

export type PetType = (typeof pets)[number]
