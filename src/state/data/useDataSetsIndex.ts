import { useSuspenseQuery } from '@tanstack/react-query'

export function useDataSetsIndex(): DataSetInfo[] {
  return useSuspenseQuery({
    queryKey: ['dataSetsIndex'],
    queryFn: fetchDataSetsIndex,
  }).data
}

interface DataSetInfo {
  id: string
  name: string
  description: string
  filename: string
}

async function fetchDataSetsIndex(): Promise<DataSetInfo[]> {
  const response = await fetch('/data/sets/index.json')
  return await response.json()
}
