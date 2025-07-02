import { useContext } from 'react'
import { DataSetsContext } from './DataSetsContextType'

export function useDataSetsControl(): (dataSets: Set<string>) => void {
  const context = useContext(DataSetsContext)
  if (context === undefined) {
    throw new Error('useDataSetsControl must be used within a DataSetsProvider')
  }

  return context.setShownDataSets
}
