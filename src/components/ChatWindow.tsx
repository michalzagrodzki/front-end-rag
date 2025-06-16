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

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-lg fade-slide-up">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Start Your Conversation
          </h3>
          <p className="text-gray-500">
            Ask any question about your documents to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 p-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            'flex w-full',
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              'max-w-[85%] px-6 py-3 rounded-2xl shadow-md transition-all duration-300',
              'backdrop-blur-sm border',
              msg.role === 'user'
                ? 'bg-[#0d47a1] text-white border-blue-600 shadow-blue-200'
                : 'bg-white/90 text-gray-800 border-gray-200 shadow-gray-200',
              msg.pending ? 'opacity-70 scale-95' : 'opacity-100 scale-100',
              msg.animate ? 'animate-fade-in' : '',
              'hover:shadow-lg hover:scale-[1.02]'
            )}
          >
            {msg.pending ? (
              <div className="flex items-center space-x-2">
                <TypingDots />
                <span className="text-sm opacity-70">Thinking...</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )

}

export default ChatWindow
