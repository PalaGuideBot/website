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
  'pet_ender_dragon',
  'pet_zombie_hand',
  'pet_arty',
  'pet_chameleon',
  'pet_penguin',
  'pet_reindeer',
] as const

export function getPet(value: string) {
  if (pets.includes(value as any)) {
    return value as PetType
  }
  return DEFAULT_PET
}

export type PetType = (typeof pets)[number]

const translations: Record<PetType, string> = {
  cat: 'Cat',
  dog: 'Dog',
  dragon: 'Dragon',
  feng_uang: 'Feng Uang',
  kapio_koi: 'Kapio Koi',
  pet_blobfish: 'Blobfish',
  pet_mini_golem: 'Mini Golem',
  pet_ufo: 'UFO',
  rabbit: 'Rabbit',
  pet_ender_dragon: 'Ender Dragon',
  pet_zombie_hand: 'Zombie Hand',
  pet_arty: 'Arty',
  pet_chameleon: 'Chameleon',
  pet_penguin: 'Penguin',
  pet_reindeer: 'Reindeer',
}

export function translatePet(pet: PetType): string {
  return translations[pet] ?? translations[DEFAULT_PET]
}
