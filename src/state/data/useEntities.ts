import { useSuspenseQuery } from '@tanstack/react-query'
import type { TimelineEntity } from '../../models/TimelineEntity'
import dayjs from 'dayjs'

export function useEntities(): TimelineEntity[] {
  return useSuspenseQuery({
    queryKey: ['entities'],
    queryFn: fetchEntities,
    select: (data) => mapToEntity(data),
  }).data
}

async function fetchEntities(): Promise<TimelineEntityDto[]> {
  const response = await fetch('data/merged-dataset.json')
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
