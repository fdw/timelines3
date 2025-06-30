import { createContext } from 'react'

export interface DataSetsContextType {
  shownDataSets: Set<string>
  setShownDataSets: (dataSets: Set<string>) => void
}

export const DataSetsContext = createContext<DataSetsContextType | undefined>(undefined)