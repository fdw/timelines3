import { useContext } from 'react'
import { TagsContext } from './TagsContextType'

export function useTags(): Set<string> {
  const context = useContext(TagsContext)
  if (context === undefined) {
    throw new Error('useTags must be used within a TagsProvider')
  }

  return context.selectedTags
}