import { useContext } from 'react'
import type { Dayjs } from 'dayjs'
import { ScaleContext } from './ScaleContextType'

export function useScale(date: Dayjs): number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useScale must be used within a ScaleProvider')
  }

  const { width, zoomFactor } = context
  const pixelsPerYear = width / (100 * zoomFactor)

  return date.year() * pixelsPerYear + 2000 * pixelsPerYear
}

export function useZoomFactor(): number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useZoomFactor must be used within a ScaleProvider')
  }

  return context.zoomFactor
}
