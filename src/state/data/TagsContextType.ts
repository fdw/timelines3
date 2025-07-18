import { createContext } from 'react'

export interface TagsContextType {
  selectedTags: Set<string>
  setSelectedTags: (tags: Set<string>) => void
}

export const TagsContext = createContext<TagsContextType | undefined>(undefined)
