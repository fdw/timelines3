import { useMemo } from 'react'
import type { ReactElement } from 'react'
import type { Dayjs } from 'dayjs'
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
  const positions: Record<string, number> = {}

  const sortedEntities = [...entities].sort((a, b) => (a.startDate.isBefore(b.startDate) ? -1 : 1))
  const minLanesCount = calculateMinimumLanesCount(sortedEntities)
  const entityToLaneMap = distributeEntitiesToLanes(sortedEntities, minLanesCount)

  Object.entries(entityToLaneMap).forEach(([entityId, laneIndex]) => {
    positions[entityId] = laneIndex * laneHeight + laneHeight / 2
  })

  return positions
}

function calculateMinimumLanesCount(sortedEntities: TimelineEntity[]): number {
  const lanes: TimelineEntity[][] = []

  for (const entity of sortedEntities) {
    const laneIndex = findAvailableLane(lanes, entity)
    if (lanes[laneIndex]) {
      lanes[laneIndex].push(entity)
    } else {
      lanes[laneIndex] = [entity]
    }
  }

  return lanes.length
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
  const lastEntityRight = getEntityEndDate(lastEntity)

  return lastEntityRight.add(5, 'years').isBefore(entity.startDate)
}

function getEntityEndDate(entity: TimelineEntity): Dayjs {
  return entity.type === 'Milestone' ? entity.startDate.add(30, 'day') : entity.endDate
}

function distributeEntitiesToLanes(sortedEntities: TimelineEntity[], lanesCount: number): Record<string, number> {
  const entityToLaneMap: Record<string, number> = {}
  const laneEndDates: [number, Dayjs | undefined][] = Array.from({ length: lanesCount }, (_, index) => [
    index,
    undefined,
  ])

  for (const entity of sortedEntities) {
    const nextLane = laneEndDates.shift()!
    entityToLaneMap[entity.id] = nextLane[0]

    const nextEntityIndex = laneEndDates.findIndex((it) => it[1]?.isAfter(getEntityEndDate(entity) ?? true))
    laneEndDates.splice(nextEntityIndex, 0, [nextLane[0], getEntityEndDate(entity)])
  }

  return entityToLaneMap
}
