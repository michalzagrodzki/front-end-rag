// src/pages/Chat.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'
import { QuestionForm } from '../components/QuestionForm'
import { useChatStore } from '../store/chatStore'

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

  // whenever the route changes, wipe and (re)load history
  useEffect(() => {
    clearChat()
    if (routeCid) {
      loadHistory(routeCid)
    }
  }, [routeCid, loadHistory, clearChat])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    // 1) send via store
    await sendMessage(question)

    // 2) if this was a brand-new chat, push new URL 
    //    (routeCid was undefined, but store now has one)
    if (!routeCid && conversationId) {
      navigate(`/chat/${conversationId}`, { replace: true })
    }

    setQuestion('')
  }

  return (
    <div className="relative h-screen max-w-4xl mx-auto">
      {/* scrollable chat area */}
      <div className="absolute inset-0 flex flex-col">
        {/* top error banner (doesn’t scroll) */}
        {error && (
          <p className="shrink-0 p-4 text-red-600 bg-red-50 border-b">
            {error}
          </p>
        )}

        {/* flex-1 wrapper with overflow — THIS is the only scroll container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <ChatWindow messages={messages} />
        </div>

        {/* sticky composer */}
        <div className="sticky bottom-0 bg-white border-t p-4">
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
