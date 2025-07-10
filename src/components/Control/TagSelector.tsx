import { type ReactElement, useEffect, useRef, useState } from 'react'
import { useTagsControl } from '../../state/data/useTagsControl'
import { useAvailableTags } from '../../state/data/useAvailableTags'
import { useTags } from '../../state/data/useTags'
import './TagSelector.css'

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
      if (newSelectedTags.size > 1) {
        newSelectedTags.delete(tag)
      }
    } else {
      newSelectedTags.add(tag)
    }

    setSelectedTags(newSelectedTags)
  }

  return (
    <div className="tag-selector" ref={dropdownRef}>
      <button className="tag-selector-button" onClick={() => setIsOpen(!isOpen)}>
        Tags
      </button>

      {isOpen && (
        <div className="tag-dropdown">
          <ul className="tag-list">
            {availableTags.map((tag) => {
              const isOnlySelectedTag = selectedTags.size === 1 && selectedTags.has(tag)

              return (
                <li className="tag-item" key={tag}>
                  <label
                    className={'tag-label'}
                    onClick={
                      !isOnlySelectedTag
                        ? (e) => {
                            e.preventDefault()
                            toggleTag(tag)
                          }
                        : undefined
                    }
                  >
                    <input
                      checked={selectedTags.has(tag)}
                      className="tag-checkbox"
                      disabled={isOnlySelectedTag}
                      readOnly
                      type="checkbox"
                    />
                    <span>{tag}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
