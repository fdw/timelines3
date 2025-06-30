import { useContext } from 'react'
import { DataSetsContext } from '../contexts/DataSetsContextType'

export function useDataSets(): Set<string> {
  const context = useContext(DataSetsContext)
  if (context === undefined) {
    throw new Error('useDataSets must be used within a DataSetsProvider')
  }

  return context.shownDataSets
}
