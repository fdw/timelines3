import type { ReactElement } from 'react'
import './App.css'
import { TimelineContainer } from './components/TimelineContainer'
import { ScaleProvider } from './contexts/ScaleContext'

export function App(): ReactElement {
  return (
    <div className="app">
      <header>
        <h1>Timeline Visualization</h1>
      </header>
      <ScaleProvider>
        <TimelineContainer />
      </ScaleProvider>
    </div>
  )
}
