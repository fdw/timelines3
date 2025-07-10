import { type ReactElement } from 'react'
import { TimelineVisualization } from './components/Visualization/TimelineVisualization'
import { ScaleProvider } from './state/zoom/ScaleContext'
import { TagsProvider } from './state/data/TagsContext'
import { QueryProvider } from './contexts/QueryProvider'
import { UserControl } from './components/Control/UserControl'

export function App(): ReactElement {
  return (
    <QueryProvider>
      <TagsProvider>
        <ScaleProvider>
          <UserControl />
          <TimelineVisualization />
        </ScaleProvider>
      </TagsProvider>
    </QueryProvider>
  )
}
