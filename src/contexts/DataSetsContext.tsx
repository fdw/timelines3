import { type ReactElement, type ReactNode, useMemo, useState } from 'react'
import { DataSetsContext } from './DataSetsContextType'

export function DataSetsProvider({ children }: { children: ReactNode }): ReactElement {
  const [shownDataSets, setShownDataSets] = useState<Set<string>>(new Set(['art', 'design', 'architecture']))

  const value = useMemo(() => ({ shownDataSets, setShownDataSets }), [shownDataSets])

  return <DataSetsContext.Provider value={value}>{children}</DataSetsContext.Provider>
}
