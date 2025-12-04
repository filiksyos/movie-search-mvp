'use client'

import type { Movie } from '@/types/movie'
import { ExternalLink, Star, Clock, Calendar } from 'lucide-react'
import Image from 'next/image'

interface MovieGridProps {
  movies: Movie[]
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No movies found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie, index) => (
          <div
            key={`${movie.title}-${movie.year}-${index}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card"
          >
            {/* Movie Poster */}
            {movie.imageUrl && (
              <div className="relative w-full aspect-[2/3] bg-muted">
                <Image
                  src={movie.imageUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <div className="p-4 space-y-3">
              {/* Title */}
              <div>
                <h3 className="font-semibold text-lg line-clamp-2">
                  {movie.title}
                </h3>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {movie.year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{movie.year}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{movie.runtime}</span>
                  </div>
                )}
                {movie.ageRating && (
                  <div className="px-2 py-0.5 bg-secondary rounded text-xs">
                    {movie.ageRating}
                  </div>
                )}
              </div>

              {/* Rating */}
              {movie.rating && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{movie.rating}</span>
                    {movie.voteCount && (
                      <span className="text-sm text-muted-foreground">
                        ({movie.voteCount})
                      </span>
                    )}
                  </div>
                  {movie.metascore && (
                    <div className="flex items-center gap-1">
                      <div className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">
                        {movie.metascore}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Metascore
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Plot */}
              {movie.plot && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {movie.plot}
                </p>
              )}

              {/* Director & Cast */}
              {(movie.director || movie.cast) && (
                <div className="text-sm space-y-1">
                  {movie.director && (
                    <div>
                      <span className="text-muted-foreground">Director: </span>
                      <span>{movie.director}</span>
                    </div>
                  )}
                  {movie.cast && movie.cast.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Stars: </span>
                      <span>{movie.cast.slice(0, 3).join(', ')}</span>
                    </div>
                  )}
                </div>
              )}

              {/* IMDb Link */}
              {movie.imdbUrl && (
                <a
                  href={movie.imdbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View on IMDb
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
