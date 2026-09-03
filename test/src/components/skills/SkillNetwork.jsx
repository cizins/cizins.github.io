import { useRef, useEffect, useState, useCallback } from 'react'
import { SkillNetwork as SkillNetworkCanvas } from '../../canvas/skillNetwork.js'
import { skills } from '../../data/skills.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export default function SkillNetwork() {
  const reduced = useReducedMotion()
  const canvasRef = useRef(null)
  const sysRef = useRef(null)
  const [activeSkillId, setActiveSkillId] = useState(null)
  const [hoverSkillId, setHoverSkillId] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const nodes = skills.map((s) => ({
      id: s.id,
      name: s.name,
      categoryZh: s.categoryZh,
      category: s.category,
      statusZh: s.statusZh,
      connections: s.connections,
    }))

    const sys = new SkillNetworkCanvas(canvas, nodes, {
      reduced,
      activeId: null,
      onSelect: (id) => {
        setActiveSkillId(id)
      },
      onHover: (id) => {
        setHoverSkillId(id)
      },
    })
    sysRef.current = sys

    return () => sys.destroy()
  }, [reduced])

  useEffect(() => {
    sysRef.current?.setActive(activeSkillId)
  }, [activeSkillId])

  // Sync state into canvas if external selection changes
  const handleCardClick = useCallback((id) => {
    setActiveSkillId((prev) => {
      const next = prev === id ? null : id
      if (sysRef.current) {
        sysRef.current.setActive(next)
      }
      return next
    })
  }, [])

  const handleCardMouseEnter = useCallback((id) => {
    setHoverSkillId(id)
    if (sysRef.current) {
      sysRef.current.hoverId = id
      sysRef.current.requestStaticRender()
    }
  }, [])

  const handleCardMouseLeave = useCallback(() => {
    setHoverSkillId(null)
    if (sysRef.current) {
      sysRef.current.hoverId = null
      sysRef.current.requestStaticRender()
    }
  }, [])

  const currentFocusId = hoverSkillId || activeSkillId

  return (
    <div className="w-full space-y-10">
      {/* Cosmos Canvas Container */}
      <div className="relative w-full overflow-hidden border border-white/[0.08] bg-[#0A0A0A]/60 backdrop-blur-[2px]">
        <canvas
          ref={canvasRef}
          aria-label="能力星系互動圖（Interactive Ability Cosmos）"
          role="img"
          className="w-full h-[480px] sm:h-[520px] md:h-[580px] lg:h-[620px] block"
          style={{ touchAction: 'none' }}
        />
        
        {/* Subtle Ambient Note: Chinese Primary + English Secondary */}
        <div className="pointer-events-none absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-[#888888]">
          <div className="flex items-baseline gap-2">
            <span className="text-[#F5F3EE] font-medium">能力星系</span>
            <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase">CONSTELLATION</span>
          </div>
          <div className="hidden sm:flex items-baseline gap-2">
            <span className="text-[#A5A5A5]">點擊星體或卡片追蹤能力關聯</span>
            <span className="text-[10px] tracking-[0.15em] text-[#666666] uppercase">TRACE CONNECTIONS</span>
          </div>
        </div>
      </div>

      {/* Synchronized Skill Artifact Cards */}
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        aria-label="Skill details"
      >
        {skills.map((s) => {
          const isFocused = currentFocusId === s.id
          const isConnectedToFocus =
            currentFocusId &&
            (s.connections?.includes(currentFocusId) ||
              skills.find((item) => item.id === currentFocusId)?.connections?.includes(s.id))

          return (
            <article
              key={s.id}
              tabIndex={0}
              role="button"
              aria-pressed={activeSkillId === s.id}
              onClick={() => handleCardClick(s.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleCardClick(s.id)
                }
              }}
              onMouseEnter={() => handleCardMouseEnter(s.id)}
              onMouseLeave={handleCardMouseLeave}
              className={`group relative p-6 transition-all duration-500 text-left border ${
                isFocused
                  ? 'border-[#8FA8FF]/50 bg-white/[0.03] shadow-[0_0_24px_-8px_rgba(143,168,255,0.12)]'
                  : isConnectedToFocus
                  ? 'border-white/[0.24] bg-white/[0.015]'
                  : currentFocusId
                  ? 'border-white/[0.06] opacity-60'
                  : 'border-white/[0.14] hover:border-white/[0.26]'
              }`}
            >
              {/* Category & Status: Chinese Primary + English Secondary */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#F5F3EE] group-hover:text-[#8FA8FF] transition-colors">
                    {s.categoryZh}
                  </span>
                  <span className="text-[9px] tracking-[0.18em] uppercase text-[#666666] mt-0.5">
                    {s.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-[11px] text-[#8FA8FF] tracking-wider font-light">
                    {s.statusZh}
                  </span>
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isFocused
                        ? 'bg-[#8FA8FF] shadow-[0_0_8px_#8FA8FF]'
                        : isConnectedToFocus
                        ? 'bg-[#F5F3EE]/80'
                        : 'bg-white/20'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Skill Name (Standard tech term in English) */}
              <h3
                className={`mt-4 font-display text-xl transition-colors duration-300 ${
                  isFocused ? 'text-[#8FA8FF]' : 'text-[#F5F3EE]'
                }`}
              >
                {s.name}
              </h3>

              {/* Description in Natural Traditional Chinese */}
              <p className="mt-3 text-xs leading-[1.7] text-[#A5A5A5] font-light">
                {s.description}
              </p>

              {/* Interconnection Chips */}
              <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06] items-center">
                <span className="text-[10px] text-[#666666] mr-1">關聯:</span>
                {s.connections.map((connId) => {
                  const connItem = skills.find((item) => item.id === connId)
                  return (
                    <span
                      key={connId}
                      className={`text-[10px] px-2 py-0.5 border transition-colors ${
                        currentFocusId === connId
                          ? 'border-[#8FA8FF]/40 text-[#8FA8FF] bg-[#8FA8FF]/5'
                          : 'border-white/[0.08] text-[#777777]'
                      }`}
                    >
                      {connItem ? connItem.name : connId}
                    </span>
                  )
                })}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
