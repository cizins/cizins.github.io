import { useState, useEffect, useRef } from 'react'
import { journey } from '../../data/journey.js'

export default function Timeline() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const h = window.innerHeight
      setProgress(Math.max(0, Math.min(1, (h - rect.top) / (h + rect.height * 0.5))))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <ol ref={ref} className="relative space-y-16" aria-label="Journey timeline">
      {/* Vertical line */}
      <div className="absolute left-3 top-4 bottom-4 w-px bg-white/[0.14]" style={{ height: `${progress * 100}%` }} />
      {journey.map((item, i) => {
        const itemProgress = Math.max(0, Math.min(1, progress * journey.length - i))
        return (
          <li key={i} className="relative pl-10" style={{ opacity: itemProgress, transform: `translateY(${(1 - itemProgress) * 24}px)` }}>
            <span className="absolute left-0 top-1 h-6 w-6 rounded-full border border-white/[0.14] bg-[#0A0A0A] flex items-center justify-center text-xs text-[#666666]">{String(i + 1).padStart(2, '0')}</span>
            <time className="text-sm text-[#8FA8FF]/80 block font-mono" dateTime={String(item.year)}>{item.year}</time>
            <h3 className="mt-1 text-xl font-medium text-[#F5F3EE]">{item.title}</h3>
            {item.titleEn && (
              <span className="mt-0.5 block text-[10px] tracking-[0.2em] text-[#666666] uppercase font-light">
                {item.titleEn}
              </span>
            )}
            <p className="mt-2.5 text-sm text-[#A5A5A5] leading-relaxed font-light">{item.description}</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              {item.tags.map(t => <span key={t} className="text-[11px] text-[#888888] border border-white/[0.14] px-2 py-0.5">{t}</span>)}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
