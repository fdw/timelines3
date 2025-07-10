import { type ReactElement } from 'react'
import { TagSelector } from './TagSelector'
import { ZoomControl } from './ZoomControl'
import './UserControl.css'

export function UserControl(): ReactElement {
  return (
    <div className="user-controls">
      <TagSelector />
      <ZoomControl />
    </div>
  )
}
