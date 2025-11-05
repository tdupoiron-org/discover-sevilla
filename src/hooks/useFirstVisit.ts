import { useState, useEffect } from 'react'

const FIRST_VISIT_KEY = 'discover-sevilla-first-visit'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY)
    
    if (!hasVisited) {
      setIsFirstVisit(true)
    }
    
    setIsLoading(false)
  }, [])

  const markAsVisited = () => {
    localStorage.setItem(FIRST_VISIT_KEY, 'true')
    setIsFirstVisit(false)
  }

  return { isFirstVisit, isLoading, markAsVisited }
}
