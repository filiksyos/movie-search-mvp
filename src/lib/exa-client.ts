import Exa from 'exa-js'

if (!process.env.EXA_API_KEY) {
  throw new Error('EXA_API_KEY environment variable is not set')
}

export const exa = new Exa(process.env.EXA_API_KEY)

interface ExaSearchResult {
  id?: string
  url: string
  title?: string
  summary?: string
  text?: string
  score?: number
  publishedDate?: string
}

interface ExaSearchResponse {
  results?: ExaSearchResult[]
}

export async function searchIMDb(query: string, limit: number = 10) {
  try {
    const result = (await exa.searchAndContents(query, {
      includeDomains: ['imdb.com'],
      text: true,
      type: 'auto',
      numResults: limit,
    })) as ExaSearchResponse

    return {
      status: 'success',
      total: result.results?.length || 0,
      results:
        result.results?.map((item: ExaSearchResult) => ({
          id: item.id || item.url,
          url: item.url,
          title: item.title,
          summary: item.summary,
          text: item.text,
          score: item.score,
          publishedDate: item.publishedDate,
        })) || [],
    }
  } catch (error) {
    const err = error as Error
    throw new Error(`IMDb search failed: ${err.message}`)
  }
}

export async function getIMDbContent(urls: string[]) {
  try {
    const result = (await exa.getContents(urls, {
      text: {
        includeHtmlTags: true,
      },
    })) as ExaSearchResponse

    return {
      status: 'success',
      total: result.results?.length || 0,
      results:
        result.results?.map((item: ExaSearchResult) => ({
          id: item.id || item.url,
          url: item.url,
          title: item.title,
          text: item.text,
        })) || [],
    }
  } catch (error) {
    const err = error as Error
    throw new Error(`Content fetch failed: ${err.message}`)
  }
}
