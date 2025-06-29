import type { ReactElement } from 'react'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { useHeight, useScale } from '../hooks/useScale.ts'

export function TimelineGrid({ gridInterval = 25 }: { gridInterval?: number }): ReactElement {
  const gridLines = useMemo(() => {
    const lines = []

    const startYear = 0
    const endYear = dayjs().year()

    for (let year = startYear; year <= endYear; year += gridInterval) {
      lines.push(<GridLine year={year} />)
    }

    return lines
  }, [gridInterval])

  return <g className="timeline-grid">{gridLines}</g>
}

function GridLine({ year }: { year: number }): ReactElement {
  const height = useHeight()
  const x = useScale(dayjs().year(year))

  return (
    <g key={year}>
      <line stroke="#ccc" strokeWidth="1" x1={x} x2={x} y1={0} y2={height} />
      <text fontSize="12" textAnchor="middle" x={x} y={height - 5}>
        {year}
      </text>
    </g>
  )
}
