import { useContext } from 'react'
import { ScaleContext } from './ScaleContextType'

export function useZoom(): {
  increaseZoom: () => void
  decreaseZoom: () => void
} {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useZoom must be used within a ScaleProvider')
  }

  const { setZoomFactor } = context

  function increaseZoom(): void {
    setZoomFactor((prevZoom: number) => Math.floor(prevZoom) + 1)
  }

  function decreaseZoom(): void {
    setZoomFactor((prevZoom: number) => Math.max(1, Math.floor(prevZoom) - 1))
  }

  return { increaseZoom, decreaseZoom }
}
