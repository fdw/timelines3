import { type ReactElement, type ReactNode, useMemo, useState } from 'react'
import { TagsContext } from './TagsContextType'

export function TagsProvider({ children }: { children: ReactNode }): ReactElement {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(['architecture']))

  const value = useMemo(() => ({ selectedTags, setSelectedTags }), [selectedTags])

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>
}
