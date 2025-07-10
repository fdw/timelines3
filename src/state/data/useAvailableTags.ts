import { useEntities } from './useEntities'

export function useAvailableTags(): string[] {
  const entities = useEntities()

  return Array.from(new Set(entities.flatMap((it) => it.tags))).sort()
}
