import type { ReactElement } from 'react'
import { TimelineVisualization } from './components/TimelineVisualization'
import { ScaleProvider } from './contexts/ScaleContext'

export function App(): ReactElement {
  return (
    <ScaleProvider>
      <TimelineVisualization />
    </ScaleProvider>
  )
}
