import { createContext } from 'react'

export interface ScaleContextType {
  pixelsPerYear: number
  width: number
  height: number
}

export const ScaleContext = createContext<ScaleContextType | undefined>(undefined)
