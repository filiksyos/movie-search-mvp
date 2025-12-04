'use client'

import type { UIMessage } from 'ai/rsc'
import { MovieGrid } from '@/components/movies/movie-grid'
import { User, Bot } from 'lucide-react'

interface MessageProps {
  message: UIMessage
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`mb-6 ${isUser ? 'flex justify-end' : ''}`}>
      <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-primary' : 'bg-secondary'
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-primary-foreground" />
          ) : (
            <Bot className="w-4 h-4 text-secondary-foreground" />
          )}
        </div>

        {/* Message content */}
        <div className={`flex-1 ${isUser ? 'max-w-2xl' : ''}`}>
          {message.display && (
            <div className="mb-2">{message.display}</div>
          )}
          
          {typeof message.content === 'string' && message.content && (
            <div
              className={`rounded-lg px-4 py-2 ${
                isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
