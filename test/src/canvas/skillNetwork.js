/**
 * SkillNetwork: Ability Cosmos Canvas System
 * 
 * Aesthetic:
 * - Deep celestial space with quiet, subdued depth
 * - Organic crystalline translucent Core with embedded "JX"
 * - Constellation-like skill star network naturally expanded to eliminate empty sides
 * - Extremely delicate constellation lines & faint orbital arcs
 * - Low-density cosmic micro-particles with ultra-gentle mouse perturbation
 * - Zero label overlap across desktop, tablet, and mobile
 * - Respects prefers-reduced-motion
 */

export class SkillNetwork {
  constructor(canvas, nodes = [], options = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.options = options
    this.reduced = options.reduced || false
    this.onSelect = options.onSelect || null
    this.onHover = options.onHover || null
    this.activeId = options.activeId || null
    this.hoverId = null

    this.nodesData = nodes
    this.nodes = []
    this.pointer = { x: -1000, y: -1000, isNearCore: false }

    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.frameId = null
    this.w = 0
    this.h = 0

    // Layers
    this.backgroundStars = []
    this.cosmicDust = []
    this.orbits = []
    this.coreVertices = []

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(canvas.parentElement || canvas)
    this.resize()

    this.bindEvents()
    this.startLoop()
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect()
    this.w = rect.width
    this.h = rect.height
    this.canvas.width = Math.round(rect.width * this.dpr)
    this.canvas.height = Math.round(rect.height * this.dpr)
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    this.initBackgroundStars()
    this.initCosmicDust()
    this.initOrbits()
    this.initCoreStructure()
    this.layoutNodes()
  }

  initBackgroundStars() {
    // Seeded/deterministic star field to avoid jumping on resize
    const count = this.w < 640 ? 32 : 54
    const stars = []
    let seed = 1337
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    for (let i = 0; i < count; i++) {
      stars.push({
        xRatio: pseudoRandom(),
        yRatio: pseudoRandom(),
        r: 0.5 + pseudoRandom() * 0.8,
        baseAlpha: 0.05 + pseudoRandom() * 0.18,
        breathSpeed: 0.0003 + pseudoRandom() * 0.0005,
        phase: pseudoRandom() * Math.PI * 2,
        color: pseudoRandom() > 0.88 ? '#8FA8FF' : '#F5F3EE',
      })
    }
    this.backgroundStars = stars
  }

  initCosmicDust() {
    // Low-density floating dust surrounding the core and network
    const count = this.w < 640 ? 12 : 22
    const dust = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const distRatio = 0.12 + Math.random() * 0.38
      const colors = ['#F5F3EE', '#A5A5A5', '#8FA8FF', '#D8D8D8']
      dust.push({
        angle,
        distRatio,
        r: 0.7 + Math.random() * 0.7,
        baseAlpha: 0.08 + Math.random() * 0.2,
        driftRadius: 3 + Math.random() * 4,
        driftSpeed: 0.00035 + Math.random() * 0.0005,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        deflectX: 0,
        deflectY: 0,
      })
    }
    this.cosmicDust = dust
  }

  initOrbits() {
    const minDim = Math.min(this.w, this.h)
    this.orbits = [
      {
        rx: minDim * 0.22,
        ry: minDim * 0.16,
        tilt: -0.28,
        speed: 0.00003,
        stroke: 'rgba(245, 243, 238, 0.04)',
        dash: [],
      },
      {
        rx: minDim * 0.42,
        ry: minDim * 0.26,
        tilt: 0.42,
        speed: -0.000025,
        stroke: 'rgba(143, 168, 255, 0.05)',
        dash: [],
      },
      {
        rx: minDim * 0.64,
        ry: minDim * 0.38,
        tilt: -0.16,
        speed: 0.000015,
        stroke: 'rgba(245, 243, 238, 0.035)',
        dash: [2, 12],
      },
    ]
  }

  initCoreStructure() {
    // 8 asymmetrical crystalline vertices
    const baseAngles = [0.08, 0.76, 1.54, 2.38, 3.12, 3.92, 4.68, 5.52]
    const radiusOffsets = [1.08, 0.92, 1.06, 0.94, 1.12, 0.88, 1.05, 0.95]
    this.coreVertices = baseAngles.map((ang, i) => ({
      angle: ang,
      radiusRatio: radiusOffsets[i],
      facetPhase: (i * Math.PI) / 4,
    }))
  }

  layoutNodes() {
    const isMobile = this.w < 640
    const isTablet = this.w >= 640 && this.w < 1024
    const cx = this.w / 2
    const cy = this.h / 2

    // Coordinate mapping designed for organic expansive constellation & zero label collision
    const layoutConfig = {
      javascript: {
        anchor: isMobile
          ? { x: cx - this.w * 0.32, y: cy - this.h * 0.28 }
          : isTablet
          ? { x: cx - this.w * 0.32, y: cy - this.h * 0.24 }
          : { x: cx - this.w * 0.30, y: cy - this.h * 0.22 },
        labelAlign: isMobile ? 'center' : 'right',
        labelOffset: isMobile ? { x: 0, y: -16 } : { x: -16, y: 3 },
        isPrimary: true,
      },
      react: {
        anchor: isMobile
          ? { x: cx - this.w * 0.32, y: cy + this.h * 0.22 }
          : isTablet
          ? { x: cx - this.w * 0.35, y: cy + this.h * 0.20 }
          : { x: cx - this.w * 0.34, y: cy + this.h * 0.18 },
        labelAlign: isMobile ? 'center' : 'right',
        labelOffset: isMobile ? { x: 0, y: 18 } : { x: -16, y: 3 },
        isPrimary: true,
      },
      canvas: {
        anchor: isMobile
          ? { x: cx + this.w * 0.32, y: cy - this.h * 0.28 }
          : isTablet
          ? { x: cx + this.w * 0.32, y: cy - this.h * 0.24 }
          : { x: cx + this.w * 0.28, y: cy - this.h * 0.24 },
        labelAlign: isMobile ? 'center' : 'left',
        labelOffset: isMobile ? { x: 0, y: -16 } : { x: 16, y: 3 },
        isPrimary: true,
      },
      animation: {
        anchor: isMobile
          ? { x: cx + this.w * 0.32, y: cy + this.h * 0.22 }
          : isTablet
          ? { x: cx + this.w * 0.34, y: cy + this.h * 0.18 }
          : { x: cx + this.w * 0.35, y: cy + this.h * 0.16 },
        labelAlign: isMobile ? 'center' : 'left',
        labelOffset: isMobile ? { x: 0, y: 18 } : { x: 16, y: 3 },
        isPrimary: true,
      },
      interaction: {
        anchor: isMobile
          ? { x: cx, y: cy + this.h * 0.38 }
          : isTablet
          ? { x: cx + this.w * 0.05, y: cy + this.h * 0.28 }
          : { x: cx + this.w * 0.06, y: cy + this.h * 0.28 },
        labelAlign: 'center',
        labelOffset: { x: 0, y: 18 },
        isPrimary: false,
      },
    }

    this.nodes = this.nodesData.map((node, i) => {
      const cfg = layoutConfig[node.id] || {
        anchor: {
          x: cx + Math.cos((i / this.nodesData.length) * Math.PI * 2) * (this.w * 0.32),
          y: cy + Math.sin((i / this.nodesData.length) * Math.PI * 2) * (this.h * 0.26),
        },
        labelAlign: 'center',
        labelOffset: { x: 0, y: 16 },
        isPrimary: false,
      }

      return {
        ...node,
        baseX: cfg.anchor.x,
        baseY: cfg.anchor.y,
        x: cfg.anchor.x,
        y: cfg.anchor.y,
        labelAlign: cfg.labelAlign,
        labelOffset: cfg.labelOffset,
        isPrimary: cfg.isPrimary,
        size: cfg.isPrimary ? 3.4 : 2.7,
        swayPhaseX: (i * 1.8) % (Math.PI * 2),
        swayPhaseY: (i * 2.3 + 1.2) % (Math.PI * 2),
        hover: false,
        active: node.id === this.activeId,
      }
    })
  }

  bindEvents() {
    this.handlePointerMove = (e) => {
      const rect = this.canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      this.pointer.x = px
      this.pointer.y = py

      const cx = this.w / 2
      const cy = this.h / 2
      const coreR = Math.min(52, Math.max(38, this.w * 0.045))
      this.pointer.isNearCore = Math.hypot(px - cx, py - cy) < coreR * 1.5

      // Check node hover
      let foundHover = null
      for (const node of this.nodes) {
        const d = Math.hypot(px - node.x, py - node.y)
        if (d < 28) {
          foundHover = node.id
          break
        }
      }

      if (this.hoverId !== foundHover) {
        this.hoverId = foundHover
        if (this.onHover) this.onHover(foundHover)
        this.requestStaticRender()
      }
    }

    this.handlePointerLeave = () => {
      this.pointer.x = -1000
      this.pointer.y = -1000
      this.pointer.isNearCore = false
      if (this.hoverId !== null) {
        this.hoverId = null
        if (this.onHover) this.onHover(null)
        this.requestStaticRender()
      }
    }

    this.handleClick = (e) => {
      const rect = this.canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top

      let clickedNode = null
      for (const node of this.nodes) {
        const d = Math.hypot(px - node.x, py - node.y)
        if (d < 30) {
          clickedNode = node
          break
        }
      }

      if (clickedNode) {
        this.activeId = this.activeId === clickedNode.id ? null : clickedNode.id
      } else {
        // If clicked outside, deselect
        this.activeId = null
      }

      if (this.onSelect) this.onSelect(this.activeId)
      this.requestStaticRender()
    }

    this.canvas.addEventListener('pointermove', this.handlePointerMove)
    this.canvas.addEventListener('pointerleave', this.handlePointerLeave)
    this.canvas.addEventListener('click', this.handleClick)
  }

  setActive(id) {
    this.activeId = id
    this.requestStaticRender()
  }

  setReduced(val) {
    this.reduced = val
  }

  update(now) {
    const cx = this.w / 2
    const cy = this.h / 2

    // Update nodes gentle sway & magnetic micro-reaction
    for (const node of this.nodes) {
      const isHovered = this.hoverId === node.id
      const isSelected = this.activeId === node.id
      node.hover = isHovered
      node.active = isSelected

      if (this.reduced) {
        node.x = node.baseX
        node.y = node.baseY
      } else {
        // Very slow organic sway (~14s period)
        const swayX = Math.sin(now * 0.00045 + node.swayPhaseX) * 3.5
        const swayY = Math.cos(now * 0.00055 + node.swayPhaseY) * 3.0

        // Delicate pointer micro-attraction (max 2.5px)
        let nudgeX = 0
        let nudgeY = 0
        if (this.pointer.x > 0) {
          const dx = this.pointer.x - node.baseX
          const dy = this.pointer.y - node.baseY
          const dist = Math.hypot(dx, dy)
          if (dist < 80 && dist > 1) {
            const pull = (1 - dist / 80) * 2.5
            nudgeX = (dx / dist) * pull
            nudgeY = (dy / dist) * pull
          }
        }

        node.x = node.baseX + swayX + nudgeX
        node.y = node.baseY + swayY + nudgeY
      }
    }

    // Update floating cosmic dust
    const minDim = Math.min(this.w, this.h)
    for (const p of this.cosmicDust) {
      const baseDist = p.distRatio * minDim
      const currentAngle = p.angle
      const baseX = cx + Math.cos(currentAngle) * baseDist
      const baseY = cy + Math.sin(currentAngle) * baseDist

      if (!this.reduced) {
        const drift = Math.sin(now * p.driftSpeed + p.phase) * p.driftRadius
        p.currentX = baseX + Math.cos(p.phase) * drift
        p.currentY = baseY + Math.sin(p.phase) * drift

        // Mouse deflection near Core or Dust (max 5px, soft ease)
        if (this.pointer.x > 0) {
          const dPointer = Math.hypot(p.currentX - this.pointer.x, p.currentY - this.pointer.y)
          if (dPointer < 100 && dPointer > 1) {
            const force = (1 - dPointer / 100) * 0.8
            p.deflectX += ((p.currentX - this.pointer.x) / dPointer) * force
            p.deflectY += ((p.currentY - this.pointer.y) / dPointer) * force
          }
        }
        p.deflectX *= 0.94
        p.deflectY *= 0.94
        p.currentX += p.deflectX
        p.currentY += p.deflectY
      } else {
        p.currentX = baseX
        p.currentY = baseY
      }
    }
  }

  draw(now) {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.w, this.h)

    const cx = this.w / 2
    const cy = this.h / 2
    const isMobile = this.w < 640

    // 1. Subtle Local Cosmic Vignette (Extremely restrained dark blue-black depth)
    const bgGrad = ctx.createRadialGradient(cx, cy, 15, cx, cy, Math.max(this.w, this.h) * 0.65)
    bgGrad.addColorStop(0, 'rgba(15, 20, 32, 0.36)')
    bgGrad.addColorStop(0.5, 'rgba(12, 14, 20, 0.12)')
    bgGrad.addColorStop(1, 'rgba(10, 10, 10, 0)')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, this.w, this.h)

    // 2. Distant Deep Space Micro-Stars
    for (const s of this.backgroundStars) {
      const alpha = this.reduced
        ? s.baseAlpha
        : s.baseAlpha + Math.sin(now * s.breathSpeed + s.phase) * (s.baseAlpha * 0.35)
      ctx.fillStyle = s.color
      ctx.globalAlpha = Math.max(0.02, Math.min(0.4, alpha))
      ctx.beginPath()
      ctx.arc(s.xRatio * this.w, s.yRatio * this.h, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // 3. Faint Orbital Structures (Restrained, low opacity)
    const activeOrbits = isMobile ? this.orbits.slice(0, 2) : this.orbits
    for (const orb of activeOrbits) {
      const rot = this.reduced ? orb.tilt : orb.tilt + now * orb.speed
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rot)
      ctx.strokeStyle = orb.stroke
      ctx.lineWidth = 0.5
      if (orb.dash.length > 0) ctx.setLineDash(orb.dash)
      ctx.beginPath()
      ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    // 4. Constellation Lines
    const hasFocus = this.hoverId !== null || this.activeId !== null
    const focusId = this.hoverId || this.activeId
    const focusNode = focusId ? this.nodes.find((n) => n.id === focusId) : null

    // Lines from Core to Primary Skills
    for (const node of this.nodes) {
      const isConnectedToFocus =
        focusId === node.id || (focusNode && focusNode.connections?.includes(node.id))
      const lineAlpha = hasFocus
        ? isConnectedToFocus
          ? 0.35
          : 0.03
        : 0.15

      ctx.strokeStyle = `rgba(143, 168, 255, ${lineAlpha})`
      ctx.lineWidth = hasFocus && isConnectedToFocus ? 0.8 : 0.5
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(node.x, node.y)
      ctx.stroke()
    }

    // Lines between interconnected skills
    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i]
      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j]
        const isConnected = a.connections?.includes(b.id) || b.connections?.includes(a.id)
        if (!isConnected) continue

        const isLineActive =
          focusId && (a.id === focusId || b.id === focusId)
        const lineAlpha = hasFocus
          ? isLineActive
            ? 0.45
            : 0.03
          : 0.11

        ctx.strokeStyle = isLineActive
          ? `rgba(143, 168, 255, ${lineAlpha})`
          : `rgba(245, 243, 238, ${lineAlpha})`
        ctx.lineWidth = isLineActive ? 0.9 : 0.5
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }

    // 5. Floating Cosmic Dust
    for (const p of this.cosmicDust) {
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.baseAlpha
      ctx.beginPath()
      ctx.arc(p.currentX, p.currentY, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // 6. Central Core (能力核心 — 不規則半透明結晶結構)
    this.drawCore(cx, cy, now)

    // 7. Constellation Skill Star Nodes & Crisp Typography
    for (const node of this.nodes) {
      this.drawSkillNode(node, hasFocus, focusId)
    }
  }

  drawCore(cx, cy, now) {
    const ctx = this.ctx
    const baseR = Math.min(52, Math.max(38, this.w * 0.045))
    const breath = this.reduced ? 0 : Math.sin(now * 0.0006) * 0.045

    // Ambient Ethereal Glow
    const haloGrad = ctx.createRadialGradient(cx, cy, baseR * 0.3, cx, cy, baseR * 2.2)
    haloGrad.addColorStop(0, 'rgba(143, 168, 255, 0.08)')
    haloGrad.addColorStop(0.6, 'rgba(143, 168, 255, 0.02)')
    haloGrad.addColorStop(1, 'rgba(143, 168, 255, 0)')
    ctx.fillStyle = haloGrad
    ctx.beginPath()
    ctx.arc(cx, cy, baseR * 2.2, 0, Math.PI * 2)
    ctx.fill()

    // Calculate dynamic irregular crystalline vertex positions
    const vertices = this.coreVertices.map((v) => {
      const dynamicOffset = this.reduced
        ? 0
        : Math.sin(now * 0.0005 + v.facetPhase) * 0.025
      const r = baseR * (v.radiusRatio + breath + dynamicOffset)
      return {
        x: cx + Math.cos(v.angle) * r,
        y: cy + Math.sin(v.angle) * r,
      }
    })

    // Outer crystalline body (translucent frosted glass)
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(vertices[0].x, vertices[0].y)
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y)
    }
    ctx.closePath()

    // Subtle glass body fill
    ctx.fillStyle = 'rgba(14, 18, 26, 0.72)'
    ctx.fill()

    // Subtle glass edge stroke
    ctx.strokeStyle = this.pointer.isNearCore
      ? 'rgba(143, 168, 255, 0.38)'
      : 'rgba(245, 243, 238, 0.16)'
    ctx.lineWidth = 0.8
    ctx.stroke()
    ctx.restore()

    // Internal facet cleavage lines (delicate geometric crystalline planes)
    ctx.save()
    ctx.strokeStyle = 'rgba(245, 243, 238, 0.07)'
    ctx.lineWidth = 0.5
    for (let i = 0; i < 4; i++) {
      const a = vertices[i]
      const b = vertices[i + 4]
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }

    // Refraction facet highlights (subtle translucent facet shades)
    ctx.fillStyle = 'rgba(143, 168, 255, 0.035)'
    ctx.beginPath()
    ctx.moveTo(vertices[0].x, vertices[0].y)
    ctx.lineTo(vertices[1].x, vertices[1].y)
    ctx.lineTo(cx, cy)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = 'rgba(245, 243, 238, 0.02)'
    ctx.beginPath()
    ctx.moveTo(vertices[4].x, vertices[4].y)
    ctx.lineTo(vertices[5].x, vertices[5].y)
    ctx.lineTo(cx, cy)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // Central identity mark ("JX") embedded calmly inside the core
    const textAlpha = this.reduced ? 0.82 : 0.78 + Math.sin(now * 0.0006) * 0.1
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '500 13px "Zen Old Mincho", "Inter", serif'
    ctx.fillStyle = '#F5F3EE'
    ctx.globalAlpha = textAlpha
    ctx.fillText('JX', cx, cy + 1)
    ctx.restore()
  }

  drawSkillNode(node, hasFocus, focusId) {
    const ctx = this.ctx
    const isTarget = node.id === focusId
    const isNeighbor =
      focusId &&
      (node.connections?.includes(focusId) ||
        this.nodes.find((n) => n.id === focusId)?.connections?.includes(node.id))

    // Determine visual opacity based on focus state
    let nodeAlpha = 1
    if (hasFocus) {
      if (isTarget) nodeAlpha = 1
      else if (isNeighbor) nodeAlpha = 0.85
      else nodeAlpha = 0.35
    }

    ctx.save()
    ctx.globalAlpha = nodeAlpha

    // 1. Star Halo
    if (isTarget) {
      ctx.fillStyle = 'rgba(143, 168, 255, 0.18)'
      ctx.beginPath()
      ctx.arc(node.x, node.y, 14, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(143, 168, 255, 0.5)'
      ctx.lineWidth = 0.8
      ctx.stroke()
    } else {
      ctx.strokeStyle = isNeighbor
        ? 'rgba(143, 168, 255, 0.25)'
        : 'rgba(245, 243, 238, 0.12)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.arc(node.x, node.y, 7, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 2. Star Core Dot
    ctx.fillStyle = isTarget || isNeighbor ? '#8FA8FF' : '#F5F3EE'
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
    ctx.fill()

    // 3. Subtle celestial star cross sparkle
    ctx.strokeStyle = isTarget ? 'rgba(143, 168, 255, 0.6)' : 'rgba(245, 243, 238, 0.3)'
    ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.moveTo(node.x - 3.5, node.y)
    ctx.lineTo(node.x + 3.5, node.y)
    ctx.moveTo(node.x, node.y - 3.5)
    ctx.lineTo(node.x, node.y + 3.5)
    ctx.stroke()

    // 4. Crisp Skill Typography (Strictly non-overlapping)
    const isMobile = this.w < 640
    ctx.textAlign = node.labelAlign
    ctx.textBaseline = 'middle'
    ctx.font = isMobile
      ? '500 11.5px "Zen Old Mincho", "Inter", sans-serif'
      : '500 13px "Zen Old Mincho", "Inter", sans-serif'

    ctx.fillStyle = isTarget ? '#FFFFFF' : isNeighbor ? '#F5F3EE' : '#F5F3EE'
    const labelX = node.x + node.labelOffset.x
    const labelY = node.y + node.labelOffset.y
    ctx.fillText(node.name || node.id, labelX, labelY)

    // Category / Status indicator when hovered or active
    if (isTarget) {
      const subText = node.statusZh
        ? `${node.statusZh} · ${node.category}`
        : (node.categoryZh || node.category || '')
      ctx.font = '400 9.5px "Inter", "Zen Old Mincho", sans-serif'
      ctx.fillStyle = '#8FA8FF'
      const subOffset = node.labelOffset.y > 0 ? 14 : -14
      ctx.fillText(subText, labelX, labelY + subOffset)
    }

    ctx.restore()
  }

  loop = () => {
    const now = Date.now()
    this.update(now)
    this.draw(now)
    this.frameId = requestAnimationFrame(this.loop)
  }

  startLoop() {
    if (this.frameId) cancelAnimationFrame(this.frameId)
    if (this.reduced) {
      this.update(0)
      this.draw(0)
      return
    }
    this.loop()
  }

  requestStaticRender() {
    if (this.reduced) {
      this.update(0)
      this.draw(0)
    }
  }

  destroy() {
    if (this.frameId) cancelAnimationFrame(this.frameId)
    if (this.resizeObserver) this.resizeObserver.disconnect()
    this.canvas.removeEventListener('pointermove', this.handlePointerMove)
    this.canvas.removeEventListener('pointerleave', this.handlePointerLeave)
    this.canvas.removeEventListener('click', this.handleClick)
  }
}
