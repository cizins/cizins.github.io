import { useEffect, useRef, useState } from 'react'

export default function JourneyPath() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const [targetProgress, setTargetProgress] = useState(0)
  const progressRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const rect = canvasRef.current?.parentElement?.getBoundingClientRect()
      if (!rect) return
      const viewH = window.innerHeight
      const start = rect.top - viewH * 0.5
      const total = rect.height + viewH
      let p = (viewH - rect.top) / total
      p = Math.max(0, Math.min(1, p))
      setTargetProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.clientWidth
    let H = canvas.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Nodes positions along path
    const nodes = [
      { label: 'ESP32', sub: '01 · FROM THEORY TO PRACTICE', pct: 0.2 },
      { label: '簡報比賽', sub: '02 · CHALLENGE & DISCOVERY', pct: 0.55 },
      { label: '閱讀心得', sub: '03 · REFLECTION & EXPRESSION', pct: 0.8 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2
      const baseY = H * 0.6
      // Smooth progress
      const diff = targetProgress - progressRef.current
      progressRef.current += diff * 0.08 // smoothing 0.08

      const p = progressRef.current

      // Draw curved path from left to right gradually
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(245,243,238,0.12)'
      ctx.lineWidth = 1.5
      for (let x = 0; x <= W; x++) {
        const t = x / W
        // only draw if within progress
        if (t > p + 0.05) break
        // gentle curve: sine + linear
        const y = baseY + Math.sin(t * Math.PI * 2) * 40 + (t - 0.5) * 20
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Nodes illuminate based on progress
      for (const n of nodes) {
        const x = cx + Math.sin(n.pct * Math.PI * 2) * 120
        const y = baseY + Math.sin(n.pct * Math.PI * 2) * 40 + (n.pct - 0.5) * 20
        const alpha = p > n.pct - 0.05 ? Math.min(1, (p - (n.pct - 0.05)) * 5) : 0
        if (alpha > 0.01) {
          ctx.fillStyle = `rgba(245,243,238,${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, 5, 0, Math.PI * 2)
          ctx.fill()
          // faint glow
          ctx.fillStyle = `rgba(143,168,255,${alpha * 0.2})`
          ctx.beginPath()
          ctx.arc(x, y, 12, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Unlit stars along path tail
      if (p < 0.95) {
        for (let i = 0; i < 6; i++) {
          const sp = p + 0.02 + i * 0.015
          if (sp > 1.1) break
          const tx = cx + Math.sin(sp * Math.PI * 2) * 140
          const ty = baseY + Math.sin(sp * Math.PI * 2) * 45 + (sp - 0.5) * 25
          ctx.fillStyle = 'rgba(245,243,238,0.15)'
          ctx.beginPath()
          ctx.arc(tx, ty, 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [targetProgress])

  return (
    <div className="relative w-full h-[420px] md:h-[560px] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" aria-label="成長軌跡" />
    </div>
  )
}
