import type { ReactElement } from 'react'
import { TimelineGrid } from './TimelineGrid'
import { EventsLayer } from './EventsLayer'
import { useScale } from '../hooks/useScale'
import { useEntities } from '../hooks/useEntities'
import dayjs from 'dayjs'

export function TimelineVisualization(): ReactElement {
  const entities = useEntities()

  const timelineWidth = useScale(dayjs())

  return (
    <svg height="100%" style={{ display: 'block' }} width={timelineWidth}>
      <TimelineGrid />
      <EventsLayer entities={entities} />
    </svg>
  )
}
