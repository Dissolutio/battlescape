import { useState, useEffect } from 'react'

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(() => {
    return { width: window?.innerWidth ?? 0, height: window?.innerHeight ?? 0 }
  })
  const updateWindowDimensions = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
  useEffect(() => {
    updateWindowDimensions()
    window.addEventListener('resize', updateWindowDimensions)
    return () => {
      window.removeEventListener('resize', updateWindowDimensions)
    }
  }, [])
  const viewportSize = () => {
    if (windowDimensions.width > 1499) {
      return 'large'
    }
    if (windowDimensions.width > 799) {
      return 'medium'
    }
    return 'small'
  }
  return { windowDimensions, viewportSize: viewportSize() }
}
