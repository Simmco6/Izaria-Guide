"use client"

import { useEffect, useRef, useCallback } from "react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const mousePosRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const animFrameRef = useRef<number>(0)

  const drawArrow = useCallback(() => {
    const canvas = canvasRef.current
    const target = ctaRef.current
    if (!canvas || !target) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const mouse = mousePosRef.current
    if (mouse.x === null || mouse.y === null) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const rect = target.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const a = Math.atan2(cy - mouse.y, cx - mouse.x)
    const x1 = cx - Math.cos(a) * (rect.width / 2 + 12)
    const y1 = cy - Math.sin(a) * (rect.height / 2 + 12)

    const midX = (mouse.x + x1) / 2
    const midY = (mouse.y + y1) / 2
    const offset = Math.min(200, Math.hypot(x1 - mouse.x, y1 - mouse.y) * 0.5)
    const t = Math.max(-1, Math.min(1, (mouse.y - y1) / 200))
    const controlX = midX
    const controlY = midY + offset * t

    const r = Math.sqrt((x1 - mouse.x) ** 2 + (y1 - mouse.y) ** 2)
    const opacity = Math.min(0.7, (r - Math.max(rect.width, rect.height) / 2) / 400)
    if (opacity <= 0) return

    ctx.strokeStyle = `rgba(201, 151, 74, ${opacity})`
    ctx.lineWidth = 1.5

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(mouse.x, mouse.y)
    ctx.quadraticCurveTo(controlX, controlY, x1, y1)
    ctx.setLineDash([8, 4])
    ctx.stroke()
    ctx.restore()

    const angle = Math.atan2(y1 - controlY, x1 - controlX)
    const headLength = 10
    ctx.beginPath()
    ctx.setLineDash([])
    ctx.strokeStyle = `rgba(201, 151, 74, ${opacity})`
    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 - headLength * Math.cos(angle - Math.PI / 6), y1 - headLength * Math.sin(angle - Math.PI / 6))
    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 - headLength * Math.cos(angle + Math.PI / 6), y1 - headLength * Math.sin(angle + Math.PI / 6))
    ctx.stroke()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseLeave = () => {
      mousePosRef.current = { x: null, y: null }
      const ctx = canvas.getContext("2d")
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }

    window.addEventListener("resize", resize, { passive: true })
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("mouseleave", onMouseLeave)
    resize()

    const loop = () => {
      drawArrow()
      animFrameRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [drawArrow])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(160deg, #0D1B2A 0%, #1a2a3a 30%, #0D2235 60%, #0D1B2A 100%)`,
        }}
      />

      {/* Atmospheric layers */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(139,111,71,0.3) 0%, transparent 50%),
                            radial-gradient(ellipse at 80% 20%, rgba(201,151,74,0.2) 0%, transparent 40%),
                            radial-gradient(ellipse at 60% 80%, rgba(13,27,42,0.8) 0%, transparent 60%)`,
        }}
      />

      {/* Stars / grain texture */}
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#EFF4FB] to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="hero-eyebrow eyebrow text-[#C9974A] mb-6 tracking-[0.2em]">
          RP Médiéval Fantasy · Francophone · Discord
        </div>

        {/* Headline */}
        <h1 className="hero-title font-cinzel font-bold text-hero text-[#F0EDE8] mb-6 leading-tight">
          Bienvenue sur{" "}
          <span className="text-gold-gradient">Izaria</span>
        </h1>

        {/* Subline */}
        <p className="hero-sub font-jost font-light text-[#F0EDE8]/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Un univers vivant, des nations en guerre,
          <br className="hidden sm:block" />
          des personnages qui t&apos;attendent.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-4 items-center">
          <a
            ref={ctaRef}
            href="/creation-dune-fiche"
            className="relative font-jost font-medium px-8 py-3.5 rounded bg-[#C9974A] text-white hover:bg-[#B8853A] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(201,151,74,0.4)] text-sm tracking-wide"
          >
            Créer sa fiche
          </a>
          <a
            href="/histoire"
            className="font-jost font-medium px-8 py-3.5 rounded border border-white/40 text-white hover:bg-white/10 transition-all duration-200 text-sm tracking-wide"
          >
            Explorer l&apos;univers
          </a>
        </div>

        {/* Year badge */}
        <div className="hero-ctas mt-12 font-eb-garamond italic text-[#F0EDE8]/40 text-sm">
          An 9527 - Créé en 2020
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(201,151,74,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      {/* Interactive canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-20"
      />
    </section>
  )
}
