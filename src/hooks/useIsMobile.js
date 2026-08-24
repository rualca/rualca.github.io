import { useEffect, useState } from 'react'

function getInitialIsMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getInitialIsMobile)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleResize = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
