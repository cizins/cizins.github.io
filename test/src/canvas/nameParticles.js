export class ParticleSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.particles = []
    this.pointer = { x: 0, y: 0, vx: 0, vy: 0, active: false }
    this.scrollProgress = 0
    this.resizeObserver = null
    this.frameId = null
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.options = {
      count: 120,
      interactionRadius: 120,
      formationProgress: 0.5,
      ...options,
    }
    this.init()
  }

  init() {
    this.resize()
    this.createParticles()
    this.bindPointer()
    this.bindResize()
    this.startLoop()
  }

  resize() {
    const dpr = this.dpr
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width * dpr
    this.canvas.height = rect.height * dpr
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.width = rect.width
    this.height = rect.height
  }

  bindResize() {
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.canvas.parentElement || this.canvas)
  }

  bindPointer() {
    this.canvas.addEventListener('pointermove', (e) => {
      const rect = this.canvas.getBoundingClientRect()
      const dx = e.clientX - rect.left - rect.width / 2
      const dy = e.clientY - rect.top - rect.height / 2
      this.pointer.vx = dx - this.pointer.x
      this.pointer.vy = dy - this.pointer.y
      this.pointer.x = dx
      this.pointer.y = dy
      this.pointer.active = true
    })
    this.canvas.addEventListener('pointerleave', () => { this.pointer.active = false })
  }

  createParticles() {
    this.particles = []
    for (let i = 0; i < this.options.count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        targetX: Math.random() * this.width,
        targetY: Math.random() * this.height,
        baseX: Math.random() * this.width,
        baseY: Math.random() * this.height,
      })
    }
  }

  updateTargets() {
    // Approximate text formation by clustering near center with variation
    const cx = this.width / 2
    const cy = this.height / 2
    const progress = this.scrollProgress
    const spread = (1 - progress) * (this.width * 0.4)
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i]
      const angle = (i / this.particles.length) * Math.PI * 2
      const r = progress * (this.width * 0.15) + (1 - progress) * spread
      // Add noise to target so it looks like forming letters roughly
      p.targetX = cx + Math.cos(angle) * r + (Math.random() - 0.5) * 30
      p.targetY = cy + Math.sin(angle) * r + (Math.random() - 0.5) * 30
    }
  }

  update() {
    const progress = this.scrollProgress
    this.updateTargets()
    for (const p of this.particles) {
      // Attraction to target scaled by progress
      const ax = (p.targetX - p.x) * progress * 0.0008
      const ay = (p.targetY - p.y) * progress * 0.0008
      p.vx += ax + (Math.random() - 0.5) * 0.12
      p.vy += ay + (Math.random() - 0.5) * 0.12

      // Pointer repulsion
      if (this.pointer.active) {
        const dx = p.x - this.pointer.x
        const dy = p.y - this.pointer.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < this.options.interactionRadius && dist > 0) {
          const force = (this.options.interactionRadius - dist) / this.options.interactionRadius
          p.vx += (dx / dist) * force * 2
          p.vy += (dy / dist) * force * 2
        }
      }

      // Dampening
      p.vx *= 0.96
      p.vy *= 0.96
      p.x += p.vx
      p.y += p.vy

      // Wrap
      if (p.x < 0) p.x = this.width
      if (p.x > this.width) p.x = 0
      if (p.y < 0) p.y = this.height
      if (p.y > this.height) p.y = 0
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = '#F5F3EE'
    for (const p of this.particles) {
      const alpha = p.opacity * (0.4 + this.scrollProgress * 0.6)
      this.ctx.globalAlpha = alpha
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      this.ctx.fill()
    }
    this.ctx.globalAlpha = 1
  }

  loop = () => {
    this.update()
    this.draw()
    this.frameId = requestAnimationFrame(this.loop)
  }

  startLoop() {
    if (this.frameId) cancelAnimationFrame(this.frameId)
    this.loop()
  }

  setScrollProgress(v) {
    this.scrollProgress = Math.min(1, Math.max(0, v))
  }

  destroy() {
    if (this.frameId) cancelAnimationFrame(this.frameId)
    if (this.resizeObserver) this.resizeObserver.disconnect()
    this.canvas.removeEventListener('pointermove', () => {})
  }
}
