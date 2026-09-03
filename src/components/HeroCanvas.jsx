import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const progressRef = useRef(0.15)

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

    const onScroll = () => {
      const rect = canvas.getBoundingClientRect()
      const viewH = window.innerHeight
      const total = rect.height + viewH
      let p = (viewH - rect.top) / total
      p = Math.max(0, Math.min(1, p))
      progressRef.current = 0.15 + p * 0.85
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const tryInit = () => {
      const h1 = document.querySelector('h1')
      if (!h1) return false
      const canvasRect = canvas.getBoundingClientRect()
      const h1Rect = h1.getBoundingClientRect()
      return {
        cx: (h1Rect.left + h1Rect.width / 2) - canvasRect.left,
        cy: (h1Rect.top + h1Rect.height / 2) - canvasRect.top,
      }
    }

    let cx = W / 2, cy = H * 0.45
    const init = () => {
      const res = tryInit()
      if (res) { cx = res.cx; cy = res.cy }
    }
    init()
    if (document.fonts) document.fonts.ready.then(init)

    const count = Math.min(Math.floor(W * H / 4200), 520)
    const particles = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const startR = 25 + Math.random() * Math.max(W, H) * 0.22
      const ringR = 95 + Math.random() * 50
      const targetAngle = angle + (Math.random() - 0.5) * 0.45
      const bright = 0.55 + Math.random() * 0.45
      const size = 0.8 + Math.random() * 1.2
      const orbitSpeed = 0.0002 + Math.random() * 0.0005
      const layer = Math.random()
      let finalR = ringR
      if (layer < 0.15) finalR = ringR * 0.82
      else if (layer < 0.30) finalR = ringR * 1.12
      particles.push({
        x: cx + Math.cos(angle) * startR,
        y: cy + Math.sin(angle) * startR,
        tx: cx + Math.cos(targetAngle) * finalR,
        ty: cy + Math.sin(targetAngle) * finalR,
        angle: targetAngle, r: finalR, bright, size,
        phase: Math.random() * Math.PI * 2, orbitSpeed, layer,
      })
    }

    const draw = () => {
      const h1 = document.querySelector('h1')
      const canvasRect = canvas.getBoundingClientRect()
      if (h1) {
        const h1Rect = h1.getBoundingClientRect()
        const titleCenterY = h1Rect.top + h1Rect.height / 2
        if (titleCenterY > -H * 0.2 && titleCenterY < H * 1.2) {
          cx = (h1Rect.left + h1Rect.width / 2) - canvasRect.left
          cy = (h1Rect.top + h1Rect.height / 2) - canvasRect.top
        }
      }

      ctx.clearRect(0, 0, W, H)
      const p = progressRef.current
      const speed = 0.09 * p

      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, W * 0.45)
      grad.addColorStop(0, 'rgba(143,168,255,0.03)')
      grad.addColorStop(0.5, 'rgba(143,168,255,0.01)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      for (const pt of particles) {
        pt.tx = cx + Math.cos(pt.angle) * pt.r
        pt.ty = cy + Math.sin(pt.angle) * pt.r
        pt.x += (pt.tx - pt.x) * speed
        pt.y += (pt.ty - pt.y) * speed

        const dist = Math.sqrt((pt.tx - pt.x) ** 2 + (pt.ty - pt.y) ** 2)
        if (dist < 3 && p < 0.95) {
          pt.angle += pt.orbitSpeed
          const breath = Math.sin(performance.now() * 0.001 + pt.phase) * 2.5
          pt.tx = cx + Math.cos(pt.angle) * (pt.r + breath)
          pt.ty = cy + Math.sin(pt.angle) * (pt.r + breath)
        }
        const a = pt.bright * (0.4 + p * 0.6)
        ctx.fillStyle = `rgba(245,243,238,${Math.max(0.12, a)})`
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < 8; i++) {
        const idx = Math.floor(i * (count / 8))
        const pt = particles[idx]
        if (!pt) continue
        const pulse = Math.sin(performance.now() * 0.001 + pt.phase) * 0.15 + 0.85
        ctx.fillStyle = `rgba(245,243,238,${pt.bright * pulse * 0.55})`
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.size * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
