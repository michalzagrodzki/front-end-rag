import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionForm } from '../components/QuestionForm';
import { Card, CardContent } from '@/components/ui';
import { useChatStore } from '@/store/chatStore';
const Home: React.FC = () => {
  const {
    conversationId,
    loadHistory,
    sendMessage,
    clearChat,
  } = useChatStore()
  
  const { conversationId: routeCid } = useParams<{ conversationId?: string }>()
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    clearChat()
    if (routeCid) loadHistory(routeCid)
  }, [loadHistory, clearChat, routeCid])

  /* 🔑 whenever the store gets its first UUID, push it into the URL */
  useEffect(() => {
    if (!routeCid && conversationId) {
      navigate(`/chat/${conversationId}`, { replace: true })
    }
  }, [conversationId, routeCid, navigate])

  /* handleSubmit just delegates to the store */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    await sendMessage(question)               // store now guarantees a UUID
    setQuestion('')
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Ask a question</h1>
          <QuestionForm question={question} setQuestion={setQuestion} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;