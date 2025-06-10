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
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {error && (
        <div className="text-red-600">
          {error}
        </div>
      )}
      <ChatWindow messages={messages} />
      <QuestionForm
        question={question}
        setQuestion={setQuestion}
        onSubmit={handleSubmit}
        disabled={loading}
      />
    </div>
  )
}

export default Chat
