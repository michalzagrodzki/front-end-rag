import React from 'react'
import { Badge } from '@/components/ui/badge'

interface Props {
  label: string
  onClick: (value: string) => void
}

const QuestionBadge: React.FC<Props> = ({ label, onClick }) => (
  <Badge
    variant="outline"
    className="cursor-pointer border-gray-400 text-gray-500
      hover:bg-gray-200"
    onClick={() => onClick(label)}
  >
    {label}
  </Badge>
)

export default QuestionBadge
