import type { ReactElement } from 'react'
import './App.css'
import { TimelineContainer } from './components/TimelineContainer'
import { ScaleProvider } from './contexts/ScaleContext'

export function App(): ReactElement {
  return (
    <div className="app">
      <ScaleProvider>
        <TimelineContainer />
      </ScaleProvider>
    </div>
  )
}
