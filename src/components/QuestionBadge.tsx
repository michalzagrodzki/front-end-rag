import React from 'react'
import { Badge } from '@/components/ui/badge'

interface Props {
  label: string
  onClick: (value: string) => void
}

const QuestionBadge: React.FC<Props> = ({ label, onClick }) => (
  <Badge
    variant="outline"
    className="cursor-pointer border-blue-300 text-blue-300
      hover:bg-blue-50"
    onClick={() => onClick(label)}
  >
    {label}
  </Badge>
)

export default QuestionBadge
