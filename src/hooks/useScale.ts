import { useContext } from 'react'
import type { Dayjs } from 'dayjs'
import { ScaleContext } from '../contexts/ScaleContextType'

export function useScale(date: Dayjs): number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useScale must be used within a ScaleProvider')
  }

  const { pixelsPerYear } = context
  return date.year() * pixelsPerYear
}

export function useScaleFunction(): (_: Dayjs) => number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useScale must be used within a ScaleProvider')
  }

  const { pixelsPerYear } = context

  return function (date: Dayjs): number {
    return date.year() * pixelsPerYear
  }
}

export function useWidth(): number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useWidth must be used within a ScaleProvider')
  }

  return context.width
}

export function useHeight(): number {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useHeight must be used within a ScaleProvider')
  }

  return context.height
}
