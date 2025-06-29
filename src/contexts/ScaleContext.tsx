import { type ReactElement, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { ScaleContext } from './ScaleContextType'

export function ScaleProvider({ children }: { children: ReactNode }): ReactElement {
  const [zoomFactor, setZoomFactor] = useState<number>(1.0) // Default zoom factor: 1.0 means 100 years are shown

  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function updateDimensions(): void {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth
        const newHeight = containerRef.current.clientHeight
        setWidth(newWidth)
        setHeight(newHeight)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const value = useMemo(() => ({ zoomFactor, width, height }), [zoomFactor, width, height])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflowX: 'auto' }}>
      <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
    </div>
  )
}
