import type { ReactElement } from 'react'
import './EntityVisualizations.css'

export function EntityTitle({ title, x, y }: { title: string; x: number; y: number }): ReactElement {
  return (
    <text className={'title'} dominantBaseline="hanging" fontSize="12" textAnchor="middle" x={x} y={y}>
      {title}
    </text>
  )
}
