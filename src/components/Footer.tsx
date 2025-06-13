/* src/components/Footer.tsx */
import React from 'react'
interface Props {
  className?: string
  style?: React.CSSProperties            // ← add this
}

const HomeFooter: React.FC<Props> = ({ className = '', style }) => (
  <footer
    className={`shrink-0 py-4 text-center text-sm text-gray-400 border-t ${className}`}
    style={style} 
  >
    © 2025 RAG Chat Demo · Built with React + Vite + shadcn/ui
  </footer>
)

export default HomeFooter
