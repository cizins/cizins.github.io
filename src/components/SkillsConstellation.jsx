import { useEffect, useRef } from 'react'

export default function SkillsConstellation() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

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

    const nodes = [
      { label: 'JS', angle: 0 },
      { label: 'React', angle: 1 },
      { label: 'Canvas', angle: 2 },
      { label: 'Node', angle: 3 },
      { label: 'ESP32', angle: 4 },
      { label: 'ELK', angle: 5 },
      { label: 'CSS', angle: 6 },
      { label: 'HTML', angle: 7 },
    ].map((n, i) => ({
      ...n,
      r: 120 + Math.sin(i) * 30,
      alpha: 0.3,
      pulse: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2
      const cy = H / 2
      const t = performance.now() * 0.001

      // Orbit arcs
      ctx.strokeStyle = 'rgba(245,243,238,0.06)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, 90 + i * 35, Math.PI * 0.2 + i, Math.PI * 1.8 + i)
        ctx.stroke()
      }

      // Nodes
      for (const n of nodes) {
        const a = n.angle * Math.PI * 2 / nodes.length + t * 0.05
        const x = cx + Math.cos(a) * n.r
        const y = cy + Math.sin(a) * n.r
        n.x = x; n.y = y
        ctx.fillStyle = `rgba(245,243,238,${n.alpha + Math.sin(t + n.pulse)*0.15})`
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(245,243,238,0.35)'
        ctx.font = '11px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(n.label, x, y - 8)
      }

      // Thin constellation lines between near nodes
      ctx.strokeStyle = 'rgba(245,243,238,0.08)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Crystal core (irregular glass)
      ctx.save()
      ctx.translate(cx, cy)
      const pulse = Math.sin(t * 0.8) * 6
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const r = 28 + pulse + Math.sin(i * 1.2) * 8
        const px = Math.cos(angle) * r
        const py = Math.sin(angle) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fillStyle = 'rgba(245,243,238,0.03)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(143,168,255,0.15)'
      ctx.stroke()
      ctx.restore()

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-[520px] md:h-[640px] block" aria-label="能力宇宙星座" />
}
