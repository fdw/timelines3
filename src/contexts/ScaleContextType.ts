import { createContext } from 'react'

// The context provides pixelsPerYear, width, and height
export interface ScaleContextType {
  pixelsPerYear: number
  width: number
  height: number
}

export const ScaleContext = createContext<ScaleContextType | undefined>(undefined)
