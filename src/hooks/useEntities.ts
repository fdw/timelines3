import { useSuspenseQueries } from '@tanstack/react-query'
import { useDataSets } from './useDataSets'
import { useDataSetsIndex } from './useDataSetsIndex'
import type { TimelineEntity } from '../models/TimelineEntity'
import dayjs from 'dayjs'

export function useEntities(): TimelineEntity[] {
  const selectedDataSetIds = useDataSets()
  const dataSetsIndex = useDataSetsIndex()

  return useSuspenseQueries({
    queries: Array.from(selectedDataSetIds).map((id) => ({
      queryKey: ['dataset', id],
      queryFn: async () => {
        const filename = dataSetsIndex.find((ds) => ds.id === id)?.filename ?? '' //todo
        return fetchDataSet(filename)
      },
      select: mapToEntity,
    })),
    combine: (result) => [...new Set(result.flatMap((it) => it.data))],
  })
}

async function fetchDataSet(filename: string): Promise<RawTimelineEntity[]> {
  const response = await fetch(`/data/sets/${filename}`)
  return await response.json()
}

export function mapToEntity(entities: RawTimelineEntity[]): TimelineEntity[] {
  return entities.map((entity) => {
    switch (entity.type) {
      case 'Milestone':
        return {
          ...entity,
          startDate: dayjs(entity.startDate),
        }
      case 'Period':
      case 'Lifetime':
        return {
          ...entity,
          startDate: dayjs(entity.startDate),
          endDate: dayjs(entity.endDate),
        }
    }
  })
}

export interface RawTimelineEntity {
  id: string
  title: string
  startDate: string
  endDate?: string
  type: 'Milestone' | 'Period' | 'Lifetime'
  children: RawTimelineEntity[]
  tags: string[]
  importance?: number
}
