import type { ReactElement } from 'react'
import dayjs from 'dayjs'
import { useScale } from '../../state/zoom/useScale'

export function TimelineGrid(): ReactElement {
  const lines = []

  const startYear = -2000
  const endYear = dayjs().year()

  for (let year = startYear; year <= endYear; year += 25) {
    lines.push(<GridLine key={year} year={year} />)
  }

  return <g>{lines}</g>
}

function GridLine({ year }: { year: number }): ReactElement {
  const x = useScale(dayjs().year(year))

  return (
    <g key={year}>
      <line stroke="#ccc" strokeWidth="1" x1={x} x2={x} y1={0} y2="100%" />
      <YearLabel x={x} year={year} />
    </g>
  )
}

function YearLabel({ year, x }: { year: number; x: number }): ReactElement {
  return (
    <text fontSize="12" textAnchor="middle" x={x} y="97%">
      {year < 0 ? `${Math.abs(year)} BCE` : year.toString()}
    </text>
  )
}
