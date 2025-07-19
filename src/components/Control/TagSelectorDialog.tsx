import type { ReactElement } from 'react'
import { useAvailableTags } from '../../state/data/useAvailableTags.ts'

export function TagSelectorDialog({
  selectedTags,
  onChange,
}: {
  selectedTags: string[]
  onChange: (_: string[]) => void
}): ReactElement {
  const availableTags = useAvailableTags()

  function toggleTag(tag: string): void {
    if (selectedTags.includes(tag)) {
      if (selectedTags.length > 1) {
        onChange(selectedTags.filter((it) => it !== tag))
      }
    } else {
      onChange([...selectedTags, tag])
    }
  }

  return (
    <div className="tag-dropdown">
      <ul className="tag-list">
        {availableTags.map((tag) => {
          const isOnlySelectedTag = selectedTags.length === 1 && selectedTags.includes(tag)

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
                  checked={selectedTags.includes(tag)}
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
  )
}
