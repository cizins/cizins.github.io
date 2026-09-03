import { useRef, useEffect, useState } from 'react'
import { SequenceRenderer } from '../../canvas/sequenceRenderer.js'

export default function ProjectSequence({ frameCount = 60, frameUrls = [] }) {
  const canvasRef = useRef(null)
  const sysRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const sys = new SequenceRenderer(canvas, frameCount)
    if (frameUrls.length > 0) sys.loadFrames(frameUrls)
    sysRef.current = sys

    const onScroll = () => {
      const rect = canvas.getBoundingClientRect()
      const h = window.innerHeight
      const p = Math.max(0, Math.min(1, (h - rect.top) / (h + rect.height)))
      sys.setProgress(p)
      sys.render()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Preload background attempt
    const preload = () => {
      if (frameUrls.length > 0 && sys.loaded < frameUrls.length) {
        // Already loaded via loadFrames; no extra loop needed
      }
    }
    preload()

    return () => {
      window.removeEventListener('scroll', onScroll)
      sys.destroy()
    }
  }, [frameCount, frameUrls])

  return (
    <div className="relative w-full aspect-[16/10] bg-[#111111] overflow-hidden" aria-label="Sequence animation">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
