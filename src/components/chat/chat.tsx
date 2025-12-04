'use client'

import { useChat } from '@ai-sdk/react'
import { ChatInput } from './chat-input'
import { Message } from './message'
import { useEffect, useRef } from 'react'
import { Film } from 'lucide-react'

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Movie Search</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Search for movies by actor, genre, director, or theme
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
              <Film className="w-16 h-16 text-muted-foreground" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Search for Movies</h2>
                <p className="text-muted-foreground max-w-md">
                  Try searching for movies by actor, genre, or theme. For example:
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="text-muted-foreground">"Show me Jake Gyllenhaal movies"</p>
                  <p className="text-muted-foreground">"Best action movies from 2020"</p>
                  <p className="text-muted-foreground">"Christopher Nolan films"</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-card">
        <div className="container mx-auto px-4 py-4">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
