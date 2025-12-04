# Movie Search MVP

An AI-powered movie search application that intelligently extracts and displays movies from IMDb lists using the Exa API.

## Features

✅ **AI-Powered Movie Search**
- Search for movies using natural language queries
- AI intelligently identifies movie list pages from search results
- Automatic extraction of comprehensive movie data from IMDb
- Smart deduplication across multiple sources

✅ **Rich Movie Data**
- Movie titles, release years, and runtime
- IMDb ratings and vote counts
- Metascores
- Plot summaries
- Director and cast information
- Movie poster images
- Direct links to IMDb

✅ **Beautiful UI**
- Clean, modern interface
- Responsive grid layout
- Movie cards with posters and metadata
- Real-time streaming responses
- Dark/Light mode support

## How It Works

1. **User searches**: "Show me Jake Gyllenhaal movies"
2. **AI generates query**: Creates optimized search for IMDb
3. **Exa searches**: Finds relevant IMDb pages
4. **AI filters results**: Identifies movie list pages (not actor pages or individual movies)
5. **Content extraction**: Fetches HTML from top movie lists with `includeHtmlTags: true`
6. **HTML parsing**: Extracts all movie data (ratings, cast, images, etc.)
7. **Deduplication**: Removes duplicate movies across lists
8. **Display**: Shows beautiful movie cards with all information

**Everything happens automatically - no user interaction required!**

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **AI**: AI SDK, OpenRouter API (Google Gemini 2.5 Pro)
- **Search & Extraction**: Exa API
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **State**: Zustand

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd movie-search-mvp
pnpm install
```

### 2. Environment Configuration

```bash
cp .env.example .env.local
```

### 3. Update .env.local

```env
# OpenRouter API Key (get from https://openrouter.ai/keys)
OPENROUTER_API_KEY=your_openrouter_api_key

# Exa API Key (get from https://dashboard.exa.ai/)
EXA_API_KEY=your_exa_api_key

# AI Model (optional, defaults to google/gemini-2.5-pro)
AI_MODEL=google/gemini-2.5-pro
```

### 4. Start Development Server

```bash
pnpm dev
```

### 5. Open Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Search Examples

- "Show me Jake Gyllenhaal movies"
- "Best action movies from 2020"
- "Christopher Nolan films"
- "Top sci-fi movies"
- "Tom Hanks best movies"
- "Movies about space"

## Project Structure

```
src/
├── ai/
│   ├── tools/
│   │   ├── index.ts                    # Tool composition
│   │   ├── search-movies.ts            # Intelligent movie search tool
│   │   └── search-movies.md            # Tool documentation
│   ├── messages/
│   │   └── data-parts.ts               # Data type definitions
│   └── openrouter.ts                   # AI provider configuration
├── app/
│   ├── api/
│   │   └── chat/
│   │       ├── route.ts                # Chat API endpoint
│   │       └── prompt.md               # System prompt
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Home page
├── components/
│   ├── chat/
│   │   ├── chat.tsx                    # Main chat component
│   │   ├── chat-input.tsx              # Input field
│   │   └── message.tsx                 # Message display
│   ├── movies/
│   │   └── movie-grid.tsx              # Movie grid display
│   └── ui/                             # Reusable UI components
├── lib/
│   ├── exa-client.ts                   # Exa API client
│   ├── html-parser.ts                  # HTML extraction logic
│   ├── result-filter.ts                # Movie list identification
│   ├── chat-context.tsx                # Chat state
│   └── utils.ts                        # Utilities
└── types/
    └── movie.ts                        # Movie type definitions
```

## Key Features

### Intelligent List Detection

The app uses smart filtering to identify movie lists:
- Recognizes `/list/ls...` URL patterns
- Detects list keywords in titles ("best", "top", "movies")
- Filters out individual movie pages and actor pages
- Ranks lists by relevance

### HTML Parsing

Extracts comprehensive data from IMDb HTML:
- Movie titles and years
- IMDb ratings and vote counts
- Metascores
- Plot summaries
- Directors and cast
- Poster images (highest quality)
- Runtime and age ratings

### Exa API Integration

**Search**: `searchAndContents` with IMDb domain filtering
```typescript
await exa.searchAndContents(query, {
  includeDomains: ['imdb.com'],
  text: true,
  type: 'auto'
})
```

**Content Extraction**: `getContents` with HTML tags
```typescript
await exa.getContents(urls, {
  text: {
    includeHtmlTags: true
  }
})
```

## Architecture Highlights

- **Two-step Exa workflow**: Search first, then fetch detailed content
- **AI-powered filtering**: Automatically identifies relevant movie lists
- **Streaming responses**: Real-time AI output
- **Type-safe**: Full TypeScript throughout
- **Modular design**: Separated concerns (search, parse, display)
- **Error handling**: Graceful failures with helpful messages

## Development Notes

- Uses Next.js 15 App Router
- React 19 for latest features
- Tailwind CSS v4 for styling
- OpenRouter for flexible AI model selection
- Exa for powerful search and content extraction

## Comparison to Parent Repository

Based on [filiksyos/linkedin-search-mvp](https://github.com/filiksyos/linkedin-search-mvp), this MVP:

### Changed:
- **Purpose**: LinkedIn profiles → Movie search
- **Data source**: LinkedIn → IMDb
- **Extraction**: Simple search → Two-step intelligent extraction
- **Filtering**: None → Smart movie list detection
- **Parsing**: Basic → Complex HTML parsing with images
- **Display**: Text lists → Rich movie cards with posters

### Kept:
- Same dependency versions
- Same AI SDK architecture
- Same OpenRouter integration
- Same UI component structure
- Same Tailwind configuration

## License

MIT

---

Ready to search for movies! 🎬
