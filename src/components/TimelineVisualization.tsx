import type { ReactElement } from 'react'
import type { TimelineEntity } from '../models/TimelineEntity'
import { TimelineGrid } from './TimelineGrid'
import { EventsLayer } from './EventsLayer'

export function TimelineVisualization({
  entities,
  width = 1200,
  height = 400,
}: {
  entities: TimelineEntity[]
  width?: number
  height?: number
}): ReactElement {
  return (
    <svg height={height} style={{ display: 'block' }} viewBox={`0 0 ${width} ${height}`} width="100%">
      <TimelineGrid height={height} />
      <EventsLayer entities={entities} />
    </svg>
  )
}
