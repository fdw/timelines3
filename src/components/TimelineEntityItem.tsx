import type { ReactElement } from 'react'
import type { TimelineEntity } from '../models/TimelineEntity'
import { MilestoneComponent } from './entities/MilestoneComponent'
import { PeriodComponent } from './entities/PeriodComponent'
import { LifetimeComponent } from './entities/LifetimeComponent'
import { useScale } from '../hooks/useScale'

export function TimelineEntityItem({ 
  entity, 
  y 
}: {
  entity: TimelineEntity
  y: number
}): ReactElement {
  // Call useScale unconditionally for both startDate and endDate
  const startX = useScale(entity.startDate)
  // Use a default date (same as startDate) if endDate is not provided
  const endDateX = useScale(entity.endDate || entity.startDate)
  // Use startX if endDate is not provided
  const endX = entity.endDate ? endDateX : startX
  const isMilestone = entity.type === 'Milestone'
  const width = isMilestone ? 10 : Math.max(endX - startX, 2)
  const x = isMilestone ? startX - 5 : startX

  function renderEntity(): ReactElement {
    switch (entity.type) {
      case 'Milestone':
        return <MilestoneComponent entity={entity} y={y} />
      case 'Period':
        return <PeriodComponent entity={entity} y={y} />
      case 'Lifetime':
        return <LifetimeComponent entity={entity} y={y} />
      default:
        return <></>
    }
  }

  return (
    <g className={`timeline-entity ${entity.type.toLowerCase()}`}>
      {renderEntity()}
      <text
        x={x + (isMilestone ? 10 : width / 2)}
        y={y - 15}
        fontSize="12"
        textAnchor={isMilestone ? "start" : "middle"}
        dominantBaseline="auto"
      >
        {entity.title}
      </text>
    </g>
  )
}
