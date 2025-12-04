Search for movies on IMDb using the Exa API. This tool intelligently:

1. Searches IMDb with the provided query
2. Filters results to identify movie list pages (not individual movies or actor pages)
3. Fetches HTML content from the top movie lists
4. Extracts comprehensive movie data including:
   - Title and release year
   - IMDb rating and vote count
   - Metascore
   - Runtime and age rating
   - Plot summary
   - Director and cast
   - Movie poster image
   - IMDb URL
5. Deduplicates movies across multiple lists
6. Returns up to 50 unique movies

Use this tool when users ask for:
- Movies by actor (e.g., "Jake Gyllenhaal movies")
- Movies by genre (e.g., "best action movies")
- Movies by director (e.g., "Christopher Nolan films")
- Movies by theme or keyword (e.g., "space movies")
- Top or best movies (e.g., "top movies of 2020")

The tool handles all the complexity of filtering, extraction, and parsing automatically.
