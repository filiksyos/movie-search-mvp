import { z } from 'zod'
import type { ToolContext } from './index'
import { searchIMDb, getIMDbContent } from '@/lib/exa-client'
import { filterMovieLists, rankMovieLists } from '@/lib/result-filter'
import { parseMoviesFromHTML, deduplicateMovies } from '@/lib/html-parser'
import toolDoc from './search-movies.md'

export function searchMovies({ writer }: ToolContext) {
  return {
    description: toolDoc,
    parameters: z.object({
      query: z.string().describe('Search query for movies on IMDb'),
    }),
    execute: async ({ query }: { query: string }) => {
      try {
        console.log('🎬 Searching IMDb for:', query)

        // Step 1: Search IMDb
        const searchResults = await searchIMDb(query, 10)
        console.log(`📊 Found ${searchResults.total} initial results`)

        if (searchResults.total === 0) {
          return {
            status: 'error',
            message: 'No results found. Try a different search query.',
            movies: [],
          }
        }

        // Step 2: Filter to movie lists only
        const movieLists = filterMovieLists(searchResults.results)
        console.log(`📋 Identified ${movieLists.length} movie lists`)

        if (movieLists.length === 0) {
          return {
            status: 'error',
            message: 'No movie lists found in search results. Try adding "list" to your query.',
            movies: [],
          }
        }

        // Step 3: Rank and select top lists
        const rankedLists = rankMovieLists(movieLists)
        const topLists = rankedLists.slice(0, 3) // Get top 3 lists
        console.log(`🎯 Fetching content from ${topLists.length} top lists`)

        // Step 4: Fetch HTML content from selected lists
        const urls = topLists.map((list) => list.url)
        const contentResults = await getIMDbContent(urls)
        console.log(`📄 Fetched ${contentResults.total} list pages`)

        // Step 5: Parse movies from HTML
        let allMovies: ReturnType<typeof parseMoviesFromHTML> = []
        for (const content of contentResults.results) {
          if (content.text) {
            const movies = parseMoviesFromHTML(content.text, content.url)
            console.log(`🎥 Extracted ${movies.length} movies from ${content.url}`)
            allMovies = allMovies.concat(movies)
          }
        }

        // Step 6: Deduplicate
        const uniqueMovies = deduplicateMovies(allMovies)
        console.log(`✨ Total unique movies: ${uniqueMovies.length}`)

        return {
          status: 'success',
          message: `Found ${uniqueMovies.length} movies from ${topLists.length} IMDb lists`,
          movies: uniqueMovies.slice(0, 50), // Limit to 50 movies
          sourceLists: topLists.map((list) => ({
            title: list.title,
            url: list.url,
          })),
        }
      } catch (error) {
        console.error('❌ Movie search error:', error)
        const err = error as Error
        return {
          status: 'error',
          message: `Search failed: ${err.message}`,
          movies: [],
        }
      }
    },
  }
}
