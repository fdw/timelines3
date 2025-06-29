import { useMemo } from 'react'
import type { ReactElement } from 'react'
import type { TimelineEntity } from '../models/TimelineEntity'
import { TimelineEntityItem } from './TimelineEntityItem'

export function EventsLayer({ entities }: { entities: TimelineEntity[] }): ReactElement {
  const lanePositions = useMemo(() => {
    return calculateLanePositions(entities)
  }, [entities])

  return (
    <g className="events-layer">
      {entities.map((entity) => (
        <TimelineEntityItem entity={entity} key={entity.id} y={lanePositions[entity.id] || 0} />
      ))}
    </g>
  )
}

function calculateLanePositions(entities: TimelineEntity[]): Record<string, number> {
  const laneHeight = 60
  const lanes: TimelineEntity[][] = []
  const positions: Record<string, number> = {}

  const sortedEntities = [...entities].sort((a, b) => (a.startDate.isBefore(b.startDate) ? -1 : 1))

  for (const entity of sortedEntities) {
    const laneIndex = findAvailableLane(lanes, entity)
    if (lanes[laneIndex]) {
      lanes[laneIndex].push(entity)
    } else {
      lanes[laneIndex] = [entity]
    }
    positions[entity.id] = laneIndex * laneHeight + laneHeight / 2
  }

  return positions
}

function findAvailableLane(lanes: TimelineEntity[][], entity: TimelineEntity): number {
  for (let i = 0; i < lanes.length; i++) {
    if (isLaneAvailable(lanes[i], entity)) {
      return i
    }
  }
  return lanes.length
}

function isLaneAvailable(lane: TimelineEntity[], entity: TimelineEntity): boolean {
  if (lane.length === 0) {
    return true
  }

  const lastEntity = lane[lane.length - 1]
  const lastEntityRight = lastEntity.type === 'Milestone' ? lastEntity.startDate.add(30, 'day') : lastEntity.endDate

  return lastEntityRight.add(5, 'years').isBefore(entity.startDate)
}
