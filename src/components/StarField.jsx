import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = window.innerWidth
    let H = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.2 + Math.random() * 0.8,
      alpha: 0.2 + Math.random() * 0.5,
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const t = performance.now() * 0.001
      for (const s of stars) {
        s.x += s.dx
        s.y += s.dy
        if (s.x < 0) s.x = W
        if (s.x > W) s.x = 0
        if (s.y < 0) s.y = H
        if (s.y > H) s.y = 0
        const a = s.alpha + Math.sin(t + s.phase) * 0.15
        ctx.fillStyle = `rgba(245,243,238,${Math.max(0, Math.min(1, a))})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }} />
}
