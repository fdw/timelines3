import type { ReactElement } from 'react'
import type { TimelineEntity } from '../models/TimelineEntity'
import { TimelineEntityItem } from './TimelineEntityItem'

export function EventsLayer({ entities }: {
  entities: TimelineEntity[]
}): ReactElement {

  return (
    <g className="events-layer">
      {entities.map(entity => (
        <TimelineEntityItem
          key={entity.id}
          entity={entity}
          y={getYPosition(entity)}
        />
      ))}
    </g>
  )
}

function getYPosition(entity: TimelineEntity): number {
  switch (entity.type) {
    case 'Milestone':
      return 50
    case 'Period':
      return 100
    case 'Lifetime':
      return 150
    default:
      return 100
  }
}
