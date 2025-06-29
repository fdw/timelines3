import type { Dayjs } from 'dayjs'

export type TimelineEntity = Milestone | Period | Lifetime

export interface CommonTimelineEntity {
  id: string
  title: string
  startDate: Dayjs
  children: []
  tags: string[]
  importance?: number
}

export interface Milestone extends CommonTimelineEntity {
  type: 'Milestone'
  endDate: undefined
}

export interface Period extends CommonTimelineEntity {
  type: 'Period'
  endDate: Dayjs
}

export interface Lifetime extends CommonTimelineEntity {
  type: 'Lifetime'
  endDate: Dayjs
}
