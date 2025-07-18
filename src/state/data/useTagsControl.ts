import { useContext } from 'react'
import { TagsContext } from './TagsContextType'

export function useTagsControl(): (tags: Set<string>) => void {
  const context = useContext(TagsContext)
  if (context === undefined) {
    throw new Error('useTagsControl must be used within a TagsProvider')
  }

  return context.setSelectedTags
}
