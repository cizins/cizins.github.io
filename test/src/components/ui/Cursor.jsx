import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export default function Cursor() {
  const reduced = useReducedMotion()
  const isTouch = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches
  const elRef = useRef(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const hoverRef = useRef(false)

  if (reduced || isTouch) return null

  useEffect(() => {
    if (reduced) return
    const move = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const enter = () => { hoverRef.current = true }
    const leave = () => { hoverRef.current = false }
    window.addEventListener('pointermove', move)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('pointerenter', enter)
      el.addEventListener('pointerleave', leave)
    })
    let raf = null
    const tick = () => {
      const el = elRef.current
      if (el) {
        const m = mouseRef.current
        el.style.transform = `translate3d(${m.x}px, ${m.y}px, 0) translate(-50%, -50%) rotate(${hoverRef.current ? 3 : 0}deg)`
        el.style.fontSize = hoverRef.current ? '22px' : '18px'
        el.style.color = hoverRef.current ? '#8FA8FF' : '#F5F3EE'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('pointerenter', enter)
        el.removeEventListener('pointerleave', leave)
      })
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  if (reduced) return null
  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="fixed pointer-events-none z-[9998] mix-blend-difference select-none"
      style={{
        top: 0, left: 0,
        fontSize: '18px',
        lineHeight: 1,
        color: '#F5F3EE',
        willChange: 'transform',
      }}
    >
      𐙚
    </div>
  )
}
