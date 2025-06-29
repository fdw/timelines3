import type { ReactElement } from 'react'
import type { TimelineEntity } from '../models/TimelineEntity'
import { TimelineEntityItem } from './TimelineEntityItem'
import { useHeight } from '../hooks/useScale'

export function EventsLayer({ entities }: { entities: TimelineEntity[] }): ReactElement {
  const height = useHeight()

  return (
    <g className="events-layer">
      {entities.map((entity) => (
        <TimelineEntityItem entity={entity} key={entity.id} y={getYPosition(entity, height)} />
      ))}
    </g>
  )
}

function getYPosition(entity: TimelineEntity, height: number): number {
  const padding = 50 // Padding from top and bottom
  const availableHeight = height - padding * 2

  switch (entity.type) {
    case 'Milestone':
      return padding + availableHeight * 0.25 // 25% from the top
    case 'Period':
      return padding + availableHeight * 0.5 // 50% from the top (middle)
    case 'Lifetime':
      return padding + availableHeight * 0.75 // 75% from the top
    default:
      return padding + availableHeight * 0.5 // Default to middle
  }
}
