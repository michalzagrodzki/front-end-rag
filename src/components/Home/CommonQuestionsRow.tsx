import React from 'react'
import QuestionBadge from './QuestionBadge'

interface Props {
  onSelect: (q: string) => void
}

const commonQuestions = [
  'Can you provide an overview of the experiment?',
  'What are the main findings discussed in this document?',
  'What is the significance of the findings in this research paper?',
  'How was the experiment structured?',
  'What were the key tasks involved in this experiment?',
  'What role did group discussions play?',
  'What insights were gained about memory and intelligence?',
  'What implications do the results of this research have in real-world settings?'
] as const

const CommonQuestionsRow: React.FC<Props> = ({ onSelect }) => (
  <div className="flex flex-wrap justify-center gap-2 mb-6">
    {commonQuestions.map((q) => (
      <QuestionBadge key={q} label={q} onClick={onSelect} />
    ))}
  </div>
)

export default CommonQuestionsRow
