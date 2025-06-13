import React from 'react'
interface Props { className?: string }

const HomeHeader: React.FC<Props> = ({ className = '' }) => (
  <header className={`py-10 text-center ${className}`}>
    <h1 className="text-4xl font-extrabold tracking-tight text-white">Document Chat</h1>
    <p className="mt-2 text-gray-300">
      Ask a document-aware question to get started
    </p>
  </header>
)

export default HomeHeader