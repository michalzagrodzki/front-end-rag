import React from 'react'
import { Badge } from '@/components/ui/badge'

interface Props {
  label: string
  onClick: (value: string) => void
}

const QuestionBadge: React.FC<Props> = ({ label, onClick }) => (
  <Badge
    variant="outline"
    className="cursor-pointer hover:bg-gray-100"
    onClick={() => onClick(label)}
  >
    {label}
  </Badge>
)

export default QuestionBadge
