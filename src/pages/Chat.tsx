// src/pages/Chat.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'
import { QuestionForm } from '../components/QuestionForm'
import { useChatStore } from '../store/chatStore'
import BackHomeButton from '../components/BackHomeButton'

const Chat: React.FC = () => {
  const { conversationId: routeCid } = useParams<{ conversationId?: string }>()
  const navigate = useNavigate()

  const {
    conversationId,
    messages,
    loading,
    error,
    loadHistory,
    sendMessage,
    clearChat,
  } = useChatStore()

  const [question, setQuestion] = useState('')

  useEffect(() => {
    if (!routeCid) return

    const needFresh =
      conversationId !== routeCid || messages.length === 0

    if (needFresh) {
      loadHistory(routeCid)
    }
  }, [routeCid, conversationId, messages.length, loadHistory])

  useEffect(() => clearChat, [clearChat])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    await sendMessage(question)
    if (!routeCid && conversationId) {
      navigate(`/chat/${conversationId}`, { replace: true })
    }

    setQuestion('')
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden
      home-gradient bg-gradient-reveal">
      <BackHomeButton />
      <main>
        {error && (
          <div className="mb-4 p-4 text-red-600 bg-red-50 border border-red-200 
            rounded-lg shadow-sm fade-slide-up">
            {error}
          </div>
        )}

        {/* Chat messages container - only show when not loading history */}
        {!loading && (
          <div className="flex-1 overflow-y-auto bg-white/80 backdrop-blur-sm 
            rounded-xl shadow-2xl p-4 fade-slide-up" 
            style={{ animationDelay: '0.15s' }}>
            <ChatWindow messages={messages} />
          </div>
        )}
        
        {/* Loading state for history */}
        {loading && messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center bg-white/80 backdrop-blur-sm 
            rounded-xl shadow-2xl p-4 fade-slide-up"
            style={{ animationDelay: '0.15s' }}>
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Loading conversation...</span>
              </div>
            </div>
          </div>
        )}
      </main>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md 
        border-t border-gray-200 shadow-2xl p-4 fade-slide-up z-20" 
        style={{ animationDelay: '0.3s' }}>
        <div className="max-w-4xl mx-auto">
          <QuestionForm
            question={question}
            setQuestion={setQuestion}
            onSubmit={handleSubmit}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default Chat
