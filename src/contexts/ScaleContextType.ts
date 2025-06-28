import { createContext } from 'react'

// The context only provides pixelsPerYear
export interface ScaleContextType {
  pixelsPerYear: number
}

export const ScaleContext = createContext<ScaleContextType | undefined>(undefined)
