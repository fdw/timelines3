import { useState, useMemo, useRef, useEffect, type ReactNode, type ReactElement } from 'react'
import dayjs from 'dayjs'
import { ScaleContext } from './ScaleContextType'

// ScaleProvider component
export function ScaleProvider({ children }: { children: ReactNode }): ReactElement {
  const [pixelsPerYear, setPixelsPerYear] = useState<number>(10)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Find the available width and height
  useEffect(() => {
    function updateDimensions(): void {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth
        const newHeight = containerRef.current.clientHeight
        setWidth(newWidth)
        setHeight(newHeight)
        // Calculate pixels per year based on width and a fixed range (current year)
        const currentYear = dayjs().year()
        setPixelsPerYear(newWidth / currentYear)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const value = useMemo(() => ({ pixelsPerYear, width, height }), [pixelsPerYear, width, height])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
    </div>
  )
}
