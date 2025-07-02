import { type ReactElement, useEffect, useRef, useState } from 'react'
import { useDataSetsControl } from '../../state/data/useDataSetsControl'
import { useDataSetsIndex } from '../../state/data/useDataSetsIndex'
import { useDataSets } from '../../state/data/useDataSets'

export function DataSetSelector(): ReactElement {
  const shownDataSets = useDataSets()
  const setShownDataSets = useDataSetsControl()
  const dataSetsIndex = useDataSetsIndex()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function toggleDataSet(dataSetId: string): void {
    const newShownDataSets = new Set(shownDataSets)

    if (newShownDataSets.has(dataSetId)) {
      newShownDataSets.delete(dataSetId)
    } else {
      newShownDataSets.add(dataSetId)
    }

    setShownDataSets(newShownDataSets)
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        style={{
          padding: '4px 8px',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Data Sets
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            zIndex: 10,
            minWidth: '200px',
          }}
        >
          {dataSetsIndex.map((dataSet) => {
            const isOnlySelectedDataSet = shownDataSets.size === 1 && shownDataSets.has(dataSet.id)

            return (
              <div
                key={dataSet.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 0',
                  cursor: isOnlySelectedDataSet ? 'not-allowed' : 'pointer',
                }}
                onClick={!isOnlySelectedDataSet ? () => toggleDataSet(dataSet.id) : undefined}
              >
                <input
                  checked={shownDataSets.has(dataSet.id)}
                  disabled={isOnlySelectedDataSet}
                  readOnly
                  style={{
                    marginRight: '8px',
                    cursor: isOnlySelectedDataSet ? 'not-allowed' : 'pointer',
                  }}
                  type="checkbox"
                />
                <div>
                  <div>{dataSet.name}</div>
                  <div style={{ fontSize: '0.8em', color: '#666' }}>{dataSet.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
