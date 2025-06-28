import type {ReactElement} from 'react'
import type {Lifetime} from '../../models/TimelineEntity'
import {useScale} from '../../hooks/useScale'

export function LifetimeComponent({ 
  entity,
  y
}: {
  entity: Lifetime
  y: number
}): ReactElement {
  const startX = useScale(entity.startDate)
  const endX = useScale(entity.endDate)
  const width = Math.max(endX - startX, 2)

  return (
    <rect
      x={startX}
      y={y - 10}
      width={width}
      height={20}
      fill="#fbbc05"
      stroke="#e37400"
      strokeWidth={1}
      rx={3}
      ry={3}
    />
  )
}
