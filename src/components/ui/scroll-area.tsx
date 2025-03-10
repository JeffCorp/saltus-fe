import React from 'react'

interface ScrollAreaProps {
  className?: string
  children: React.ReactNode
}

export function ScrollArea({ className, children }: ScrollAreaProps) {
  return (
    <div className={`overflow-auto ${className}`}>
      {children}
    </div>
  )
}
