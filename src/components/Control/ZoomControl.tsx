import { type ReactElement } from 'react'
import { useZoom } from '../../state/zoom/useZoom'
import { useZoomFactor } from '../../state/zoom/useScale'
import './ZoomControl.css'

export function ZoomControl(): ReactElement {
  const { increaseZoom, decreaseZoom } = useZoom()
  const zoomFactor = useZoomFactor()

  return (
    <div className="zoom-control">
      <button
        className={zoomFactor <= 1 ? 'zoom-button zoom-button-disabled' : 'zoom-button'}
        disabled={zoomFactor <= 1}
        onClick={decreaseZoom}
      >
        -
      </button>
      <div className="zoom-display">{Math.floor(100 * zoomFactor)} years</div>
      <button className="zoom-button" onClick={increaseZoom}>
        +
      </button>
    </div>
  )
}
