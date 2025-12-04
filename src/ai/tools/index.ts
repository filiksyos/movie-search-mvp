import type { UIMessageStreamWriter } from 'ai'
import type { ChatUIMessage } from '@/lib/chat-context'
import { searchMovies } from './search-movies'

export interface ToolContext {
  writer: UIMessageStreamWriter
  messages: ChatUIMessage[]
}

export function tools({ writer, messages }: ToolContext) {
  return {
    searchMovies: searchMovies({ writer, messages }),
  }
}
