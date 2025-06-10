import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionForm } from '../components/QuestionForm';
import { ask } from '../services/api';
import { Card, CardContent } from '@/components/ui';
const Home: React.FC = () => {
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    try {
      const response = await ask(question);
      const conversationId = response.headers['x-conversation-id'];
      navigate(`/chat/${conversationId}`);
    } catch (error) {
      console.error(error);
    }
  };

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