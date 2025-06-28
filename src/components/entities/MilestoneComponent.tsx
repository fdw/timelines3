import type {ReactElement} from 'react'
import type {Milestone} from '../../models/TimelineEntity'
import {useScale} from '../../hooks/useScale'

export function MilestoneComponent({ 
  entity,
  y
}: {
  entity: Milestone
  y: number
}): ReactElement {
  const startX = useScale(entity.startDate)

  return (
    <circle
      cx={startX}
      cy={y}
      r={5}
      fill="#4285f4"
      stroke="#2a56c6"
      strokeWidth={1}
    />
  )
}
