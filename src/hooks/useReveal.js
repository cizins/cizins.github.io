import { useEffect, useRef, useState } from 'react'

export default function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, shown }
}
