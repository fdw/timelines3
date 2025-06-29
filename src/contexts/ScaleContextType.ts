import { createContext } from 'react'

export interface ScaleContextType {
  zoomFactor: number
  width: number
  height: number
}

export const ScaleContext = createContext<ScaleContextType | undefined>(undefined)
