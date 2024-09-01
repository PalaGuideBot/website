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

const petTranslations: Record<PetType, string> = {
  cat: 'Cat',
  dog: 'Dog',
  dragon: 'Dragon',
  feng_uang: 'Feng Uang',
  kapio_koi: 'Kapio Koi',
  pet_blobfish: 'Blobfish',
  pet_mini_golem: 'Mini Golem',
  pet_ufo: 'UFO',
  rabbit: 'Rabbit',
}

export function translatePet(pet: PetType): string {
  return petTranslations[pet] ?? DEFAULT_PET
}
