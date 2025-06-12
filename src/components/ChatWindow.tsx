// src/components/ChatWindow.tsx
import React, { useEffect, useRef } from 'react'
import type { Message } from '../store/chatStore'
import { cn } from '@/lib/utils'

export interface ChatWindowProps {
  messages: Message[]
}

const TypingDots = () => (
  <div className="flex space-x-1">
    {/* staggered bouncing dots */}
    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-.3s]" />
    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-.15s]" />
    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
  </div>
)

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  // auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            'inline-block max-w-[90%] px-4 py-2 rounded-xl transition-opacity',
            msg.role === 'user'
              ? 'self-end bg-blue-500 text-white'
              : 'self-start bg-gray-100 text-gray-900',
            msg.pending ? 'opacity-70' : 'fade-in'   // ←  here
          )}
        >
          {msg.pending ? <TypingDots /> : msg.text}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )

}

export default ChatWindow
