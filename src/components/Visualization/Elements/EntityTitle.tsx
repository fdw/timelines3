import type { ReactElement } from 'react'

export function EntityTitle({ title, x, y }: { title: string; x: number; y: number }): ReactElement {
  return (
    <text
      dominantBaseline="hanging"
      fontSize="12"
      textAnchor="middle"
      x={x}
      y={y}
    >
      {title}
    </text>
  )
}