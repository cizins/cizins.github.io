import { useRef, useEffect } from 'react'
import { ParticleSystem } from '../../canvas/nameParticles.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export default function NameParticles() {
  const canvasRef = useRef(null)
  const sysRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const sys = new ParticleSystem(canvas, { count: 140 })
    sysRef.current = sys

    // Connect scroll progress (simple linear mapping for hero)
    const onScroll = () => {
      const rect = canvas.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight))
      sys.setScrollProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      sys.destroy()
    }
  }, [])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-label="Name particle animation"
      className="absolute inset-0 w-full h-full pointer-events-auto z-10"
      style={{ touchAction: 'none' }}
    />
  )
}
