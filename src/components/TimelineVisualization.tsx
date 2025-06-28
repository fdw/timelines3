import type {ReactElement} from 'react'
import type {TimelineEntity} from '../models/TimelineEntity'
import {TimelineGrid} from './TimelineGrid'
import {EventsLayer} from './EventsLayer'

export function TimelineVisualization({ 
  entities, 
  width = 1200, 
  height = 400 
}: {
  entities: TimelineEntity[]
  width?: number
  height?: number
}): ReactElement {
  return (
    <svg 
      width="100%" 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block' }}
    >
      <TimelineGrid 
        height={height} 
      />
      <EventsLayer 
        entities={entities} 
      />
    </svg>
  )
}
