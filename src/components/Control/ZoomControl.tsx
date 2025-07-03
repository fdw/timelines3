import { type ReactElement } from 'react'
import { useZoom } from '../../state/zoom/useZoom'
import { useZoomFactor } from '../../state/zoom/useScale'

export function ZoomControl(): ReactElement {
  const { increaseZoom, decreaseZoom } = useZoom()
  const zoomFactor = useZoomFactor()

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button
        disabled={zoomFactor <= 1}
        style={{
          padding: '4px 8px',
          cursor: zoomFactor <= 1 ? 'not-allowed' : 'pointer',
        }}
        onClick={decreaseZoom}
      >
        -
      </button>
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>{Math.floor(100 * zoomFactor)} years</span>
      <button
        style={{
          padding: '4px 8px',
          cursor: 'pointer',
        }}
        onClick={increaseZoom}
      >
        +
      </button>
    </div>
  )
}
