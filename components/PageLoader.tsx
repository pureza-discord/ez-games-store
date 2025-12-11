'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LoadingSpinner from './LoadingSpinner'

export default function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100000] bg-primary/20">
      <div className="h-full bg-gradient-to-r from-primary to-accent animate-loading-bar" style={{
        animation: 'loadingBar 1s ease-in-out infinite'
      }}></div>
    </div>
  )
}

