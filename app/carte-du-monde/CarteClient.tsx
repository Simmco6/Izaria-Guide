"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const nations = [
  {
    id: "mitsurin",
    name: "Mitsurin",
    href: "/nations/mitsurin",
    color: "#27AE60",
    points: [
      [17.2,17.2],[12.2,26.1],[15.1,34.1],[22.0,45.6],[18.4,55.8],
      [22.8,57.6],[31.3,57.7],[42.5,62.8],[50.2,64.9],[53.5,61.1],
      [48.0,56.5],[56.3,50.9],[57.8,44.0],[57.1,39.1],[52.5,34.9],
      [43.4,26.0],[32.1,16.7],
    ],
  },
  {
    id: "dakurodo",
    name: "Dakurodo",
    href: "/nations/dakurodo",
    color: "#34253a",
    points: [
      [56.2,33.6],[63.1,29.2],[62.3,24.4],[67.9,18.7],[75.1,17.5],
      [85.3,20.8],[97.5,20.8],[99.8,20.5],[99.8,52.5],[87.3,53.2],
      [80.7,47.9],[78.1,47.1],[73.8,44.5],[71.8,45.6],[72.3,49.4],
      [70.0,51.5],[77.1,53.2],[78.9,56.3],[74.8,60.8],[72.0,64.2],
      [53.9,61.1],[52.1,56.1],[58.8,49.2],[59.5,39.7],
    ],
  },
  {
    id: "tengoku",
    name: "Tengoku",
    href: "/nations/tengoku",
    color: "#d9d9da",
    points: [
      [73.0,36.9],[73.6,41.0],[76.9,41.7],[82.2,44.3],[87.8,45.0],
      [91.9,41.0],[92.7,36.4],[88.6,33.3],[84.8,34.8],[82.5,35.6],[80.2,35.6],
    ],
  },
  {
    id: "zone-ombre",
    name: "Zone d'Ombre",
    href: "/nations/zone-ombre",
    color: "#6b7280",
    points: [
      [31.8,56.9],[25.8,62.3],[19.1,64.3],[18.8,73.2],[20.1,81.0],
      [22.8,80.1],[24.7,78.2],[35.8,77.5],[48.9,79.0],[54.1,85.5],
      [58.1,93.2],[68.0,91.1],[75.2,86.7],[78.3,83.8],[82.9,82.5],
      [82.7,75.5],[80.7,74.9],[80.2,70.8],[76.4,68.6],[72.4,65.0],
      [54.4,62.4],[52.2,64.3],[46.7,64.4],[44.7,63.3],[42.6,63.6],
    ],
  },
  {
    id: "alakasham",
    name: "Alakasham",
    href: "/nations/alakasham",
    color: "#FFB84A",
    points: [
      [20.1,80.3],[23.9,89.0],[27.6,87.5],[39.6,89.7],[43.6,92.7],
      [51.9,93.6],[56.1,93.3],[56.6,89.4],[48.8,78.6],[32.6,77.1],
    ],
  },
  {
    id: "thogdur",
    name: "Thogdur",
    href: "/nations/thogdur",
    color: "#44a053",
    points: [
      [14.1,87.7],[23.3,89.2],[27.6,88.0],[39.6,90.1],[43.2,92.7],
      [42.2,97.9],[38.4,96.6],[36.8,97.4],[34.3,100.4],[31.5,101.6],
      [27.9,101.5],[22.5,103.5],[21.3,103.8],[17.9,100.7],[15.9,102.2],[12.8,99.6],
    ],
  },
  {
    id: "hokkaido",
    name: "Hokkaido",
    href: "/nations/hokkaido",
    color: "#9430ad",
    points: [
      [24.4,112.4],[21.5,120.5],[16.0,120.8],[3.7,113.0],[0.6,106.4],
      [0.6,91.6],[1.8,86.5],[9.6,84.8],[14.0,87.5],[13.4,89.9],
      [12.6,99.4],[14.6,105.7],[18.7,108.5],
    ],
  },
  {
    id: "ipulos-tacderen",
    name: "Ipulos Tacderen",
    href: "/nations/ipulos-tacderen",
    color: "#74716d",
    points: [
      [32.0,108.7],[35.5,110.9],[39.1,110.9],[39.6,113.0],[42.4,115.7],
      [39.4,117.8],[44.7,119.0],[47.5,122.3],[49.6,125.0],[53.2,129.2],
      [52.4,131.3],[49.3,132.1],[48.0,134.4],[46.8,136.5],[44.5,138.5],
      [40.1,135.2],[37.6,133.4],[38.6,131.6],[35.3,128.2],[32.0,128.4],
      [27.6,126.5],[22.5,125.7],[20.5,122.5],[22.3,119.9],[23.6,117.5],
      [24.8,112.7],[26.6,109.1],[31.2,106.8],
    ],
  },
  {
    id: "arcabios",
    name: "Arcabios",
    href: "/nations/arcabios",
    color: "#9e2828",
    points: [
      [42.6,115.4],[55.3,115.4],[61.3,119.5],[67.1,119.8],[70.8,124.7],
      [67.1,129.6],[57.3,135.2],[47.2,139.6],[45.5,139.3],[47.5,135.2],
      [53.8,131.2],[54.4,127.8],
    ],
  },
  {
    id: "asdorath",
    name: "Asdorath",
    href: "/nations/asdorath",
    color: "#ec9615",
    points: [
      [76.9,92.7],[56.2,93.6],[52.9,96.8],[53.4,102.9],[55.2,107.5],
      [56.7,111.5],[65.4,114.8],[73.6,121.0],[80.4,123.3],[86.1,116.2],
      [89.1,110.7],[88.4,107.7],[92.2,105.7],[90.7,101.1],[85.3,96.5],[79.4,96.5],
    ],
  },
  {
    id: "solarsen",
    name: "Solarsen",
    href: "/nations/solarsen",
    color: "#4AC8FF",
    points: [
      [83.5,121.1],[86.1,116.5],[95.0,119.9],[92.7,126.0],[94.1,130.0],
      [86.7,136.9],[82.9,135.7],[80.6,131.1],[82.0,127.1],[80.6,123.3],
    ],
  },
]

function pointsToSvgPolygon(points: number[][]) {
  return points.map(([x, y]) => `${x},${y}`).join(" ")
}

export default function CarteClient() {
  const [hoveredNation, setHoveredNation] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const hoveredData = nations.find((n) => n.id === hoveredNation)

  return (
    <>
      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          style={{ background: "rgba(10,6,2,0.92)", backdropFilter: "blur(6px)", animation: "fadeIn 0.2s ease" }}
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="fixed top-5 right-6 w-10 h-10 rounded-full flex items-center justify-center text-lg z-[1001] transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#f5e6c8" }}
            onClick={() => setLightboxOpen(false)}
            aria-label="Fermer"
          >
            ✕
          </button>
          <div
            className="max-h-[90vh] overflow-y-auto rounded-lg"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/new-carte.png"
              alt="Carte d'Izaria agrandie"
              width={900}
              height={1350}
              className="block rounded-lg"
              style={{ maxWidth: "min(90vw, 700px)", height: "auto" }}
              priority
            />
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative min-h-[45vh] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #0D1B2A 0%, #1a2a3a 40%, #0D1B2A 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse at 30% 60%, rgba(201,151,74,0.3) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(139,111,71,0.2) 0%, transparent 45%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EFF4FB] to-transparent" />
        <div className="relative z-10 text-center px-4 pt-24 pb-16">
          <p className="eyebrow text-[#C9974A] mb-4">Monde d&apos;Izaria</p>
          <h1
            className="font-cinzel font-bold text-[#F0EDE8] mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
          >
            Carte du Monde
          </h1>
          <p className="font-eb-garamond italic text-[#F0EDE8]/60 text-lg max-w-xl mx-auto">
            Izaria s&apos;étend sur 2&apos;200 km d&apos;est en ouest et 5&apos;000 km du nord au sud. Survolez les nations pour les explorer.
          </p>
        </div>
      </section>

      <main className="bg-[#EFF4FB]">

        {/* ── Section cartes ── */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">

            {/* Avant / Après */}
            <div className="reveal grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center mb-16">

              {/* Ancienne carte */}
              <div className="flex flex-col items-center gap-3">
                <span
                  className="font-jost text-xs font-medium px-4 py-1.5 rounded-full border uppercase tracking-widest"
                  style={{ borderColor: "rgba(201,151,74,0.4)", color: "#C9974A", background: "rgba(201,151,74,0.08)" }}
                >
                  Ancienne carte du monde
                </span>
                <div
                  className="rounded-lg overflow-hidden transition-shadow duration-200"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 0 0 1px rgba(201,151,74,0.2)" }}
                >
                  <Image
                    src="/old-carte.png"
                    alt="Ancienne carte du monde d'Izaria"
                    width={380}
                    height={530}
                    className="block w-full h-auto"
                    style={{ maxWidth: 340 }}
                  />
                </div>
              </div>

              {/* Flèche */}
              <div className="flex justify-center md:block w-16 mx-auto" aria-hidden="true">
                <svg viewBox="0 0 80 40" className="w-full h-auto md:block hidden" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}>
                  <defs>
                    <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b6914" />
                      <stop offset="100%" stopColor="#C9974A" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,12 52,12 52,2 78,20 52,38 52,28 0,28" fill="url(#arrowGrad)" />
                </svg>
                {/* Mobile : flèche bas */}
                <svg viewBox="0 0 40 80" className="w-10 h-auto md:hidden" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}>
                  <defs>
                    <linearGradient id="arrowGradV" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8b6914" />
                      <stop offset="100%" stopColor="#C9974A" />
                    </linearGradient>
                  </defs>
                  <polygon points="12,0 12,52 2,52 20,78 38,52 28,52 28,0" fill="url(#arrowGradV)" />
                </svg>
              </div>

              {/* Nouvelle carte interactive */}
              <div className="flex flex-col items-center gap-3">
                <span
                  className="font-jost text-xs font-medium px-4 py-1.5 rounded-full border uppercase tracking-widest"
                  style={{ borderColor: "rgba(201,151,74,0.4)", color: "#C9974A", background: "rgba(201,151,74,0.08)" }}
                >
                  Nouvelle carte du monde
                </span>
                <div
                  className="relative rounded-lg overflow-hidden transition-shadow duration-200"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 0 0 1px rgba(201,151,74,0.2)", maxWidth: 340 }}
                >
                  <Image
                    src="/new-carte.png"
                    alt="Nouvelle carte du monde d'Izaria"
                    width={380}
                    height={570}
                    className="block w-full h-auto cursor-zoom-in"
                    onClick={() => setLightboxOpen(true)}
                  />

                  {/* SVG overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 150"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Carte interactive des nations d'Izaria"
                    style={{ pointerEvents: "all" }}
                  >
                    {nations.map((nation) => (
                      <Link key={nation.id} href={nation.href}>
                        <polygon
                          points={pointsToSvgPolygon(nation.points)}
                          fill={nation.color}
                          fillOpacity={hoveredNation === nation.id ? 0.4 : 0}
                          stroke={nation.color}
                          strokeWidth={hoveredNation === nation.id ? 0.35 : 0.12}
                          strokeOpacity={hoveredNation === nation.id ? 0.9 : 0.25}
                          onMouseEnter={() => setHoveredNation(nation.id)}
                          onMouseLeave={() => setHoveredNation(null)}
                          style={{ cursor: "pointer", transition: "fill-opacity 0.18s, stroke-width 0.18s" }}
                          aria-label={`Aller à la page de ${nation.name}`}
                        />
                      </Link>
                    ))}
                  </svg>

                  {/* Tooltip */}
                  {hoveredNation && hoveredData && (
                    <div
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md px-3 py-1.5 text-center pointer-events-none z-10 whitespace-nowrap"
                      style={{
                        background: "rgba(13,27,42,0.88)",
                        border: `1px solid ${hoveredData.color}60`,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span className="block font-cinzel font-bold text-sm" style={{ color: hoveredData.color }}>
                        {hoveredData.name}
                      </span>
                      <span className="block font-jost text-[0.65rem] text-[#c9b99a] mt-0.5">
                        Cliquer pour explorer →
                      </span>
                    </div>
                  )}

                  {/* Hint zoom */}
                  <div
                    className="absolute top-2 right-2 flex items-center gap-1 rounded px-2 py-1"
                    style={{
                      background: "rgba(13,27,42,0.7)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c9b99a" strokeWidth="2" style={{ pointerEvents: "none" }}>
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                    </svg>
                    <span className="font-jost text-[0.6rem] text-[#c9b99a]">
                      <a href="https://drive.google.com/file/d/1nzV2dsEcCJcL7k-GJe98RwAcH-AQu2pL/view" rel="noopener noreferrer">Agrandir</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Légende / description ── */}
            <div className="reveal reveal-delay-1 bg-white rounded-lg border border-[#D4C5A9]/50 p-8 mb-10" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
                <div>
                  <p className="eyebrow text-[#C9974A] mb-3">À propos du monde</p>
                  <p className="font-eb-garamond italic text-[#4A5568] text-lg leading-relaxed mb-3">
                    Izaria est une planète qui abrite de nombreuses nations dont certaines que nous connaissons.
                    La taille du monde connu est d&apos;environ 2&apos;200 km  d&apos;est en ouest
                    et d&apos;environ 5&apos;000 km du nord au sud.
                  </p>
                  <p className="font-jost text-sm text-[#4A5568]/70">
                    Survolez les nations sur la nouvelle carte pour les identifier. Cliquez sur une nation pour accéder à sa page, ou cliquez sur la carte pour l&apos;agrandir.
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Nations connues", value: "10" },
                    { label: "Étendue est-ouest", value: "2 200 km" },
                    { label: "Étendue nord-sud", value: "5 000 km" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between px-4 py-2.5 rounded-md"
                      style={{ background: "#EFF4FB", border: "1px solid #D4C5A9" }}
                    >
                      <span className="font-jost text-sm text-[#4A5568]">{stat.label}</span>
                      <span className="font-cinzel font-bold text-[#C9974A] text-sm">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Grille nations ── */}
            <div className="reveal reveal-delay-2">
              <p className="eyebrow text-[#C9974A] mb-5">Explorer les nations</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {nations.map((nation, i) => (
                  <Link
                    key={nation.id}
                    href={nation.href}
                    className={`reveal reveal-delay-${Math.min((i % 4) + 1, 6)} group relative bg-white rounded-lg px-4 py-3 border border-[#D4C5A9]/50 hover:border-transparent hover:shadow-md transition-all duration-200 flex items-center gap-2.5 no-underline`}
                  >
                    <div
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
                      style={{ background: nation.color }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: nation.color }}
                    />
                    <span className="font-jost text-sm font-medium text-[#1A1A2E] group-hover:text-[#C9974A] transition-colors">
                      {nation.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  )
}
