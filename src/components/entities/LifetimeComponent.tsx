import type { ReactElement } from 'react'
import type { Lifetime } from '../../models/TimelineEntity'
import { useScale } from '../../hooks/useScale'

export function LifetimeComponent({ entity, y }: { entity: Lifetime; y: number }): ReactElement {
  const startX = useScale(entity.startDate)
  const endX = useScale(entity.endDate)
  const width = Math.max(endX - startX, 2)

  return (
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
  )
}
