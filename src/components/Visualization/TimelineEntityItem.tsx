import type { ReactElement } from 'react'
import type { TimelineEntity } from '../../models/TimelineEntity'
import { LifetimeComponent, MilestoneComponent, PeriodComponent } from './Elements/EntityVisualizations.tsx'

export function TimelineEntityItem({ entity, y }: { entity: TimelineEntity; y: number }): ReactElement {
  switch (entity.type) {
    case 'Milestone':
      return <MilestoneComponent entity={entity} y={y} />
    case 'Period':
      return <PeriodComponent entity={entity} y={y} />
    case 'Lifetime':
      return <LifetimeComponent entity={entity} y={y} />
  }
}
