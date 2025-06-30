import type { ReactElement } from 'react'
import { TimelineVisualization } from './components/TimelineVisualization'
import { ScaleProvider } from './contexts/ScaleContext'
import { DataSetsProvider } from './contexts/DataSetsContext'
import { QueryProvider } from './contexts/QueryProvider'

export function App(): ReactElement {
  return (
    <QueryProvider>
      <DataSetsProvider>
        <ScaleProvider>
          <TimelineVisualization />
        </ScaleProvider>
      </DataSetsProvider>
    </QueryProvider>
  )
}
