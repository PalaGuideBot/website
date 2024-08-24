export const mounts = {
  1: 'dancarok',
  2: 'ravirok',
  3: 'tedarok',
} as const

const DEFAULT_MOUNT = mounts[1]

export function getMount(value: string) {
  if (Object.values(mounts).includes(value as any)) {
    return value as MountType
  }
  return DEFAULT_MOUNT
}

export function getMountNameByType(type: number) {
  const mount = mounts[type as keyof typeof mounts]
  return mount ?? DEFAULT_MOUNT
}

export type MountType = (typeof mounts)[keyof typeof mounts]
