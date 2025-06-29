import type { ReactElement } from 'react'
import type { TimelineEntity } from '../models/TimelineEntity'
import { TimelineGrid } from './TimelineGrid'
import { EventsLayer } from './EventsLayer'
import { useScale } from '../hooks/useScale'
import { scienceEntities } from '../../data/entities/science'
import dayjs from 'dayjs'

export function TimelineVisualization({ entities = scienceEntities }: { entities?: TimelineEntity[] }): ReactElement {
  const timelineWidth = useScale(dayjs())

  return (
    <svg height="100%" style={{ display: 'block' }} width={timelineWidth}>
      <TimelineGrid />
      <EventsLayer entities={entities} />
    </svg>
  )
}
