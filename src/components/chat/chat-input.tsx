'use client'

import { type FormEvent, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

interface ChatInputProps {
  input: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Search for movies... (e.g., 'Jake Gyllenhaal movies')"
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        <Send className="w-4 h-4" />
        <span className="ml-2">Search</span>
      </Button>
    </form>
  )
}
