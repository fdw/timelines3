import type { ReactElement } from 'react'
import type { Milestone } from '../../models/TimelineEntity'
import { useScale } from '../../hooks/useScale'
import { EntityTitle } from './EntityTitle'

export function MilestoneComponent({ entity, y }: { entity: Milestone; y: number }): ReactElement {
  const startX = useScale(entity.startDate)

  return (
    <g id={entity.id}>
      <circle cx={startX} cy={y} fill="#4285f4" r={5} stroke="#2a56c6" strokeWidth={1} />
      <EntityTitle title={entity.title} x={startX} y={y + 10} />
    </g>
  )
}
