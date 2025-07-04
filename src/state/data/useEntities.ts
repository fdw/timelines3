import { useQueries } from '@tanstack/react-query'
import { useDataSets } from './useDataSets'
import { useDataSetsIndex } from './useDataSetsIndex'
import type { TimelineEntity } from '../../models/TimelineEntity'
import dayjs from 'dayjs'
import { useZoomFactor } from '../zoom/useScale'

export function useEntities(): { data: TimelineEntity[]; isLoading: boolean } {
  const selectedDataSetIds = useDataSets()
  const dataSetsIndex = useDataSetsIndex()
  const zoomFactor = useZoomFactor()

  const allEntities = useQueries({
    queries: Array.from(selectedDataSetIds).map((id) => ({
      queryKey: ['dataset', id],
      queryFn: async () => {
        const filename = dataSetsIndex.find((ds) => ds.id === id)?.filename ?? '' //todo
        return fetchDataSet(filename)
      },
      select: mapToEntity,
    })),
    combine: (result) => ({
      data: [...new Set(result.flatMap((it) => it.data))].filter((it) => it !== undefined),
      isLoading: result.reduce((acc, cur) => acc || cur.isLoading, false),
    }),
  })

  return {
    ...allEntities,
    data: allEntities.data.filter((entity) => entity.importance >= zoomFactor),
  }
}

async function fetchDataSet(filename: string): Promise<TimelineEntityDto[]> {
  const response = await fetch(`data/sets/${filename}`)
  return await response.json()
}

export function mapToEntity(entities: TimelineEntityDto[]): TimelineEntity[] {
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
          children: mapToEntity(entity.children ?? []),
        }
    }
  })
}

export type TimelineEntityDto = MilestoneDto | PeriodDto | LifetimeDto

interface MilestoneDto {
  id: string
  title: string
  startDate: string
  type: 'Milestone'
  tags: string[]
  importance: number
}

interface PeriodDto {
  id: string
  title: string
  startDate: string
  endDate?: string
  type: 'Period'
  children: TimelineEntityDto[]
  tags: string[]
  importance: number
}

interface LifetimeDto {
  id: string
  title: string
  startDate: string
  endDate?: string
  type: 'Lifetime'
  children: TimelineEntityDto[]
  tags: string[]
  importance: number
}
