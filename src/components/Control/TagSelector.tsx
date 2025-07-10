import { type ReactElement, useEffect, useRef, useState } from 'react'
import { useTagsControl } from '../../state/data/useTagsControl'
import { useAvailableTags } from '../../state/data/useAvailableTags'
import { useTags } from '../../state/data/useTags'

export function TagSelector(): ReactElement {
  const selectedTags = useTags()
  const setSelectedTags = useTagsControl()
  const availableTags = useAvailableTags()
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

  function toggleTag(tag: string): void {
    const newSelectedTags = new Set(selectedTags)

    if (newSelectedTags.has(tag)) {
      // Don't allow deselecting the last tag
      if (newSelectedTags.size > 1) {
        newSelectedTags.delete(tag)
      }
    } else {
      newSelectedTags.add(tag)
    }

    setSelectedTags(newSelectedTags)
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
        Tags
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: '100%',
            transform: 'translateX(-100%)',
            width: 'calc(100vw - 40px)',
            maxWidth: '800px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            zIndex: 10,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {availableTags.map((tag) => {
              const isOnlySelectedTag = selectedTags.size === 1 && selectedTags.has(tag)

              return (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    cursor: isOnlySelectedTag ? 'not-allowed' : 'pointer',
                    minWidth: '150px',
                  }}
                  onClick={!isOnlySelectedTag ? () => toggleTag(tag) : undefined}
                >
                  <input
                    checked={selectedTags.has(tag)}
                    disabled={isOnlySelectedTag}
                    readOnly
                    style={{
                      marginRight: '8px',
                      cursor: isOnlySelectedTag ? 'not-allowed' : 'pointer',
                    }}
                    type="checkbox"
                  />
                  <div>{tag}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
