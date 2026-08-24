import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getInitialMatch() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

export function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(getInitialMatch)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined

    const mql = window.matchMedia(QUERY)
    const handleChange = (event) => setReduceMotion(event.matches)

    if (mql.addEventListener) {
      mql.addEventListener('change', handleChange)
    } else if (mql.addListener) {
      mql.addListener(handleChange)
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleChange)
      } else if (mql.removeListener) {
        mql.removeListener(handleChange)
      }
    }
  }, [])

  return reduceMotion
}
