import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionForm } from '../components/QuestionForm';
import { Card, CardContent } from '@/components/ui';
import { useChatStore } from '@/store/chatStore';
import HomeHeader from '../components/Header'
import HomeFooter from '../components/Footer'
const Home: React.FC = () => {
  const { sendMessage, clearChat, loading } = useChatStore()
  
  const [question, setQuestion] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    clearChat()
  }, [clearChat])

  /* handleSubmit just delegates to the store */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    const conversationId = await sendMessage(question)
    setQuestion('')

    if (conversationId) {
      navigate(`/chat/${conversationId}`, { replace: true })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HomeHeader />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto p-4">
          <Card>
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Ask a question</h2>
              <QuestionForm
                question={question}
                setQuestion={setQuestion}
                onSubmit={handleSubmit}
                disabled={loading}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <HomeFooter />
    </div>
  )
};

export default Home;