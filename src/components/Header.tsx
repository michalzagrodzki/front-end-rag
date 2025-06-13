import React from 'react'

const HomeHeader: React.FC = () => (
  <header className="py-10 text-center">
    <h1 className="text-4xl font-extrabold tracking-tight">
      RAG Chat Demo
    </h1>
    <p className="mt-2 text-gray-500">
      Ask a document-aware question to get started
    </p>
  </header>
)

export default HomeHeader