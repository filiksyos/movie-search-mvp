export interface ParsedMovie {
  title: string
  year?: string
  rating?: string
  voteCount?: string
  metascore?: string
  runtime?: string
  ageRating?: string
  plot?: string
  director?: string
  cast?: string[]
  imdbUrl?: string
  imageUrl?: string
}

export function parseMoviesFromHTML(html: string, sourceUrl: string): ParsedMovie[] {
  const movies: ParsedMovie[] = []

  // Match movie entries in the HTML
  // Pattern: <li><div>...movie data...</div></li>
  const moviePattern = /<li>.*?<h3>.*?<\/h3>.*?<\/li>/gs
  const matches = html.match(moviePattern) || []

  for (const match of matches) {
    try {
      const movie: ParsedMovie = {
        title: '',
      }

      // Extract title
      const titleMatch = match.match(/<h3[^>]*>(?:<a[^>]*>)?(\d+\.\s*)?([^<]+)/)
      if (titleMatch && titleMatch[2]) {
        movie.title = titleMatch[2].trim()
      }

      // Extract IMDb URL
      const urlMatch = match.match(/href="(\/title\/tt\d+\/[^"]*)"/)
      if (urlMatch) {
        movie.imdbUrl = `https://www.imdb.com${urlMatch[1]}`
      }

      // Extract year, runtime, and age rating
      const yearMatch = match.match(/<span>(\d{4})<\/span>/)
      if (yearMatch) movie.year = yearMatch[1]

      const runtimeMatch = match.match(/<span>(\d+h\s*\d+m|\d+m)<\/span>/)
      if (runtimeMatch) movie.runtime = runtimeMatch[1]

      const ageRatingMatch = match.match(/<span>([PGR]G?-?\d*|TV-MA|TV-PG|R)<\/span>/)
      if (ageRatingMatch) movie.ageRating = ageRatingMatch[1]

      // Extract IMDb rating and vote count
      const ratingMatch = match.match(/<span>([\d.]+)<\/span>\s*<span>\s*\((\d+[KM]?)\)/)
      if (ratingMatch) {
        movie.rating = ratingMatch[1]
        movie.voteCount = ratingMatch[2]
      }

      // Extract Metascore
      const metascoreMatch = match.match(/<span>(\d+)<\/span>\s*<span>Metascore<\/span>/)
      if (metascoreMatch) {
        movie.metascore = metascoreMatch[1]
      }

      // Extract plot/description
      const plotMatch = match.match(/<div><div>([^<]+)<\/div><\/div>/)
      if (plotMatch) {
        movie.plot = plotMatch[1].trim()
      }

      // Extract director
      const directorMatch = match.match(/Director<\/span><span><a[^>]*>([^<]+)<\/a>/)
      if (directorMatch) {
        movie.director = directorMatch[1]
      }

      // Extract cast (Stars)
      const castMatches = match.match(/Stars<\/span><span>(.*?)<\/span>/)
      if (castMatches) {
        const castHTML = castMatches[1]
        const castNames = castHTML.match(/<a[^>]*>([^<]+)<\/a>/g)
        if (castNames) {
          movie.cast = castNames.map((c) => {
            const nameMatch = c.match(/>([^<]+)</)
            return nameMatch ? nameMatch[1] : ''
          }).filter(Boolean)
        }
      }

      // Extract image URL from srcset or src
      const imageMatch = match.match(/srcset="([^"]+)"/) || match.match(/src="([^"]+)"/)
      if (imageMatch) {
        const srcset = imageMatch[1]
        // Extract the highest quality image URL
        const urls = srcset.split(',').map(s => s.trim())
        if (urls.length > 0) {
          // Get the last URL (usually highest quality)
          const lastUrl = urls[urls.length - 1]
          const urlOnly = lastUrl.split(' ')[0]
          movie.imageUrl = urlOnly
        }
      }

      // Only add movie if it has a title
      if (movie.title) {
        movies.push(movie)
      }
    } catch (error) {
      console.error('Error parsing movie:', error)
      continue
    }
  }

  return movies
}

export function deduplicateMovies(movies: ParsedMovie[]): ParsedMovie[] {
  const seen = new Set<string>()
  const deduplicated: ParsedMovie[] = []

  for (const movie of movies) {
    const key = `${movie.title}-${movie.year}`
    if (!seen.has(key)) {
      seen.add(key)
      deduplicated.push(movie)
    }
  }

  return deduplicated
}
