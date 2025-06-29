import type { ReactElement } from 'react'
import { TimelineContainer } from './components/TimelineContainer'
import { ScaleProvider } from './contexts/ScaleContext'

export function App(): ReactElement {
  return (
    <div style={{ height: '100%' }}>
      <ScaleProvider>
        <TimelineContainer />
      </ScaleProvider>
    </div>
  )
}
