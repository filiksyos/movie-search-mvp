export interface MovieData {
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

export interface SearchMoviesResult {
  status: 'success' | 'error'
  message: string
  movies: MovieData[]
  sourceLists?: Array<{
    title?: string
    url: string
  }>
}
