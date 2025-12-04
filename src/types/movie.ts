export interface Movie {
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

export interface MovieSearchResult {
  status: 'success' | 'error'
  message: string
  movies: Movie[]
  sourceLists?: Array<{
    title?: string
    url: string
  }>
}
