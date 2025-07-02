import { type ReactElement } from 'react'
import { TimelineGrid } from './TimelineGrid'
import { EventsLayer } from './EventsLayer'
import { useScale } from '../../state/zoom/useScale'
import dayjs from 'dayjs'

export function TimelineVisualization(): ReactElement {
  const timelineWidth = useScale(dayjs())

  return (
    <svg height="100%" style={{ display: 'block' }} width={timelineWidth}>
      <TimelineGrid />
      <EventsLayer />
    </svg>
  )
}
