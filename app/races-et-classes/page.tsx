"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

// ─── Data ──────────────────────────────────────────────────────────────────────

const races = [
  {
    slug: "ange2",
    name: "Ange",
    subtitle: "Messagers ailés",
    description: "Êtres aux ailes d'une blancheur immaculée, les anges sont les gardiens de la lumière dans tout Izaria. Leur présence inspire autant la sérénité que la crainte.",
    lifespan: "600 ans",
    height: "3 m max",
    physique: "Ailes blanches",
    accent: "#E8D4A0",
    accentRgb: "232,212,160",
  },
  {
    slug: "ange-dechu2",
    name: "Ange Déchu",
    subtitle: "Entre lumière et obscurité",
    description: "Né de l'union d'un ange et d'un démon, leur ailes noires sont leurs signatures. Personnages neutres par nature, ils errent à la frontière du bien et du mal.",
    lifespan: "600 ans",
    height: "3 m max",
    physique: "Ailes noires",
    accent: "#8888AA",
    accentRgb: "136,136,170",
  },
  {
    slug: "demon4",
    name: "Démon",
    subtitle: "Êtres cornues",
    description: "Créatures cournues, les démons arborent une stature colossale. Leur nature démoniaque les rend redoutables au combat et durant les négociations.",
    lifespan: "600 ans",
    height: "3 m max",
    physique: "Cornes",
    accent: "#C04040",
    accentRgb: "192,64,64",
  },
  {
    slug: "elfe",
    name: "Elfe",
    subtitle: "Gardiens de la forêt",
    description: "Reconnaissables à leurs oreilles elfiques et leur stature élancée, les elfes sont une race ancienne et gracieuse dont la longévité leur a permis de maîtriser arts et magie.",
    lifespan: "200 ans",
    height: "3 m max",
    physique: "Oreilles elfiques",
    accent: "#7EB88A",
    accentRgb: "126,184,138",
  },
  {
    slug: "fae",
    name: "Fae",
    subtitle: "Esprits de la nature",
    description: "Petits êtres féeriques aux oreilles elfiques et aux ailes de papillon. Les Fae sont liés à la magie primitive. Ne vous fiez pas à leur taille : leur esprit est redoutable.",
    lifespan: "200 ans",
    height: "1,5 m max",
    physique: "Oreilles elfiques • Ailes de papillon",
    accent: "#9B7BB8",
    accentRgb: "155,123,184",
  },
  {
    slug: "geant",
    name: "Géant",
    subtitle: "Colosses d'Izaria",
    description: "Atteignant jusqu'à cinq mètres, les géants sont les plus imposants habitants d'Izaria. Leur taille extraordinaire fait d'eux des alliés précieux ou des ennemis terrifiants.",
    lifespan: "80–100 ans",
    height: "5 m max",
    physique: "Taille extraordinaire",
    accent: "#A09070",
    accentRgb: "160,144,112",
  },
  {
    slug: "ghoul",
    name: "Ghoul",
    subtitle: "Dévoreurs de chair",
    description: "Créatures aux yeux perçants se nourrissant de chair fraîche, les ghouls vivent en marge de la société. Leur apparence cache des êtres capables d'une loyauté profonde.",
    lifespan: "80–100 ans",
    height: "2 m max",
    physique: "Yeux perçants • Chair fraîche",
    accent: "#7A8C6B",
    accentRgb: "122,140,107",
  },
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
  {
    slug: "mort-vivant",
    name: "Mort-Vivant",
    subtitle: "Entre vie et trépas",
    description: "Maudits, les morts-vivants existent sous deux formes : corps en décomposition ou squelette. Leur persistance au-delà de la mort reste un mystère.",
    lifespan: "400 ans",
    height: "2 m max",
    physique: "Corps en décomposition / Squelette",
    accent: "#6B8B5E",
    accentRgb: "107,139,94",
  },
  {
    slug: "nain",
    name: "Nain",
    subtitle: "Forgerons des montagnes",
    description: "Petits mais robustes, les nains sont maîtres de la forge et de la montagne. Leur longévité et leur ténacité font d'eux des artisans et guerriers de légende.",
    lifespan: "250 ans",
    height: "1,5 m max",
    physique: "Petite taille",
    accent: "#A0785A",
    accentRgb: "160,120,90",
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
    slug: "vampire",
    name: "Vampire",
    subtitle: "Seigneurs de la nuit",
    description: "Prédateurs nocturnes aux dents acérées se nourrissant de sang. Leur longévité exceptionnelle leur a permis d'accumuler pouvoir et secrets au fil des siècles.",
    lifespan: "600 ans",
    height: "2,5 m max",
    physique: "Dents acérées • Craint le soleil",
    accent: "#B85555",
    accentRgb: "184,85,85",
  }
]

const classes = [
  {
    slug: "archer",
    name: "Archer",
    subtitle: "Précision mortelle",
    description: "La classe d'archer se concentre sur une connaissance extrême des armes à distance. Des couteaux de lancer aux hachettes en passant par l'arc, il a une précision remarquable et peut poser des pièges pour stopper sa cible avant de lui asséner un coup fatal.",
    main: "Affinité au combat à distance",
    secondary: "Affinité au piégeage",
    accent: "#7EB88A",
    accentRgb: "126,184,138",
  },
  {
    slug: "assassin",
    name: "Assassin",
    subtitle: "Ombre et silence",
    description: "La classe d'assassin se concentre sur la traque d'une cible précise mais en toute discrétion. Il excelle dans les compétences de camouflage afin de tuer sans que personne ne le sache.",
    main: "Affinité à la traque",
    secondary: "Affinité à la discrétion",
    accent: "#4A4A6A",
    accentRgb: "74,74,106",
  },
  {
    slug: "chasseur5",
    name: "Chasseur",
    subtitle: "Maître de la nature",
    description: "La classe de chasseur se concentre sur une connaissance poussée de la nature. Très souvent équipé de pièges et d'armes à distance, il préférera toujours les embuscades aux combats singuliers directs.",
    main: "Affinité envers la faune et la flore",
    secondary: "Affinité au dressage des animaux",
    accent: "#6B8F5E",
    accentRgb: "107,143,94",
  },
  {
    slug: "chasseur-de-demon2",
    name: "Chasseur de Démon",
    subtitle: "Fléau de la magie noire",
    description: "La classe de chasseur de démon se concentre sur le combat contre la magie noire. Il peut dans certains cas l'utiliser lui-même. Ce guerrier ne cherche qu'à détruire toute forme de malédiction et est capable d'utiliser certains sorts pour retarder les effets de la magie noire.",
    main: "Affinité à la défense contre la magie noire",
    secondary: "Affinité à briser des malédictions",
    accent: "#C04040",
    accentRgb: "192,64,64",
  },
  {
    slug: "guerisseur2",
    name: "Guérisseur",
    subtitle: "Vie et salut",
    description: "La classe de guérisseur se concentre sur le soin magique ou non. Il fera toujours passer ses alliés avant lui sur un champ de bataille. Ses alliés sont sa plus grande force. Néanmoins, il peut être décisif si le combat s'éternise.",
    main: "Affinité aux soins non magiques",
    secondary: "Affinité à la magie blanche",
    accent: "#E8D4A0",
    accentRgb: "232,212,160",
  },
  {
    slug: "guerrier3",
    name: "Guerrier",
    subtitle: "Maître du combat au corps à corps",
    description: "La classe de guerrier se concentre sur la force physique et les compétences de combat au corps à corps. Il peut manier tous les types de lames et armes contondantes. Ses pouvoirs peuvent affaiblir l'adversaire ou assener des attaques de très haute intensité.",
    main: "Affinité au combat au corps à corps",
    secondary: "Affinité au combat singulier",
    accent: "#C9974A",
    accentRgb: "201,151,74",
  },
  {
    slug: "mage",
    name: "Mage",
    subtitle: "Tisserand des arcanes",
    description: "La classe de mage se concentre sur la magie et l'illusionnisme. Un mage peut non seulement contrôler la magie mais aussi ressentir ses différentes utilisations et illusions.",
    main: "Affinité à la magie",
    secondary: "Affinité à l'illusionnisme",
    accent: "#6B9AC9",
    accentRgb: "107,154,201",
  },
  {
    slug: "marchand2",
    name: "Marchand",
    subtitle: "L'argent est roi",
    description: "La classe de marchand se concentre sur les aspects économiques. Ils feront tout pour éviter les combats directs mais peuvent engager guildes et mercenaires sans scrupule. Ils connaissent les failles économiques des royaumes et savent les exploiter.",
    main: "Affinité à l'économie",
    secondary: "Affinité à la négociation",
    accent: "#C9974A",
    accentRgb: "201,151,74",
  },
  {
    slug: "mercenaire6",
    name: "Mercenaire",
    subtitle: "Le tueur à gages",
    description: "La classe de mercenaire se concentre sur la traque d'une cible précise et des techniques pour réussir son contrat. De la manipulation aux compétences de combat au corps, guerrier très complet, il n'a pas de point fort à part celui de tuer n'importe qui tant qu'on lui donne le prix.",
    main: "Affinité au combat au corps à corps",
    secondary: "Affinité à la traque",
    accent: "#665545",
    accentRgb: "160,120,80",
  },
  {
    slug: "necromancien",
    name: "Nécromancien",
    subtitle: "Seigneur des morts",
    description: "La classe de nécromancien se concentre sur la magie noire et les invocations. Il cherchera toujours à utiliser ses pouvoirs pour rendre le combat disproportionné en sa faveur. Mauvais en combat singulier, il sera mis en difficulté selon l'environnement.",
    main: "Affinité à la magie noire",
    secondary: "Affinité aux invocations",
    accent: "#6B5B8A",
    accentRgb: "107,91,138",
  },
  {
    slug: "paladin2",
    name: "Paladin",
    subtitle: "Bouclier de ses alliés",
    description: "La classe de paladin se concentre sur la défense de ses alliés. Vrai support, il fera tout pour que les attaques soient concentrées sur lui. À l'aise avec la magie blanche, il est capable de soigner ses alliés et est extrêmement résistant.",
    main: "Affinité aux connaissances défensives en combat",
    secondary: "Affinité à la magie de soins",
    accent: "#D4AF37",
    accentRgb: "212,175,55",
  },
  {
    slug: "samourai",
    name: "Samouraï",
    subtitle: "Lame rapide et précise",
    description: "La classe de samouraï se concentre sur l'agilité et les compétences de combat à la lame. En armure légère, il est plus rapide qu'un guerrier lambda et à l'aise au tir à l'arc. Il adore les duels mais se fatigue vite si le combat s'éternise.",
    main: "Affinité au combat singulier",
    secondary: "Affinité au tir à l'arc",
    accent: "#b987b5",
    accentRgb: "184,85,85",
  },
  {
    slug: "sorcier3",
    name: "Sorcier",
    subtitle: "Maître des esprits et des potions",
    description: "La classe de sorcier se concentre sur la fabrication de potions magiques et l'utilisation de la magie sous forme naturelle. Il peut communiquer avec les esprits et les animaux. Un sorcier est capable de créer le bien comme le mal.",
    main: "Affinité à la création de potion",
    secondary: "Affinité au shamanisme",
    accent: "#963f3f",
    accentRgb: "155,123,184",
  },
  {
    slug: "vagabond2",
    name: "Vagabond",
    subtitle: "Plus rapide que son ombre",
    description: "La classe de vagabond se concentre sur les déplacements très rapides. Vrai maître de l'agilité, il voudra jamais qu'un combat s'éternise. Sa rapidité et sa connaissance de l'environnement sont ses plus grandes forces pour finir le combat le plus vite possible.",
    main: "Affinité à l'agilité",
    secondary: "Affinité à la connaissance du terrain",
    accent: "#A09070",
    accentRgb: "160,144,112",
  },
  {
    slug: "voleur2",
    name: "Voleur",
    subtitle: "Discret et insaisissable",
    description: "La classe de voleur se concentre sur la discrétion et la dissimulation. Souvent sans armure ou en armure légère, il préférera attaquer par surprise si le combat est obligatoire. Néanmoins la fuite sera toujours sa première option.",
    main: "Affinité à la discrétion",
    secondary: "Affinité au crochetage",
    accent: "#7A7A8C",
    accentRgb: "122,122,140",
  }
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

  const items = tab === "classes" ? classes : races

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
              src={`/${tab === "classes" ? "classes" : "races"}/${current.slug}.png`}
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
                  {tab === "classes" ? (
                    <>
                      <StatPill label="Principale" value={(current as typeof classes[0]).main} accent={accent} />
                      <div className="w-px self-stretch" style={{ background: `rgba(${accentRgb},0.15)` }} />
                      <StatPill label="Secondaire" value={(current as typeof classes[0]).secondary} accent={accent} />
                    </>
                  ) : (
                    <>
                      <StatPill label="Longévité" value={(current as typeof races[0]).lifespan} accent={accent} />
                      <div className="w-px self-stretch" style={{ background: `rgba(${accentRgb},0.15)` }} />
                      <StatPill label="Taille max" value={(current as typeof races[0]).height} accent={accent} />
                      <div className="w-px self-stretch" style={{ background: `rgba(${accentRgb},0.15)` }} />
                      <StatPill label="Physique" value={(current as typeof races[0]).physique} accent={accent} />
                    </>
                  )}
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
                    <Image src={`/${tab === "classes" ? "classes" : "races"}/${item.slug}.png`} alt={item.name} fill sizes="90px" className="object-cover" style={{ objectPosition: "center 10%" }} />
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
                  className={`grid ${tab === "classes" ? "grid-cols-2" : "grid-cols-3"} gap-0 rounded-xl mb-4 overflow-hidden`}
                  style={{
                    background: "rgba(8,14,24,0.7)",
                    border: `1px solid rgba(${accentRgb},0.18)`,
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {(tab === "classes"
                    ? [
                        { label: "Principale", value: (current as typeof classes[0]).main },
                        { label: "Secondaire", value: (current as typeof classes[0]).secondary },
                      ]
                    : [
                        { label: "Longévité", value: (current as typeof races[0]).lifespan },
                        { label: "Taille", value: (current as typeof races[0]).height },
                        { label: "Physique", value: (current as typeof races[0]).physique },
                      ]
                  ).map((stat, idx) => (
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
                      <Image src={`/${tab === "classes" ? "classes" : "races"}/${item.slug}.png`} alt={item.name} fill sizes="52px" className="object-cover" style={{ objectPosition: "center 10%" }} />
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
