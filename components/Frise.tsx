"use client"

import { useState, useEffect, useRef } from "react"

// ── Types ────────────────────────────────────────────────────────────────────

interface TimelineEvent {
  year: string
  short: string
  major: boolean
  badge: string
  title: string
  sub: string
  text: string
  quote?: string
  pills?: string[]
}

interface Era {
  label: string
  events: TimelineEvent[]
}

// ── Data ─────────────────────────────────────────────────────────────────────

const ERAS: Era[] = [
  {
    label: "An 9188 — An 9506",
    events: [
      {
        year: "An 2470",
        short: "Émergence",
        major: false,
        badge: "Aube d'Izaria",
        title: "Émergence des Races",
        sub: "An 2470 — Les peuples s'éveillent",
        text: "Les premières races d'Izaria les Humains, Elfes, Thérianthropes, Faes et bien d'autres émergent sur le continent. Les peuples se sédentarisent et découvrent l'agriculture, posant les premières pierres des civilisations à venir.",
      },
      {
        year: "An 5540",
        short: "Écriture",
        major: false,
        badge: "Âge des Découvertes",
        title: "L'Écriture & la Navigation",
        sub: "An 5540 — Le savoir se transmet",
        text: "Invention de l'écriture et de la navigation. Les nations commencent à consigner leur histoire et à explorer les mers d'Izaria, tissant les premiers liens commerciaux entre peuples.",
      },
      {
        year: "An 9188",
        short: "Déclaration",
        major: true,
        badge: "Prologue",
        title: "La Guerre de Zu'Naat",
        sub: "An 9188 — L'Empereur déclare la guerre",
        text: "L'Empereur Zu'Naat, Fae assoiffé de pouvoir, déclare la guerre à toutes les nations d'Izaria durant la longue période d'hiver. Il part à la recherche d'une arme légendaire pour asseoir sa domination sur le monde.",
      },
      {
        year: "An 9188",
        short: "Alliance",
        major: false,
        badge: "Riposte",
        title: "Formation de l'Alliance",
        sub: "An 9188 — Les nations s'unissent",
        text: "Face à l'ennemi commun, rois et chefs de clans s'unissent. Les anciens alliés de Zu'Naat, dupés par l'Empereur, rejoignent eux aussi la coalition.",
        quote: "Pour se défendre face à cet ennemi commun, les nations décidèrent de former une alliance.",
      },
      {
        year: "An 9188",
        short: "Victoire",
        major: true,
        badge: "Dénouement",
        title: "Chute de Zu'Naat",
        sub: "An 9188+ — L'Empereur est vaincu",
        text: "L'Alliance vainc Zu'Naat. L'arme légendaire est détruite. L'Empereur est détrôné et emprisonné dans un lieu inconnu de tous, où il décédera seul et exilé. Les nations s'ouvrent les unes aux autres et célèbrent désormais ensemble la cohabitation des races.",
      },
      {
        year: "An 9438",
        short: "Nimres-Elda",
        major: false,
        badge: "Découverte",
        title: "Crystal de Nimres-Elda",
        sub: "An 9438 — Une trouvaille discrète",
        text: "Découverte du crystal de Nimres-Elda. Ses propriétés restent mystérieuses, mais son existence ne passe pas inaperçue auprès de certains cercles du pouvoir.",
      },
      {
        year: "An 9484",
        short: "Mitsurin",
        major: false,
        badge: "Politique",
        title: "Premier Conseil du Mitsurin",
        sub: "An 9484 — Naissance d'une démocratie",
        text: "Création du premier conseil du Mitsurin. Les tribus de la jungle s'organisent en un système démocratique révolutionnaire, unique sur le continent d'Izaria.",
      },
      {
        year: "An 9506",
        short: "Hokkaido",
        major: true,
        badge: "Transition",
        title: "Indépendance d'Hokkaido",
        sub: "An 9506 — La vengeance des Kemuri",
        text: "Les Kemuri proclament l'indépendance du Royaume d'Hokkaido face à Toundra. La nation de Toundra juga ces derniers d'insignifiants et ne réagit pas, permettant à Hokkaido de se renforcer et de s'allier avec les Zetsubo, cavaliers mercenaires du désert de l'Ananas.",
        quote: "En un éclair, le clan des Kemuri prit son indépendance face à Toundra, devenant le Royaume d'Hokkaido.",
      },
    ],
  },
  {
    label: "An 9506 — Aujourd'hui",
    events: [
      {
        year: "An 9506",
        short: "Début guerre",
        major: false,
        badge: "Conflit",
        title: "Début de la Guerre de 2 ans",
        sub: "An 9506 — Le continent s'embrase",
        text: "Hokkaido et les Zetsubo déclarent la guerre à la Triple Alliance de Saltir, Asdorath et Toundra. Le continent bascule dans un conflit dévastateur qui durera deux ans.",
      },
      {
        year: "An 9508",
        short: "Fin guerre",
        major: true,
        badge: "Dénouement",
        title: "Fin de la Guerre de 2 ans",
        sub: "An 9508 — L'Alliance s'effondre",
        text: "La guerre s'achève. Asdorath s'est repliée à la mort de son roi. Saltir est détruite, Toundra rasée, le roi de Saltir contraint à l'exil. Seule Asdorath survit et tient Hokkaido à distance.",
        quote: "L'Alliance tomba en laissant derrière elle que des ruines.",
      },
      {
        year: "An 9508",
        short: "Ipulos Tacderen",
        major: false,
        badge: "Fondation",
        title: "Création d'Ipulos Tacderen",
        sub: "An 9508 — La Dame de Fer",
        text: "Des pillards fuyant vers l'ouest sont ralliés par la Dame de Fer, ancienne proche du roi de Saltir. Elle fonde Ipulos Tacderen, nation sans loi aux marges du continent.",
      },
      {
        year: "An 9510",
        short: "Solarsen",
        major: false,
        badge: "Indépendance",
        title: "Indépendance de Solarsen",
        sub: "An 9510 — L'Est s'émancipe",
        text: "Ancienne province d'Asdorath, Solarsen prend son indépendance. Ce royaume de l'Est, fondé sur la pêche et le transport maritime, possède un accès à la mer Osipis ainsi qu'aux océans oriental et austral.",
      },
      {
        year: "An 9510",
        short: "Arcabios",
        major: false,
        badge: "Fondation",
        title: "Création d'Arcabios",
        sub: "An 9510 — Sur les ruines de Toundra",
        text: "Fondé par un maître épéiste sur les anciennes terres de Toundra, Arcabios est entièrement reconstruit. Le monarque et ses sept conseillers veillent à la sécurité des plaines. Asdorath y trouve son premier allié.",
      },
      {
        year: "An 9510",
        short: "Clemar",
        major: false,
        badge: "Conquête",
        title: "Annexion de la Tour de Clemar",
        sub: "An 9510 — Dakurodo s'étend",
        text: "Dakurodo annexe la Tour de Clemar. Asdorath voit en Tengoku, havre mystérieux sur des îles flottantes, un allié pour repousser les troupes ennemies.",
      },
      {
        year: "An 9511",
        short: "Azandor",
        major: false,
        badge: "Fondation",
        title: "Création d'Azandor",
        sub: "An 9511 — L'ambition de Saan Uzall",
        text: "Le royaume d'Azandor est fondé, fruit des ambitions de Saan Uzall. Mais cette nation est déchirée par des troubles internes dès sa naissance.",
      },
      {
        year: "An 9511",
        short: "Thogdur",
        major: false,
        badge: "Fondation",
        title: "Création du Royaume de Thogdur",
        sub: "An 9511 — Le roi penseur",
        text: "L'ancien territoire de Saltir se retrouve sans dirigeant. Un gobelin nommé Thogdur crée de presque rien une nation interdite aux humains et aux elfes. Le royaume esclavagiste orc était né.",
      },
      {
        year: "An 9518",
        short: "Azandor",
        major: true,
        badge: "Destruction",
        title: "Destruction d'Azandor",
        sub: "An 9518 — La colère de Narset",
        text: "Pris de folie et d'une jalousie absolue, Saan Uzall envoie un assassin tuer l'Impératrice d'Asdorath, Régina de Narset. L'assassin est arrêté. Narset marche sur Azandor avec ses cavaliers, décapite de sa main Uzall ainsi que tous ses dignitaires, et brûle entièrement la capitale.",
        quote: "Narset décida de marcher sur Azandor avec ses cavaliers et décapita de sa main Uzall ainsi que tous ses dignitaires avant de brûler entièrement la capitale.",
      },
      {
        year: "An 9527",
        short: "Aujourd'hui",
        major: true,
        badge: "Aujourd'hui",
        title: "Un Monde en Ruines",
        sub: "An 9527 — Le monde actuel",
        text: "Vingt ans après la Guerre de 2 ans, les cicatrices sont profondes. Dakurodo soulève une armée. Hokkaido s'est effondré après l'assassinat de Nomu Kemuri. L'Impératrice d'Asdorath cherche des alliés de toutes parts.",
        quote: "Dakurodo se prépare à la guerre en ce moment même.",
      },
    ],
  },
]

// ── Desktop Detail Panel ──────────────────────────────────────────────────────

function DesktopPanel({ event, visible }: { event: TimelineEvent; visible: boolean }) {
  return (
    <div className="flex-1 flex flex-col px-8 pt-6 pb-4 min-h-[240px]">
      <p
        className="font-cinzel text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5 transition-all duration-300"
        style={{
          color: "#C9974A",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(7px)",
        }}
      >
        {event.badge}
      </p>

      <h2
        className="font-cinzel font-bold leading-tight mb-1 transition-all duration-300 delay-[40ms]"
        style={{
          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
          color: "#F0EDE8",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(7px)",
        }}
      >
        {event.title}
      </h2>

      <p
        className="text-[0.95rem] italic mb-3.5 transition-all duration-300 delay-[80ms]"
        style={{
          color: "#C9974A",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(7px)",
        }}
      >
        {event.sub}
      </p>

      <div
        className="h-px w-9 mb-3.5 transition-all duration-300 delay-[100ms]"
        style={{
          background: "linear-gradient(90deg, #C9974A, transparent)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(7px)",
        }}
      />

      <div
        className="text-[1rem] leading-[1.8] transition-all duration-300 delay-[140ms]"
        style={{
          color: "rgba(240,237,232,0.78)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(7px)",
        }}
      >
        <p className="mb-2.5">{event.text}</p>
        {event.quote && (
          <blockquote
            className="pl-3 py-1.5 my-2.5 italic text-[1rem]"
            style={{ borderLeft: "2px solid #C9974A", color: "#E8B96A" }}
          >
            « {event.quote} »
          </blockquote>
        )}
        {event.pills && event.pills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {event.pills.map((pill) => (
              <span
                key={pill}
                className="text-[11px] px-2.5 py-1 rounded-full border"
                style={{
                  background: "rgba(201,151,74,0.15)",
                  borderColor: "rgba(201,151,74,0.25)",
                  color: "#E8B96A",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Desktop Rail ──────────────────────────────────────────────────────────────

function DesktopRail({
  era,
  events,
  current,
  onSelect,
  onPrev,
  onNext,
}: {
  era: Era
  events: TimelineEvent[]
  current: number
  onSelect: (i: number) => void
  onPrev: () => void
  onNext: () => void
}) {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const active = rowRef.current?.querySelector(".ev-active")
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [current])

  const pct = events.length <= 1 ? 100 : (current / (events.length - 1)) * 100

  return (
    <div className="px-7 pb-5">
      <div className="flex items-center justify-between mb-2.5">
        <span
          className="font-cinzel text-[11px] tracking-[0.1em] uppercase"
          style={{ color: "rgba(201,151,74,0.4)" }}
        >
          {era.label}
        </span>
        <div className="flex gap-1.5">
          {[{ dir: -1, label: "←" }, { dir: 1, label: "→" }].map(({ dir, label }) => (
            <button
              key={dir}
              onClick={dir === -1 ? onPrev : onNext}
              disabled={dir === -1 ? current === 0 : current === events.length - 1}
              className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors disabled:opacity-30"
              style={{
                background: "rgba(201,151,74,0.1)",
                border: "1px solid rgba(201,151,74,0.28)",
                color: "#C9974A",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Events row */}
      <div
        ref={rowRef}
        className="flex items-end overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {events.map((ev, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`flex flex-col items-center flex-shrink-0 group ${ev.major ? "px-2.5" : "px-1.5"} ${i === current ? "ev-active" : ""}`}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {/* Ring */}
              <div
                className="absolute w-5 h-5 rounded-full border transition-all duration-200"
                style={{
                  borderColor: i === current ? "rgba(201,151,74,0.35)" : "transparent",
                  transform: i === current ? "scale(1.55)" : "scale(1)",
                }}
              />
              {/* Dot */}
              <div
                className="rounded-full transition-all duration-200 relative z-10"
                style={{
                  width: ev.major ? 10 : 6,
                  height: ev.major ? 10 : 6,
                  background:
                    i === current
                      ? "#C9974A"
                      : "rgba(201,151,74,0.25)",
                  border: `${ev.major ? 1.5 : 1}px solid ${i === current ? "#E8B96A" : "rgba(201,151,74,0.4)"}`,
                  transform: i === current ? `scale(${ev.major ? 1.4 : 1.6})` : "scale(1)",
                  boxShadow: i === current ? "0 0 8px rgba(201,151,74,0.5)" : "none",
                }}
              />
            </div>
            <span
              className="font-cinzel text-[11px] mt-1.5 whitespace-nowrap transition-colors duration-200"
              style={{ color: i === current ? "#C9974A" : "rgba(201,151,74,0.5)" }}
            >
              {ev.year}
            </span>
            <span
              className="text-[11px] mt-0.5 max-w-[76px] whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200"
              style={{ color: i === current ? "rgba(240,237,232,0.72)" : "rgba(240,237,232,0.32)" }}
            >
              {ev.short}
            </span>
          </button>
        ))}
      </div>

      {/* Rail */}
      <div
        className="relative h-0.5 rounded-full mt-1"
        style={{ background: "rgba(201,151,74,0.12)" }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #C9974A, #E8B96A)",
          }}
        />
      </div>
    </div>
  )
}

// ── Mobile Item ───────────────────────────────────────────────────────────────

function MobileItem({
  event,
  index,
  isActive,
  onClick,
}: {
  event: TimelineEvent
  index: number
  isActive: boolean
  onClick: () => void
}) {
  return (
    <div className="relative cursor-pointer py-2.5 pl-3" onClick={onClick}>
      {/* Dot */}
      <div
        className="absolute rounded-full transition-all duration-200"
        style={{
          width: event.major ? 11 : 7,
          height: event.major ? 11 : 7,
          left: event.major ? -25 : -23,
          top: event.major ? 15 : 17,
          background: isActive ? "#C9974A" : "rgba(201,151,74,0.25)",
          border: `1.5px solid ${isActive ? "#E8B96A" : "rgba(201,151,74,0.4)"}`,
          boxShadow: isActive ? "0 0 7px rgba(201,151,74,0.5)" : "none",
        }}
      />

      <p
        className="font-cinzel text-[11px] font-bold tracking-[0.1em] uppercase mb-0.5 transition-colors duration-200"
        style={{ color: isActive ? "#C9974A" : "rgba(201,151,74,0.5)" }}
      >
        {event.year}
      </p>
      <p
        className="text-[1rem] leading-tight transition-colors duration-200"
        style={{ color: isActive ? "#F0EDE8" : "rgba(240,237,232,0.55)" }}
      >
        {event.title}
      </p>

      {/* Expanded detail */}
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: isActive ? 600 : 0, opacity: isActive ? 1 : 0 }}
      >
        <p
          className="font-cinzel text-[11px] font-bold tracking-[0.15em] uppercase mt-2 mb-1"
          style={{ color: "#C9974A" }}
        >
          {event.badge}
        </p>
        <div
          className="w-7 h-px mb-2"
          style={{ background: "linear-gradient(90deg, #C9974A, transparent)" }}
        />
        <p className="text-[0.95rem] leading-[1.78]" style={{ color: "rgba(240,237,232,0.75)" }}>
          {event.text}
        </p>
        {event.quote && (
          <blockquote
            className="pl-2.5 py-1.5 my-2 italic text-[0.95rem]"
            style={{ borderLeft: "2px solid #C9974A", color: "#E8B96A" }}
          >
            « {event.quote} »
          </blockquote>
        )}
        {event.pills && event.pills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {event.pills.map((pill) => (
              <span
                key={pill}
                className="text-[11px] px-2 py-0.5 rounded-full border"
                style={{
                  background: "rgba(201,151,74,0.15)",
                  borderColor: "rgba(201,151,74,0.25)",
                  color: "#E8B96A",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Frise() {
  const [eraIndex, setEraIndex] = useState(0)
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  const era = ERAS[eraIndex]
  const events = era.events
  const activeEvent = events[current]

  function switchEra(i: number) {
    setEraIndex(i)
    setCurrent(0)
    setVisible(true)
  }

  function goTo(i: number) {
    if (i === current || i < 0 || i >= events.length) return
    setVisible(false)
    setTimeout(() => {
      setCurrent(i)
      setVisible(true)
    }, 150)
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(current + 1)
      if (e.key === "ArrowLeft") goTo(current - 1)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [current, events.length])

  return (
    <div
      className="font-eb-garamond rounded-xl overflow-hidden flex flex-col relative"
      style={{
        background: "linear-gradient(160deg, #0D1B2A 0%, #1a2a3a 50%, #0D1B2A 100%)",
        color: "#F0EDE8",
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Tabs */}
      <div
        className="flex overflow-x-auto relative z-10 px-4"
        style={{ borderBottom: "1px solid rgba(201,151,74,0.2)", scrollbarWidth: "none" }}
      >
        {ERAS.map((e, i) => (
          <button
            key={i}
            onClick={() => switchEra(i)}
            className="font-cinzel text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-3.5 border-b-2 whitespace-nowrap flex-shrink-0 transition-colors duration-200"
            style={{
              color: i === eraIndex ? "#C9974A" : "rgba(201,151,74,0.45)",
              borderBottomColor: i === eraIndex ? "#C9974A" : "transparent",
              background: "transparent",
            }}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex flex-col flex-1 relative z-10">
        <DesktopPanel event={activeEvent} visible={visible} />
        <DesktopRail
          era={era}
          events={events}
          current={current}
          onSelect={goTo}
          onPrev={() => goTo(current - 1)}
          onNext={() => goTo(current + 1)}
        />
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col relative z-10 px-4 pt-4 pb-6">
        {/* Mobile nav */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-cinzel text-[11px] tracking-[0.1em] uppercase"
            style={{ color: "rgba(201,151,74,0.4)" }}
          >
            {era.label}
          </span>
          <div className="flex gap-1.5">
            {[{ dir: -1, label: "←" }, { dir: 1, label: "→" }].map(({ dir, label }) => (
              <button
                key={dir}
                onClick={() => goTo(current + dir)}
                disabled={dir === -1 ? current === 0 : current === events.length - 1}
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors disabled:opacity-30"
                style={{
                  background: "rgba(201,151,74,0.1)",
                  border: "1px solid rgba(201,151,74,0.28)",
                  color: "#C9974A",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="relative pl-7">
          {/* Vertical line */}
          <div
            className="absolute left-1.5 top-1.5 bottom-1.5 w-px"
            style={{ background: "linear-gradient(to bottom, #C9974A, rgba(201,151,74,0.1))" }}
          />
          {events.map((ev, i) => (
            <MobileItem
              key={i}
              event={ev}
              index={i}
              isActive={i === current}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}