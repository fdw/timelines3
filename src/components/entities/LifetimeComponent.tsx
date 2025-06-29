import type { ReactElement } from 'react'
import type { Lifetime } from '../../models/TimelineEntity'
import { useScale } from '../../hooks/useScale'
import { EntityTitle } from './EntityTitle'

export function LifetimeComponent({ entity, y }: { entity: Lifetime; y: number }): ReactElement {
  const startX = useScale(entity.startDate)
  const endX = useScale(entity.endDate)
  const width = Math.max(endX - startX, 2)

  return (
    <g id={entity.id}>
      <rect
        fill="#fbbc05"
        height={20}
        rx={3}
        ry={3}
        stroke="#e37400"
        strokeWidth={1}
        width={width}
        x={startX}
        y={y - 10}
      />
      <EntityTitle title={entity.title} x={startX + width / 2} y={y + 15} />
    </g>
  )
}
