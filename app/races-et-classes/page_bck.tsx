"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

// ─── Data ──────────────────────────────────────────────────────────────────────

const races = [
  {
    slug: "humain",
    name: "Humain",
    subtitle: "La race la plus répandue",
    description: "Polyvalents et ambitieux, les humains s'épanouissent dans toutes les nations d'Izaria. Leur durée de vie courte les pousse à accomplir de grandes choses en peu de temps.",
    lifespan: "80–100 ans",
    height: "2 m max",
    physique: "Aucune particularité",
    accent: "#C9974A",
    accentRgb: "201,151,74",
  },
  {
    slug: "demon2",
    name: "Démon",
    subtitle: "Êtres des abysses",
    description: "Créatures des profondeurs infernales, les démons arborent des cornes imposantes et une stature colossale. Leur nature démoniaque les rend redoutables au combat.",
    lifespan: "600 ans",
    height: "3 m max",
    physique: "Cornes",
    accent: "#C04040",
    accentRgb: "192,64,64",
  },
  {
    slug: "ange",
    name: "Ange",
    subtitle: "Messagers du divin",
    description: "Êtres célestes aux ailes d'une blancheur immaculée, les anges sont les gardiens de la lumière à Izaria. Leur présence inspire autant la dévotion que la crainte.",
    lifespan: "600 ans",
    height: "3 m max",
    physique: "Ailes blanches",
    accent: "#E8D4A0",
    accentRgb: "232,212,160",
  },
  {
    slug: "ange-dechu",
    name: "Ange Déchu",
    subtitle: "Lumière corrompue",
    description: "Anges bannis dont les ailes ont noirci sous le poids de leur chute. Tiraillés entre leur nature céleste et leur damnation, ils errent à la frontière du bien et du mal.",
    lifespan: "600 ans",
    height: "3 m max",
    physique: "Ailes noires",
    accent: "#8888AA",
    accentRgb: "136,136,170",
  },
  {
    slug: "therianthrope",
    name: "Thérianthrope",
    subtitle: "L'humain et la bête",
    description: "Mi-humains, mi-animaux, les thérianthropes portent les signes distinctifs de leur animal totem. En tant que race déjà hybride, ils ne peuvent être hybridés davantage.",
    lifespan: "80–100 ans",
    height: "2 m max",
    physique: "Signe distinctif animal",
    accent: "#A07850",
    accentRgb: "160,120,80",
  },
  {
    slug: "mort-vivant",
    name: "Mort-Vivant",
    subtitle: "Entre vie et trépas",
    description: "Revenus des royaumes de la mort, les morts-vivants existent sous deux formes : corps en décomposition ou squelette. Leur persistance au-delà de la mort reste un mystère.",
    lifespan: "400 ans",
    height: "2 m max",
    physique: "Corps en décomposition / Squelette",
    accent: "#6B8B5E",
    accentRgb: "107,139,94",
  },
  {
    slug: "vampire",
    name: "Vampire",
    subtitle: "Seigneurs de la nuit",
    description: "Prédateurs nocturnes aux dents acérées se nourrissant de sang. Leur longévité exceptionnelle leur a permis d'accumuler pouvoir et secrets au fil des siècles.",
    lifespan: "600 ans",
    height: "2,5 m max",
    physique: "Dents acérées • Craint le soleil",
    accent: "#B85555",
    accentRgb: "184,85,85",
  },
  {
    slug: "orc",
    name: "Orc",
    subtitle: "Guerriers à la peau verte",
    description: "Reconnaissables à leur peau verte et leur stature imposante, les orcs sont des combattants nés dont la force et l'endurance font d'eux de redoutables adversaires.",
    lifespan: "200 ans",
    height: "2,5 m max",
    physique: "Peau verte",
    accent: "#6B8F5E",
    accentRgb: "107,143,94",
  },
  {
    slug: "geant",
    name: "Géant",
    subtitle: "Colosses d'Izaria",
    description: "Atteignant jusqu'à cinq mètres, les géants sont les plus imposants habitants d'Izaria. Leur taille extraordinaire fait d'eux des alliés précieux — ou des ennemis terrifiants.",
    lifespan: "80–100 ans",
    height: "5 m max",
    physique: "Taille extraordinaire",
    accent: "#A09070",
    accentRgb: "160,144,112",
  },
  {
    slug: "fae",
    name: "Fae",
    subtitle: "Esprits de la nature",
    description: "Petits êtres féeriques aux oreilles elfiques et aux ailes de papillon. Les Fae sont liés à la magie primitive — ne vous fiez pas à leur taille : leur esprit est redoutable.",
    lifespan: "200 ans",
    height: "1,5 m max",
    physique: "Oreilles elfiques • Ailes de papillon",
    accent: "#9B7BB8",
    accentRgb: "155,123,184",
  },
  {
    slug: "ghoul",
    name: "Ghoul",
    subtitle: "Dévoreurs des ombres",
    description: "Créatures aux yeux perçants se nourrissant de chair fraîche, les ghouls vivent en marge de la société. Leur apparence cache des êtres capables d'une loyauté profonde.",
    lifespan: "80–100 ans",
    height: "2 m max",
    physique: "Yeux perçants • Chair fraîche",
    accent: "#7A8C6B",
    accentRgb: "122,140,107",
  },
  {
    slug: "nain",
    name: "Nain",
    subtitle: "Forgerons des profondeurs",
    description: "Petits mais robustes, les nains sont maîtres de la forge et de la montagne. Leur longévité et leur ténacité font d'eux des artisans et guerriers de légende.",
    lifespan: "250 ans",
    height: "1,5 m max",
    physique: "Petite taille",
    accent: "#A0785A",
    accentRgb: "160,120,90",
  },
  {
    slug: "elfe",
    name: "Elfe",
    subtitle: "Anciens gardiens",
    description: "Reconnaissables à leurs oreilles elfiques et leur stature élancée, les elfes sont une race ancienne et gracieuse dont la longévité leur a permis de maîtriser arts et magie.",
    lifespan: "200 ans",
    height: "3 m max",
    physique: "Oreilles elfiques",
    accent: "#7EB88A",
    accentRgb: "126,184,138",
  },
  {
    slug: "hybride",
    name: "Hybride",
    subtitle: "Né de deux races",
    description: "Les hybrides héritent des caractéristiques des deux races parentales selon leur gène dominant. Les gobelins (orc+nain) et les ologs (géant+orc) en sont des exemples notables.",
    lifespan: "Variable",
    height: "Variable",
    physique: "Selon gène dominant",
    accent: "#C9974A",
    accentRgb: "201,151,74",
    note: "Non autorisés : Dragon · Esprit · Goblin · Olog",
  },
]

// ─── Stat pill ─────────────────────────────────────────────────────────────────

function StatPill({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="font-jost text-[0.58rem] font-semibold uppercase tracking-[0.2em]"
        style={{ color: `${accent}90` }}
      >
        {label}
      </span>
      <span className="font-cinzel text-sm font-bold text-[#F0EDE8] leading-tight">
        {value}
      </span>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function RacesEtClassesPage() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [displayIndex, setDisplayIndex] = useState(0)
  const [tab, setTab] = useState<"races" | "classes">("races")

  const items = races // swap based on tab later when classes exist

  const current = items[displayIndex]
  const accent = current.accent
  const accentRgb = current.accentRgb

  const goTo = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (animating) return
      setAnimating(true)
      setDirection(dir)
      setActive(index)
      setTimeout(() => {
        setDisplayIndex(index)
        setAnimating(false)
      }, 380)
    },
    [animating]
  )

  const next = useCallback(() => {
    goTo((active + 1) % items.length, "next")
  }, [active, items.length, goTo])

  const prev = useCallback(() => {
    goTo((active - 1 + items.length) % items.length, "prev")
  }, [active, items.length, goTo])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [next, prev])

  return (
    <>
      <style>{`
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes imgReveal {
          from { opacity: 0; transform: scale(1.06) translateX(20px); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes bgPan {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .anim-info-next  { animation: slideRight 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-info-prev  { animation: slideLeft 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-img        { animation: imgReveal 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-bg         { animation: bgPan 0.55s ease both; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* Hamburger bars — bleu foncé sur fond sombre de cette page */
        @media (max-width: 767px) {
          [data-mobile-menu-btn] span,
          button[aria-label*="menu"] span,
          button[aria-label*="Menu"] span,
          .mobile-menu-btn span,
          nav button span.block {
            background-color: #1E3A5F !important;
          }
          [data-mobile-menu-btn] svg line,
          [data-mobile-menu-btn] svg path,
          button[aria-label*="menu"] svg line,
          button[aria-label*="menu"] svg path,
          button[aria-label*="Menu"] svg line,
          button[aria-label*="Menu"] svg path,
          .mobile-menu-btn svg line,
          .mobile-menu-btn svg path,
          nav button svg line,
          nav button svg path {
            stroke: #1E3A5F !important;
          }
        }
      `}</style>

      <div className="flex flex-col" style={{ background: "#080E18", minHeight: "100dvh" }}>
        <Navbar />

        {/* ──────────────────────── HERO CAROUSEL ──────────────────────── */}
        <div
          className="relative overflow-hidden flex-1"
          style={{ minHeight: "calc(100dvh - 80px)" }}
        >

          {/* Background image — full bleed */}
          <div
            key={`bg-${displayIndex}`}
            className="anim-bg absolute inset-0"
            style={{ zIndex: 0 }}
          >
            <Image
              src={`/races/${current.slug}.png`}
              alt={current.name}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 15%" }}
              priority
            />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden>
            {/* Left vignette — desktop only */}
            <div className="hidden md:block" style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(100deg,
                rgba(8,14,24,0.98) 0%,
                rgba(8,14,24,0.93) 30%,
                rgba(8,14,24,0.6) 52%,
                rgba(8,14,24,0.12) 68%,
                transparent 100%)`,
            }} />
            {/* Bottom fade — desktop */}
            <div className="hidden md:block" style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(to top, rgba(8,14,24,1) 0%, rgba(8,14,24,0.5) 60%, transparent 100%)",
            }} />
            {/* Bottom fade — mobile only, stronger to back the text panel */}
            <div className="md:hidden" style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "75%",
              background: "linear-gradient(to top, rgba(8,14,24,1) 0%, rgba(8,14,24,0.98) 45%, rgba(8,14,24,0.5) 70%, transparent 100%)",
            }} />
            {/* Accent glow — desktop only */}
            <div
              key={`glow-${displayIndex}`}
              className="hidden md:block"
              style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse 55% 75% at 72% 45%, rgba(${accentRgb},0.09) 0%, transparent 65%)`,
                transition: "background 1s ease",
              }}
            />
          </div>

          {/* ── INFO PANEL — desktop: left side | mobile: bottom overlay ── */}

          {/* DESKTOP layout (md+): panel on left, thumbnails at bottom */}
          <div className="hidden md:flex relative z-20 flex-col justify-center px-16 lg:px-24"
            style={{ minHeight: "calc(100dvh - 80px)", paddingBottom: "180px" }}
          >
            <div style={{ maxWidth: "540px" }}>

              {/* Tab toggle */}
              <div
                className="inline-flex rounded-xl p-1 mb-10"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {(["races", "classes"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setActive(0); setDisplayIndex(0) }}
                    className="font-jost text-xs font-bold uppercase tracking-[0.15em] px-6 py-2.5 rounded-lg transition-all duration-300"
                    style={{
                      background: tab === t ? `linear-gradient(135deg, ${accent}E0, ${accent})` : "transparent",
                      color: tab === t ? "#080E18" : "rgba(240,237,232,0.35)",
                      boxShadow: tab === t ? `0 4px 16px rgba(${accentRgb},0.3)` : "none",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Animated block */}
              <div key={`info-d-${displayIndex}`} className={direction === "next" ? "anim-info-next" : "anim-info-prev"}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-jost text-[0.62rem] font-bold tabular-nums tracking-[0.22em]" style={{ color: accent }}>
                    {String(displayIndex + 1).padStart(2, "0")}
                    <span style={{ color: `${accent}50`, margin: "0 4px" }}>/</span>
                    {String(items.length).padStart(2, "0")}
                  </span>
                  <div className="h-px w-10" style={{ background: `${accent}50` }} />
                  <span className="font-eb-garamond italic text-sm" style={{ color: "rgba(240,237,232,0.38)" }}>
                    {current.subtitle}
                  </span>
                </div>

                <h1
                  className="font-cinzel font-black leading-[0.9] mb-6"
                  style={{
                    fontSize: "clamp(3.8rem, 7vw, 7rem)",
                    color: "#F0EDE8",
                    letterSpacing: "-0.025em",
                    textShadow: `0 0 100px rgba(${accentRgb},0.2), 0 2px 40px rgba(0,0,0,0.8)`,
                  }}
                >
                  {current.name}
                </h1>

                <div className="mb-6 rounded-full" style={{ height: "2px", width: "56px", background: `linear-gradient(90deg, ${accent}, ${accent}00)` }} />

                <p className="font-eb-garamond text-[1.05rem] leading-relaxed mb-8" style={{ color: "rgba(240,237,232,0.62)", maxWidth: "430px" }}>
                  {current.description}
                </p>

                <div
                  className="inline-flex gap-6 py-4 px-6 rounded-2xl mb-6"
                  style={{
                    background: "rgba(8,14,24,0.65)",
                    border: `1px solid rgba(${accentRgb},0.2)`,
                    backdropFilter: "blur(16px)",
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(${accentRgb},0.1)`,
                  }}
                >
                  <StatPill label="Longévité" value={current.lifespan} accent={accent} />
                  <div className="w-px self-stretch" style={{ background: `rgba(${accentRgb},0.15)` }} />
                  <StatPill label="Taille max" value={current.height} accent={accent} />
                  <div className="w-px self-stretch" style={{ background: `rgba(${accentRgb},0.15)` }} />
                  <StatPill label="Physique" value={current.physique} accent={accent} />
                </div>

                {"note" in current && current.note && (
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl mt-1"
                    style={{ background: "rgba(201,151,74,0.06)", border: "1px solid rgba(201,151,74,0.15)" }}>
                    <span style={{ color: accent, fontSize: "0.75rem", marginTop: "1px" }}>⚠</span>
                    <p className="font-jost text-xs leading-relaxed" style={{ color: "rgba(240,237,232,0.4)" }}>{current.note}</p>
                  </div>
                )}
              </div>

              {/* Nav + keyboard hint */}
              <div className="flex items-center gap-3 mt-8">
                <button onClick={prev}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: "rgba(240,237,232,0.06)", border: "1px solid rgba(240,237,232,0.1)" }}
                  aria-label="Précédent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(240,237,232,0.6)" strokeWidth="2.2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                </button>
                <button onClick={next}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${accent}D0, ${accent})`, boxShadow: `0 4px 20px rgba(${accentRgb},0.4)` }}
                  aria-label="Suivant">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#080E18" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
                <span className="font-jost text-[0.62rem] tracking-wider ml-1" style={{ color: "rgba(240,237,232,0.2)" }}>
                  ← → clavier
                </span>
              </div>
            </div>
          </div>

          {/* DESKTOP thumbnail strip */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 z-30" style={{ pointerEvents: "none" }}>
            <div className="flex items-end gap-2.5 overflow-x-auto scrollbar-hide px-16 lg:px-24 pb-8" style={{ pointerEvents: "auto" }}>
              {items.map((item, i) => {
                const isActive = i === displayIndex
                return (
                  <button key={item.slug} onClick={() => goTo(i, i > active ? "next" : "prev")} aria-label={item.name}
                    className="relative flex-shrink-0 rounded-xl overflow-hidden"
                    style={{
                      width: isActive ? "88px" : "56px",
                      height: isActive ? "118px" : "74px",
                      border: isActive ? `2px solid ${item.accent}` : "2px solid rgba(255,255,255,0.07)",
                      opacity: isActive ? 1 : 0.4,
                      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                      boxShadow: isActive ? `0 8px 28px rgba(${item.accentRgb},0.4)` : "none",
                    }}>
                    <Image src={`/races/${item.slug}.png`} alt={item.name} fill sizes="90px" className="object-cover" style={{ objectPosition: "center 10%" }} />
                    {isActive && (
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 45%, rgba(${item.accentRgb},0.4) 100%)` }} />
                    )}
                    <div className="absolute inset-x-0 bottom-0 pb-1.5 flex justify-center"
                      style={{ background: "linear-gradient(to top, rgba(8,14,24,0.9) 0%, transparent 100%)", opacity: isActive ? 1 : 0, transition: "opacity 0.2s" }}>
                      <span className="font-cinzel text-[0.48rem] font-bold text-white tracking-wide">{item.name}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ─────────── MOBILE layout ─────────── */}
          <div className="md:hidden relative z-20 flex flex-col" style={{ minHeight: "calc(100dvh - 80px)" }}>

            {/* Spacer — pushes content to bottom half */}
            <div className="flex-1" />

            {/* Info card that slides up from bottom */}
            <div
              className="px-5 pb-4"
              style={{
                background: "linear-gradient(to top, rgba(8,14,24,1) 0%, rgba(8,14,24,0.97) 70%, transparent 100%)",
              }}
            >
              {/* Animated content */}
              <div key={`info-m-${displayIndex}`} className={direction === "next" ? "anim-info-next" : "anim-info-prev"}>

                {/* Counter + subtitle — masqué mobile */}
                <div className="hidden">
                  <span className="font-jost text-[0.58rem] font-bold tabular-nums tracking-[0.2em]" style={{ color: accent }}>
                    {String(displayIndex + 1).padStart(2, "0")}
                    <span style={{ color: `${accent}50`, margin: "0 3px" }}>/</span>
                    {String(items.length).padStart(2, "0")}
                  </span>
                  <div className="h-px w-8" style={{ background: `${accent}50` }} />
                  <span className="font-eb-garamond italic text-xs truncate" style={{ color: "rgba(240,237,232,0.38)" }}>
                    {current.subtitle}
                  </span>
                </div>

                {/* Name — adapts to fit */}
                <h1
                  className="font-cinzel font-black leading-[0.88] mb-3"
                  style={{
                    fontSize: "clamp(2.4rem, 11vw, 3.4rem)",
                    color: "#F0EDE8",
                    letterSpacing: "-0.02em",
                    textShadow: `0 0 60px rgba(${accentRgb},0.25)`,
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                  lang="fr"
                >
                  {current.name}
                </h1>

                <div className="mb-3 rounded-full" style={{ height: "2px", width: "40px", background: `linear-gradient(90deg, ${accent}, ${accent}00)` }} />

                {/* Description — shorter on mobile */}
                <p className="font-eb-garamond text-[0.92rem] leading-relaxed mb-4" style={{ color: "rgba(240,237,232,0.6)" }}>
                  {current.description}
                </p>

                {/* Stats — vertical stack on mobile */}
                <div
                  className="grid grid-cols-3 gap-0 rounded-xl mb-4 overflow-hidden"
                  style={{
                    background: "rgba(8,14,24,0.7)",
                    border: `1px solid rgba(${accentRgb},0.18)`,
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {[
                    { label: "Longévité", value: current.lifespan },
                    { label: "Taille", value: current.height },
                    { label: "Physique", value: current.physique },
                  ].map((stat, idx) => (
                    <div
                      key={stat.label}
                      className="flex flex-col gap-1 px-3 py-3"
                      style={{
                        borderRight: idx < 2 ? `1px solid rgba(${accentRgb},0.12)` : "none",
                      }}
                    >
                      <span className="font-jost text-[0.52rem] font-semibold uppercase tracking-[0.15em]" style={{ color: `${accent}90` }}>
                        {stat.label}
                      </span>
                      <span className="font-cinzel text-[0.7rem] font-bold text-[#F0EDE8] leading-tight">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {"note" in current && current.note && (
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg mb-4"
                    style={{ background: "rgba(201,151,74,0.06)", border: "1px solid rgba(201,151,74,0.15)" }}>
                    <span style={{ color: accent, fontSize: "0.7rem" }}>⚠</span>
                    <p className="font-jost text-[0.65rem] leading-relaxed" style={{ color: "rgba(240,237,232,0.4)" }}>{current.note}</p>
                  </div>
                )}
              </div>

              {/* Bottom row: nav arrows + tab toggle */}
              <div className="flex items-center justify-between gap-3 pb-2">
                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button onClick={prev}
                    className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                    style={{ background: "rgba(240,237,232,0.06)", border: "1px solid rgba(240,237,232,0.1)" }}
                    aria-label="Précédent">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(240,237,232,0.6)" strokeWidth="2.2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  </button>
                  <button onClick={next}
                    className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${accent}D0, ${accent})`, boxShadow: `0 4px 16px rgba(${accentRgb},0.4)` }}
                    aria-label="Suivant">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#080E18" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </div>

                {/* Tab toggle — bottom right on mobile */}
                <div
                  className="inline-flex rounded-lg p-0.5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {(["races", "classes"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTab(t); setActive(0); setDisplayIndex(0) }}
                      className="font-jost text-[0.65rem] font-bold uppercase tracking-widest px-4 py-2 rounded-md transition-all duration-300"
                      style={{
                        background: tab === t ? `linear-gradient(135deg, ${accent}E0, ${accent})` : "transparent",
                        color: tab === t ? "#080E18" : "rgba(240,237,232,0.35)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 pt-3">
                {items.map((item, i) => {
                  const isActive = i === displayIndex
                  return (
                    <button key={item.slug} onClick={() => goTo(i, i > active ? "next" : "prev")} aria-label={item.name}
                      className="relative flex-shrink-0 rounded-lg overflow-hidden"
                      style={{
                        width: isActive ? "52px" : "36px",
                        height: isActive ? "70px" : "48px",
                        border: isActive ? `2px solid ${item.accent}` : "2px solid rgba(255,255,255,0.07)",
                        opacity: isActive ? 1 : 0.4,
                        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                        boxShadow: isActive ? `0 4px 16px rgba(${item.accentRgb},0.4)` : "none",
                      }}>
                      <Image src={`/races/${item.slug}.png`} alt={item.name} fill sizes="52px" className="object-cover" style={{ objectPosition: "center 10%" }} />
                      {isActive && (
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(${item.accentRgb},0.45) 100%)` }} />
                      )}
                    </button>
                  )
                })}
              </div>

            </div>
          </div>

        </div>

        <Footer />
      </div>
    </>
  )
}
