import type { ReactElement } from 'react'
import type { Lifetime, Milestone, Period } from '../../../models/TimelineEntity'
import { useScale } from '../../../state/zoom/useScale'
import { EntityTitle } from './EntityTitle'
import './EntityVisualizations.css'

export function LifetimeComponent({ entity, y }: { entity: Lifetime; y: number }): ReactElement {
  const startX = useScale(entity.startDate)
  const endX = useScale(entity.endDate)
  const width = Math.max(endX - startX, 2)

  return (
    <g id={entity.id}>
      <rect className="lifetime" height={height} rx={barRadius} ry={barRadius} width={width} x={startX} y={y - 10} />
      <EntityTitle title={entity.title} x={startX + width / 2} y={y + titleGap} />
    </g>
  )
}

export function MilestoneComponent({ entity, y }: { entity: Milestone; y: number }): ReactElement {
  const startX = useScale(entity.startDate)

  return (
    <g id={entity.id}>
      <circle className="milestone" cx={startX} cy={y} r={height / 2} />
      <EntityTitle title={entity.title} x={startX} y={y + titleGap} />
    </g>
  )
}

export function PeriodComponent({ entity, y }: { entity: Period; y: number }): ReactElement {
  const startX = useScale(entity.startDate)
  const endX = useScale(entity.endDate)
  const width = Math.max(endX - startX, 2)

  return (
    <g id={entity.id}>
      <rect className="period" height={height} rx={barRadius} ry={barRadius} width={width} x={startX} y={y - 10} />
      <EntityTitle title={entity.title} x={startX + width / 2} y={y + titleGap} />
    </g>
  )
}

const height = 20
const barRadius = 3
const titleGap = 14
