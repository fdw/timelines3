import type { Dayjs } from 'dayjs'

export type TimelineEntity = Milestone | Period | Lifetime

export interface CommonTimelineEntity {
  id: string
  title: string
  startDate: Dayjs
  tags: string[]
  importance: number
}

export interface Milestone extends CommonTimelineEntity {
  type: 'Milestone'
}

export interface Period extends CommonTimelineEntity {
  type: 'Period'
  endDate: Dayjs
  children: CommonTimelineEntity[]
}

export interface Lifetime extends CommonTimelineEntity {
  type: 'Lifetime'
  endDate: Dayjs
  children: CommonTimelineEntity[]
}
