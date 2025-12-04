'use client'

import { createContext, useContext } from 'react'
import type { UIMessage } from 'ai/rsc'

export type ChatUIMessage = UIMessage & {
  metadata?: {
    model?: string
  }
}

export interface ChatContextType {
  messages: ChatUIMessage[]
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider')
  }
  return context
}

export function ChatProvider({
  children,
  messages,
}: {
  children: React.ReactNode
  messages: ChatUIMessage[]
}) {
  return (
    <ChatContext.Provider value={{ messages }}>
      {children}
    </ChatContext.Provider>
  )
}
