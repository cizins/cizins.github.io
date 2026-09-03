import { useEffect, useRef, useState } from 'react'

const SKILLS = [
  { title: '程式開發', en: 'DEVELOPMENT', tech: 'JavaScript · React', desc: '從網頁開發與互動實作中，逐步建立程式設計與前端開發能力。', status: '學習中 · LEARNING', cx: 0.18, cy: 0.20, br: 0.82 },
  { title: '網頁互動', en: 'INTERACTION', tech: 'HTML · CSS · Canvas', desc: '透過網頁結構、視覺設計與 Canvas，嘗試讓程式不只是能運作，也能產生互動與體驗。', status: '正在實作 · IN PRACTICE', cx: 0.82, cy: 0.22, br: 0.75 },
  { title: '簡報與表達', en: 'PRESENTATION', tech: '簡報 · 提案 · 表達', desc: '透過參與簡報比賽，練習把想法整理成完整的內容，並學習如何把複雜的問題說清楚。', status: '持續練習 · IN PROGRESS', cx: 0.15, cy: 0.58, br: 0.78 },
  { title: '團隊協作', en: 'COLLABORATION', tech: '團隊合作 · Teamwork', desc: '在共同完成專案與參與競賽的過程中，學習分工、溝通與一起解決問題。', status: '累積中 · GROWING', cx: 0.85, cy: 0.58, br: 0.70 },
  { title: '硬體實作', en: 'HARDWARE', tech: 'ESP32', desc: '從課堂學習走向實際操作，理解硬體與軟體整合，並在遇到問題時嘗試找出解決方式。', status: '實作中 · EXPLORING', cx: 0.75, cy: 0.78, br: 0.65 },
  { title: '系統觀測', en: 'OBSERVATION', tech: 'ELK', desc: '透過 ELK 與系統監控的概念，嘗試理解系統在異常情況下的運作狀態。', status: '探索中 · EXPLORING', cx: 0.25, cy: 0.78, br: 0.72 },
  { title: '資料與結構', en: 'DATA & STRUCTURE', tech: '圖論 · Graph', desc: '從圖論與系統關係的角度，學習如何整理資訊，並理解不同元素之間的關係。', status: '探索中 · EXPLORING', cx: 0.55, cy: 0.42, br: 0.68 },
  { title: '閱讀與反思', en: 'REFLECTION', tech: '閱讀 · 思考', desc: '透過閱讀與心得分享，學習慢下來思考，也練習理解自己與他人的感受。', status: '持續累積 · ONGOING', cx: 0.50, cy: 0.88, br: 0.62 },
]

const CONNECTIONS = [[0,1],[0,5],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[0,2],[3,5]]

export default function SkillsUniverse() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const [hoverIdx, setHoverIdx] = useState(-1)
  const [shown, setShown] = useState(false)
  const revealRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); observer.disconnect(); }
    }, { threshold: 0.08 })
    if (revealRef.current) observer.observe(revealRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.clientWidth, H = canvas.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => { W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W*dpr; canvas.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0) }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: 0.2 + Math.random()*0.7,
      a: 0.06 + Math.random()*0.3,
      dx: (Math.random()-0.5)*0.07,
      dy: (Math.random()-0.5)*0.07,
      layer: Math.random(), phase: Math.random()*Math.PI*2,
    }))
    const unfinished = [
      {x: W*0.82, y: H*0.18}, {x: W*0.15, y: H*0.82},
      {x: W*0.88, y: H*0.72}, {x: W*0.12, y: H*0.15},
      {x: W*0.80, y: H*0.48},
    ]

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const t = performance.now()*0.001
      const cx = W/2, cy = H/2

      // Nebula (very subtle, slow drift)
      const nx = Math.sin(t*0.03)*W*0.14
      const ny = Math.sin(t*0.02)*H*0.10
      const ng = ctx.createRadialGradient(cx+nx, cy+ny, 30, cx, cy, W*0.55)
      ng.addColorStop(0, 'rgba(143,168,255,0.035)')
      ng.addColorStop(0.6, 'rgba(143,168,255,0.015)')
      ng.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ng
      ctx.fillRect(0, 0, W, H)

      // Stars 3 layers
      for (const s of stars) {
        s.x += s.dx; s.y += s.dy; if (s.x<0)s.x=W; if (s.x>W)s.x=0; if (s.y<0)s.y=H; if (s.y>H)s.y=0
        const a = s.a + Math.sin(t*0.7+s.phase)*0.1
        const r = s.r * (s.layer<0.3 ? 0.6 : s.layer<0.7 ? 1 : 1.3)
        ctx.fillStyle = `rgba(245,243,238,${Math.max(0.05, a)})`
        ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, Math.PI*2); ctx.fill()
      }

      // Unfinished distant stars
      for (let i=0;i<unfinished.length;i++) {
        const u = unfinished[i]
        const pulse = Math.sin(t*0.35+i)*0.15+0.85
        ctx.fillStyle = `rgba(245,243,238,${0.18*pulse})`
        ctx.beginPath(); ctx.arc(u.x, u.y, 1, 0, Math.PI*2); ctx.fill()
      }

      // Glass crystal core (irregular, gentle glow)
      ctx.save()
      ctx.translate(cx, cy)
      const b = Math.sin(t*0.35)*0.06 + 0.94
      // Main glass body (irregular polygon-ish)
      ctx.beginPath()
      for (let i=0;i<9;i++) {
        const ang = (i/9)*Math.PI*2 + Math.sin(t*0.4+i)*0.08
        const r = 28 + Math.sin(i*1.3)*6 + (b-0.94)*8
        const px = Math.cos(ang)*r
        const py = Math.sin(ang)*r
        if (i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py)
      }
      ctx.closePath()
      ctx.fillStyle = `rgba(245,243,238,${0.06*b})`
      ctx.fill()
      ctx.strokeStyle = `rgba(143,168,255,${0.18*b})`
      ctx.lineWidth = 0.8
      ctx.stroke()
      // Inner faint glow
      ctx.beginPath()
      ctx.arc(0,0,14,0,Math.PI*2)
      ctx.fillStyle = `rgba(143,168,255,${0.12*b})`
      ctx.fill()
      // JX text inside core (very small, low opacity, centered)
      ctx.font = '10px "Zen Old Mincho", serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = `rgba(245,243,238,${0.55*b})`
      ctx.fillText('JX', 0, 1)
      ctx.restore()

      // Connections (thin, very faint)
      ctx.strokeStyle = 'rgba(245,243,238,0.06)'
      ctx.lineWidth = 0.5
      for (const [a,b] of CONNECTIONS) {
        const s1 = SKILLS[a], s2 = SKILLS[b]
        const x1 = s1.cx*W, y1 = s1.cy*H, x2 = s2.cx*W, y2 = s2.cy*H
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
      }

      // Skill nodes (small planets)
      for (let i=0;i<SKILLS.length;i++) {
        const s = SKILLS[i]
        const active = hoverIdx === i
        const x = s.cx*W, y = s.cy*H
        const pulse = Math.sin(t*0.6+i)*0.08+1
        const alpha = s.br * pulse * (active ? 1.15 : 0.82)
        // Main small circle
        ctx.fillStyle = `rgba(245,243,238,${alpha})`
        ctx.beginPath(); ctx.arc(x,y,3.2,0,Math.PI*2); ctx.fill()
        // Very subtle halo
        ctx.fillStyle = `rgba(143,168,255,${0.08*(active?1.3:0.7)})`
        ctx.beginPath(); ctx.arc(x,y,9,0,Math.PI*2); ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [hoverIdx])

  useEffect(() => {
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      let best = -1, bestD = 60
      for (let i=0;i<SKILLS.length;i++) {
        const s = SKILLS[i]
        const dx = e.clientX - (s.cx*rect.width + rect.left)
        const dy = e.clientY - (s.cy*rect.height + rect.top)
        const d = Math.sqrt(dx*dx+dy*dy)
        if (d < bestD) { bestD = d; best = i }
      }
      setHoverIdx(best)
    }
    const onLeave = () => setHoverIdx(-1)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div ref={revealRef} className={`transition-all duration-1000 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <div className="w-full py-20 md:py-28 px-6 md:px-12 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 45%, #0f1115 0%, #0A0A0A 70%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-zh text-3xl md:text-[2.6rem] lg:text-5xl text-[#F5F3EE] mb-3 tracking-wide leading-tight">能力宇宙</h2>
            <p className="font-en text-[11px] md:text-xs text-[#8FA8FF] tracking-[0.35em] uppercase opacity-50">SKILLS · ABILITIES</p>
          </div>

          <div className="relative w-full h-[640px] md:h-[800px]">
            <canvas ref={canvasRef} className="w-full h-full block" aria-label="能力宇宙" />

            {/* Skill labels - small, elegant, scattered, not crowded */}
            <div className="absolute inset-0 pointer-events-none">
              {SKILLS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {}}
                  className={`absolute pointer-events-auto text-left transition-all duration-500 group cursor-pointer ${hoverIdx === i ? 'scale-105 opacity-100 z-10' : 'scale-100 opacity-85 z-0'} ${hoverIdx !== -1 && hoverIdx !== i ? 'opacity-35' : 'opacity-85'}`}
                  style={{
                    left: `${s.cx * 100}%`,
                    top: `${s.cy * 100}%`,
                    transform: `translate(-50%, -50%)`,
                    maxWidth: '130px',
                  }}
                  aria-label={s.title}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(-1)}
                >
                  <div className="font-zh text-[12px] md:text-[13px] text-[#F5F3EE]/90 leading-snug tracking-wide mb-0">{s.title}</div>
                  <div className="font-en text-[9px] md:text-[10px] text-[#A5A5A5] tracking-[0.22em] uppercase mb-0" style={{ opacity: 0.55 }}>{s.en}</div>
                  <div className="font-en text-[9px] text-[#777777] tracking-widest mb-0">{s.tech}</div>
                  <div className="font-en text-[9px] text-[#8FA8FF] tracking-[0.15em] opacity-60">{s.status}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 md:mt-14 font-en text-xs text-[#666666] tracking-[0.3em] opacity-40">
            EVERY STAR REPRESENTS SOMETHING I'M BECOMING
          </div>
        </div>
      </div>
    </div>
  )
}
