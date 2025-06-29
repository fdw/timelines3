import type { ReactElement } from 'react'
import { scienceEntities } from '../../data/entities/science'
import { TimelineVisualization } from './TimelineVisualization'

export function TimelineContainer(): ReactElement {
  return (
    <div style={{ width: '100%', height: '100%', overflowX: 'auto' }}>
      <TimelineVisualization entities={scienceEntities} />
    </div>
  )
}
