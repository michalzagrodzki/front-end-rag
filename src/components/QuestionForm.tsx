// src/components/QuestionForm.tsx
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface QuestionFormProps {
  question: string
  setQuestion: (q: string) => void
  onSubmit: (e: React.FormEvent) => void
  disabled?: boolean
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  setQuestion,
  onSubmit,
  disabled = false,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex space-x-2">
      <Input
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={disabled}
        className="flex-1"
      />
      <Button type="submit" disabled={disabled}>
        Send
      </Button>
    </form>
  )
}
