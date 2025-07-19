import { createContext } from 'react'

export interface TagsContextType {
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
}

export const TagsContext = createContext<TagsContextType | undefined>(undefined)
