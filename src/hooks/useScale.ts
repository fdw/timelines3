import { useContext } from 'react'
import type { Dayjs } from 'dayjs'
import { ScaleContext } from '../contexts/ScaleContextType'

export function useScale(date: Dayjs): number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useScale must be used within a ScaleProvider')
  }

  const { width, zoomFactor } = context
  const pixelsPerYear = width / (100 * zoomFactor)

  return date.year() * pixelsPerYear
}

export function useZoomFactor(): number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useZoomFactor must be used within a ScaleProvider')
  }

  return context.zoomFactor
}

export function useHeight(): number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useHeight must be used within a ScaleProvider')
  }

  return context.height
}
