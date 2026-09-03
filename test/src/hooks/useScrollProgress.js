import { useEffect, useRef, useState } from 'react'

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const h = window.innerHeight
      const progress = Math.max(0, Math.min(1, (h - rect.top) / (h + rect.height)))
      setProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return progress
}
