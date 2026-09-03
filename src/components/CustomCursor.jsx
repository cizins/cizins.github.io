import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    const onMove = (e) => {
      // direct assignment, no lerp / spring / delay
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] text-[#F5F3EE] text-[18px] leading-none select-none"
      style={{ willChange: 'transform', cursor: 'none' }}
    >
      𐙚
    </div>
  )
}
