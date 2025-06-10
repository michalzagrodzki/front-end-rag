// src/components/ChatWindow.tsx
import React, { useEffect, useRef } from 'react'
import type { Message } from '../store/chatStore'
import { ScrollArea } from '@/components/ui'
import { cn } from '@/lib/utils'

export interface ChatWindowProps {
  messages: Message[]
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  // auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <ScrollArea className="h-[400px] w-full overflow-auto rounded-lg border">
      <div className="flex flex-col space-y-3 p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              'inline-block max-w-[80%] px-4 py-2 rounded-xl',
              msg.role === 'user'
                ? 'self-end bg-blue-500 text-white'
                : 'self-start bg-gray-100 text-gray-900'
            )}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}

export default ChatWindow
