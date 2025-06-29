import type { ReactElement } from 'react'
import type { Period } from '../../models/TimelineEntity'
import { useScale } from '../../hooks/useScale'
import { EntityTitle } from './EntityTitle'

export function PeriodComponent({ entity, y }: { entity: Period; y: number }): ReactElement {
  const startX = useScale(entity.startDate)
  const endX = useScale(entity.endDate)
  const width = Math.max(endX - startX, 2)

  return (
    <g id={entity.id}>
      <rect
        fill="#34a853"
        height={20}
        rx={3}
        ry={3}
        stroke="#0f8a3c"
        strokeWidth={1}
        width={width}
        x={startX}
        y={y - 10}
      />
      <EntityTitle title={entity.title} x={startX + width / 2} y={y + 15} />
    </g>
  )
}
