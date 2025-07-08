import { type ReactElement } from 'react'
import { TimelineGrid } from './TimelineGrid'
import { EventsLayer } from './EventsLayer'
import { useScale } from '../../state/zoom/useScale'
import dayjs from 'dayjs'

export function TimelineVisualization(): ReactElement {
  const minX = useScale(dayjs().year(-2000))
  const maxX = useScale(dayjs().year(dayjs().year()))

  const viewWidth = maxX - minX
  const timelineWidth = -minX + maxX

  return (
    <svg height="100%" style={{ display: 'block' }} viewBox={`${minX} 0 ${viewWidth} 100%`} width={timelineWidth}>
      <TimelineGrid />
      <EventsLayer />
    </svg>
  )
}
