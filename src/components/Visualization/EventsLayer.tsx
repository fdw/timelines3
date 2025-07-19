import type { ReactElement } from 'react'
import { useMemo } from 'react'
import type { Dayjs } from 'dayjs'
import type { TimelineEntity } from '../../models/TimelineEntity'
import { TimelineEntityItem } from './TimelineEntityItem'
import { useEntities } from '../../state/data/useEntities'
import { useTags } from '../../state/data/useTags.ts'
import { useZoomFactor } from '../../state/zoom/useScale'

export function EventsLayer(): ReactElement | null {
  const selectedTags = useTags()
  const zoomFactor = useZoomFactor()
  const entities = useEntities()

  const filteredEntities = useMemo(() => {
    return entities.filter((it) => it.tags.some((tag) => selectedTags.has(tag)) && it.importance > zoomFactor)
  }, [entities, selectedTags, zoomFactor])

  const lanePositions = useMemo(() => {
    return calculateLanePositions(filteredEntities)
  }, [filteredEntities])

  return (
    <g className="events-layer">
      {filteredEntities.map((entity) => (
        <TimelineEntityItem entity={entity} key={entity.id} y={lanePositions[entity.id] || 0} />
      ))}
    </g>
  )
}

function calculateLanePositions(entities: TimelineEntity[]): Record<string, number> {
  const laneHeight = 45
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
  const laneEndDates: [number, Dayjs | undefined][] = Array.from(
    { length: lanesCount },
    (_, index): [number, Dayjs | undefined] => [index, undefined],
  ).sort(() => Math.random() - 0.5)

  for (const entity of sortedEntities) {
    const nextLaneIndex = laneEndDates.findIndex((it) => it[1] === undefined || it[1].isBefore(entity.startDate))
    const nextLane = laneEndDates.splice(nextLaneIndex, 1)[0]
    entityToLaneMap[entity.id] = nextLane[0]

    const nextEntityIndex = laneEndDates.findIndex((it) => it[1]?.isAfter(getEntityEndDate(entity) ?? true))
    laneEndDates.splice(nextEntityIndex, 0, [nextLane[0], getEntityEndDate(entity)])
  }

  return entityToLaneMap
}
