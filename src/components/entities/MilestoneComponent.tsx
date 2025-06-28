import type { ReactElement } from 'react'
import type { Milestone } from '../../models/TimelineEntity'
import { useScale } from '../../hooks/useScale'

export function MilestoneComponent({ entity, y }: { entity: Milestone; y: number }): ReactElement {
  const startX = useScale(entity.startDate)

  return <circle cx={startX} cy={y} fill="#4285f4" r={5} stroke="#2a56c6" strokeWidth={1} />
}
