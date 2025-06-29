import type { ReactElement } from 'react'
import type { TimelineEntity } from '../models/TimelineEntity'
import { TimelineGrid } from './TimelineGrid'
import { EventsLayer } from './EventsLayer'
import { useWidth, useHeight } from '../hooks/useScale'

export function TimelineVisualization({ entities }: { entities: TimelineEntity[] }): ReactElement {
  const width = useWidth()
  const height = useHeight()

  return (
    <svg height="100%" style={{ display: 'block' }} viewBox={`0 0 ${width} ${height}`} width="100%">
      <TimelineGrid />
      <EventsLayer entities={entities} />
    </svg>
  )
}
