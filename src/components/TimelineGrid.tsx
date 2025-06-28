import type { ReactElement } from 'react'
import { useMemo } from 'react'
import { useScaleFunction } from '../hooks/useScale.ts'

export function TimelineGrid({ height, gridInterval = 10 }: { height: number; gridInterval?: number }): ReactElement {
  const getXFromYear = useScaleFunction()

  const gridLines = useMemo(() => {
    const lines = []

    const startYear = 0
    const endYear = new Date().getFullYear()

    for (let year = startYear; year <= endYear; year += gridInterval) {
      const asDate = new Date()
      asDate.setFullYear(year)
      const x = getXFromYear(asDate)
      lines.push(
        <g key={year}>
          <line stroke="#ccc" strokeWidth="1" x1={x} x2={x} y1={0} y2={height} />
          <text fontSize="12" textAnchor="middle" x={x} y={height - 5}>
            {year}
          </text>
        </g>,
      )
    }

    return lines
  }, [gridInterval, getXFromYear, height])

  return <g className="timeline-grid">{gridLines}</g>
}
