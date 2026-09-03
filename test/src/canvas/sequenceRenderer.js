export class SequenceRenderer {
  constructor(canvas, frameCount = 60) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.frameCount = frameCount
    this.frames = []
    this.loaded = 0
    this.progress = 0
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(canvas.parentElement || canvas)
    this.resize()
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width * this.dpr
    this.canvas.height = rect.height * this.dpr
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.w = rect.width
    this.h = rect.height
  }

  loadFrames(urls) {
    this.frames = urls.map(src => new Image())
    this.frames.forEach((img, i) => {
      img.onload = () => { this.loaded++ }
      img.onerror = () => { this.loaded++ }
      img.src = src
    })
  }

  setProgress(v) {
    this.progress = Math.min(1, Math.max(0, v))
  }

  render() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    const idx = Math.floor(this.progress * (this.frameCount - 1))
    const img = this.frames[idx]
    if (img && img.complete && img.naturalWidth > 0) {
      this.ctx.drawImage(img, 0, 0, this.w, this.h)
    } else {
      // Fallback / loading experience
      this.ctx.fillStyle = '#111111'
      this.ctx.fillRect(0, 0, this.w, this.h)
      this.ctx.fillStyle = '#F5F3EE'
      this.ctx.font = '14px "Noto Sans TC", "Inter", sans-serif'
      this.ctx.textAlign = 'center'
      this.ctx.fillText(`Sequence Frame ${(idx + 1).toString().padStart(3, '0')} / ${this.frameCount}`, this.w / 2, this.h / 2)
    }
  }

  destroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect()
  }
}
