import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionForm } from '../components/QuestionForm';
import { Card, CardContent } from '@/components/ui';
import { useChatStore } from '@/store/chatStore';
import HomeHeader from '../components/Header'
import HomeFooter from '../components/Footer'
import CommonQuestionsRow from '../components/CommonQuestionsRow'
import ProcessingCard from '../components/ProcessingCard'

const Home: React.FC = () => {
  const { sendMessage, clearChat, loading } = useChatStore()
  
  const [question, setQuestion] = useState('')
  const [showProcessing, setShow] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    clearChat()
  }, [clearChat])

  const sendAndNavigate = async (q: string) => {
    setShow(true)
    setQuestion(q)
    const id = await sendMessage(q)
    if (id) navigate(`/chat/${id}`, { replace: true })
  }
  
  /* handleSubmit just delegates to the store */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    sendAndNavigate(question)
  }

  const handleBadgeSelect = (q: string) => {
    if (loading) return
    sendAndNavigate(q)
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden
      home-gradient bg-gradient-reveal ">
      <HomeHeader className="fade-slide-up text-white" />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto p-4 fade-slide-up" style={{ animationDelay: '0.15s' }}>
          <CommonQuestionsRow onSelect={handleBadgeSelect} />
          {!showProcessing ? (
              <Card className="bg-gray-100 shadow-2xl animate-slide-up-in">
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
            ) : (
              <ProcessingCard question={question || '…'} />
            )}
        </div>
      </main>

      <div className="fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <HomeFooter />
      </div>
    </div>
  )
};

export default Home;