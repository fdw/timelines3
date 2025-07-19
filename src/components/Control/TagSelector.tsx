import { type ReactElement, useEffect, useRef, useState } from 'react'
import { useTagsControl } from '../../state/data/useTagsControl'
import { useTags } from '../../state/data/useTags'
import './TagSelector.css'
import { TagSelectorDialog } from './TagSelectorDialog.tsx'

export function TagSelector(): ReactElement {
  const selectedTags = useTags()
  const setSelectedTags = useTagsControl()

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

  return (
    <div className="tag-selector" ref={dropdownRef}>
      <button className="tag-selector-button" onClick={() => setIsOpen(!isOpen)}>
        Tags
      </button>

      {isOpen && <TagSelectorDialog selectedTags={selectedTags} onChange={setSelectedTags} />}
    </div>
  )
}
