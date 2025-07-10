import { type ReactElement } from 'react'
import { TagSelector } from './TagSelector'
import { ZoomControl } from './ZoomControl'

export function UserControl(): ReactElement {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        padding: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex',
        gap: 10,
      }}
    >
      <TagSelector />
      <ZoomControl />
    </div>
  )
}
