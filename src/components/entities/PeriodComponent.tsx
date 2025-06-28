import type {ReactElement} from 'react'
import type {Period} from '../../models/TimelineEntity'
import {useScale} from '../../hooks/useScale'

export function PeriodComponent({ 
  entity,
  y
}: {
  entity: Period
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
      fill="#34a853"
      stroke="#0f8a3c"
      strokeWidth={1}
      rx={3}
      ry={3}
    />
  )
}
