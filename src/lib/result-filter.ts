interface SearchResult {
  url: string
  title?: string
  text?: string
}

export function isMovieList(result: SearchResult): boolean {
  const url = result.url.toLowerCase()
  const title = result.title?.toLowerCase() || ''
  const text = result.text?.toLowerCase() || ''

  // Check if URL matches IMDb list pattern
  if (url.includes('/list/ls')) {
    return true
  }

  // Check for list indicators in title
  const listKeywords = [
    'movies',
    'films',
    'filmography',
    'best',
    'top',
    'ranked',
    'list',
  ]
  const hasListKeyword = listKeywords.some(
    (keyword) => title.includes(keyword) || text.substring(0, 500).includes(keyword)
  )

  // Exclude individual movie pages and actor/name pages
  const isIndividualMovie = url.includes('/title/tt')
  const isActorPage = url.includes('/name/nm')

  return hasListKeyword && !isIndividualMovie && !isActorPage
}

export function filterMovieLists(results: SearchResult[]): SearchResult[] {
  return results.filter(isMovieList)
}

export function rankMovieLists(results: SearchResult[]): SearchResult[] {
  return results.sort((a, b) => {
    // Prioritize URLs with /list/ pattern
    const aHasList = a.url.includes('/list/ls')
    const bHasList = b.url.includes('/list/ls')
    
    if (aHasList && !bHasList) return -1
    if (!aHasList && bHasList) return 1
    
    // Then prioritize by title relevance
    const aTitle = a.title?.toLowerCase() || ''
    const bTitle = b.title?.toLowerCase() || ''
    
    const priorityKeywords = ['best', 'top', 'ranked']
    const aHasPriority = priorityKeywords.some(k => aTitle.includes(k))
    const bHasPriority = priorityKeywords.some(k => bTitle.includes(k))
    
    if (aHasPriority && !bHasPriority) return -1
    if (!aHasPriority && bHasPriority) return 1
    
    return 0
  })
}
