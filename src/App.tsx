import { type ReactElement } from 'react'
import { TimelineVisualization } from './components/Visualization/TimelineVisualization'
import { ScaleProvider } from './state/zoom/ScaleContext'
import { DataSetsProvider } from './state/data/DataSetsContext'
import { QueryProvider } from './contexts/QueryProvider'
import { UserControl } from './components/Control/UserControl'

export function App(): ReactElement {
  return (
    <QueryProvider>
      <DataSetsProvider>
        <ScaleProvider>
          <UserControl />
          <TimelineVisualization />
        </ScaleProvider>
      </DataSetsProvider>
    </QueryProvider>
  )
}
