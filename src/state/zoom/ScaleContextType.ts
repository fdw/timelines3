import { createContext } from 'react'

export interface ScaleContextType {
  zoomFactor: number
  width: number
  height: number
  setZoomFactor: (value: number | ((prevZoom: number) => number)) => void
}

export const ScaleContext = createContext<ScaleContextType | undefined>(undefined)
