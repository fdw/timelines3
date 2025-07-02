import type { ReactElement } from 'react'
import type { TimelineEntity } from '../../models/TimelineEntity'
import { MilestoneComponent } from './Elements/MilestoneComponent'
import { PeriodComponent } from './Elements/PeriodComponent'
import { LifetimeComponent } from './Elements/LifetimeComponent'

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
