"use client"

import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"
import { useState } from "react"

// ─── Data ────────────────────────────────────────────────────────────────────

const steps: {
  number: string
  id: string
  label: string
  icon: string
  title: string
  color: string
  description: string
  items: { label: string; detail: React.ReactNode }[]
}[] = [
  {
    number: "01",
    id: "identite",
    label: "Identité",
    icon: "⚔️",
    title: "Identité du personnage",
    color: "#C9974A",
    description: "Les bases qui définissent qui est ton personnage dans le monde d'Izaria.",
    items: [
      { label: "Nom & Prénom", detail: "Choisis un nom cohérent avec le monde médiéval-fantastique d'Izaria. Pas de noms modernes ni de références au monde réel." },
      { label: "Surnom", detail: "Facultatif. Un surnom peut enrichir l'identité de ton personnage, mais n'est pas obligatoire." },
      { label: "Sexe & Âge", detail: "Indique le sexe et l'âge de ton personnage. L'âge doit être cohérent avec sa race (ex: un elfe peut vivre plusieurs siècles)." },
      { label: "Race", detail: <>Consulte la liste complète des races disponibles dans le guide <a href="/races-et-classes" className="text-[#C9974A] underline underline-offset-2 hover:opacity-80 transition-opacity">Races & Classes</a>. Toutes les combinaisons race/classe sont possibles.</> },
      { label: "Classe (métier)", detail: <>Obligatoire ! C'est le métier de ton personnage. Pense au mood général : une brute → Guerrier/Mercenaire, un érudit → Mage/Sorcier. Consulte le guide <a href="/races-et-classes" className="text-[#C9974A] underline underline-offset-2 hover:opacity-80 transition-opacity">Races & Classes</a>.</> },
      { label: "Nation de naissance", detail: <>Obligatoire ! Elle doit être l'une des nations d'Izaria. Consulte le guide des <a href="/nations" className="text-[#C9974A] underline underline-offset-2 hover:opacity-80 transition-opacity">Nations</a> pour t'imprégner de l'atmosphère de chaque nation.</> },
    ],
  },
  {
    number: "02",
    id: "histoire",
    label: "Histoire",
    icon: "📜",
    title: "Histoire du personnage",
    color: "#27AE60",
    description: "Le passé qui a forgé ton personnage, au minimum 20 lignes.",
    items: [
      { label: "Minimum 20 lignes", detail: "L'histoire doit faire au minimum 20 lignes sur les écrans du staff. C'est une exigence non négociable." },
      { label: "Ancrage dans le lore", detail: <>Inspire-toi de l'<a href="/histoire" className="text-[#27AE60] underline underline-offset-2 hover:opacity-80 transition-opacity">histoire de ta nation</a>, des guerres, des renversements de pouvoir. Aucun lien possible avec le monde réel.</> },
      { label: "Cohérence avec la race", detail: "Si ton personnage est vampire, explique comment il l'est devenu. Si c'est un hybride, explique son hybridation. La race doit enrichir l'histoire." },
      { label: "Aucune création de lieux", detail: "Interdit de créer de nouveaux lieux ou de modifier/ajouter des événements aux histoires des nations existantes." },
    ],
  },
  {
    number: "03",
    id: "caractere",
    label: "Caractère",
    icon: "🪞",
    title: "Psychologie & Caractère",
    color: "#8B6FBF",
    description: "Qu'est-ce qui anime ton personnage ? Ses forces, ses failles, ses convictions.",
    items: [
      { label: "Minimum 5 lignes", detail: "Le caractère doit être développé sur au moins 5 lignes. Une simple liste de traits ne suffit pas." },
      { label: "Traits de personnalité", detail: "Décris les traits dominants de ton personnage : ses peurs, motivations profondes, valeurs, contradictions. Évite les archétypes trop clichés." },
      { label: "Traits notables (optionnel)", detail: "Tu peux ajouter une section facultative sur la description familiale, des troubles ou des capacités annexes qui enrichissent le personnage." },
    ],
  },
  {
    number: "04",
    id: "pouvoir",
    label: "Pouvoir",
    icon: "✨",
    title: "Pouvoir unique",
    color: "#2980B9",
    description: "Un seul pouvoir, précisément décrit selon les 3 points requis.",
    items: [
      { label: "Un seul pouvoir", detail: <>Tu n'as droit qu'à un seul pouvoir. Consulte la page des <a href="/pouvoirs" className="text-[#2980B9] underline underline-offset-2 hover:opacity-80 transition-opacity">Pouvoirs</a> du guide pour choisir. L'idéal est de lier ton pouvoir à ta nation.</> },
      { label: "3 points obligatoires", detail: <>S'il manque l'un des 3 points requis (décrits dans la section <a href="/pouvoirs" className="text-[#2980B9] underline underline-offset-2 hover:opacity-80 transition-opacity">Pouvoirs</a> du guide), ta fiche sera automatiquement refusée. Sois exhaustif.</> },
      { label: "Invocation limitée", detail: "Si ton pouvoir est un sort d'invocation, une seule créature peut être invoquée à la fois." },
    ],
  },
  {
    number: "05",
    id: "armement",
    label: "Armement",
    icon: "🗡️",
    title: "Armes & Équipement",
    color: "#C0392B",
    description: "Ce que ton personnage porte au combat avec ses limites.",
    items: [
      { label: "1 ou 2 armes maximum", detail: "Tu peux choisir une ou deux armes. Pas d'armes à feu, pas d'arbalètes, pas d'armes en os de dragon. L'avancement technologique est celui du XIIe-XIIIe siècle." },
      { label: "Description & histoire", detail: <>Décris chaque arme en détail : nom, type, taille, matériau (uniquement les métaux/bois/pierres listés dans <a href="/economie" className="text-[#C0392B] underline underline-offset-2 hover:opacity-80 transition-opacity">Économie</a>), caractéristiques et histoire de l'arme.</> },
      { label: "Illustration de l'arme", detail: "Une illustration couleur de chaque arme est obligatoire. Elle doit être adaptée au monde d'Izaria (pas d'esthétique moderne ou anachronique)." },
    ],
  },
  {
    number: "06",
    id: "apparence",
    label: "Apparence",
    icon: "🎨",
    title: "Représentation visuelle",
    color: "#E67E22",
    description: "L'illustration de ton personnage, obligatoire et en couleur.",
    items: [
      { label: "Illustration en couleur", detail: "L'apparence doit être en couleur pour montrer au mieux la tenue et l'équipement. Une image en noir et blanc ne sera pas acceptée." },
      { label: "Adaptée à Izaria", detail: "Le staff se réserve le droit de refuser une apparence non adaptée au monde d'Izaria. Évite les esthétiques modernes, futuristes ou anachroniques." },
      { label: "Hébergement sur Google", detail: "La fiche entière doit être réalisée sur Google Docs (ou autre service Google). Les illustrations doivent y être intégrées directement." },
    ],
  },
]

const rules: { icon: string; text: React.ReactNode }[] = [
  { icon: "🚫", text: "Pas de langage SMS ni d'abréviations dans la fiche." },
  { icon: "⛪", text: "Aucun rapprochement au divin, à l'immortalité ou à un culte." },
  { icon: "📺", text: "Interdit de copier un personnage d'animé, série, film, livre ou jeu (y compris From Software)." },
  { icon: "🔫", text: "Armes à feu, arbalètes et armes en os de dragon sont interdites." },
  { icon: "👑", text: "Il n'y a pas de noblesse autre que les dirigeants dans Izaria." },
  { icon: "🌍", text: "Aucun lien possible entre les fiches et le monde réel." },
  { icon: "📋", text: "3 fiches simultanées maximum par joueur sur le serveur." },
  { icon: "©️", text: "Toute copie de fiche, pouvoir ou capacité d'un autre rôliste est interdite sans son consentement." },
  { icon: "🪨", text: <>Seuls les métaux, bois et pierres listés dans <a href="/economie" className="text-[#C9974A] underline underline-offset-2 hover:opacity-80 transition-opacity">Économie</a> sont autorisés.</> },
  { icon: "🗺️", text: "Interdit de modifier le lore des nations ou de créer de nouveaux lieux." },
  { icon: "⚙️", text: "L'avancement technologique correspond au XIIe-XIIIe siècle." },
  { icon: "🇫🇷", text: "La seule langue autorisée dans les fiches est le français." },
]

const wheels = [
  {
    label: "Race",
    description: "Laisse le destin choisir ta race parmi toutes les races disponibles d'Izaria.",
    color: "#C9974A",
    icon: "🧝",
    url: "https://wheelofnames.com/fr/9hm-mt3",
  },
  {
    label: "Classe",
    description: "Ta classe décidée par le hasard : guerrier, mage, assassin… tout est possible.",
    color: "#8B6FBF",
    icon: "🎯",
    url: "https://wheelofnames.com/cvm-a9b",
  },
  {
    label: "Nation",
    description: "Quelle terre t'a vu naître ? Laisse la roue trancher.",
    color: "#27AE60",
    icon: "🌍",
    url: "https://wheelofnames.com/45n-3br",
  },
]

// ─── Step Card ────────────────────────────────────────────────────────────────

function StepCard({
  step,
  isOpen,
  onToggle,
}: {
  step: (typeof steps)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="reveal border rounded-xl overflow-hidden transition-all duration-300 bg-white"
      style={{
        borderColor: isOpen ? step.color + "66" : "#E5E1D8",
        boxShadow: isOpen ? `0 4px 24px ${step.color}12` : "none",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-[#FAFAF8]"
        aria-expanded={isOpen}
      >
        <span
          className="font-cinzel text-xl font-bold tabular-nums shrink-0 w-8 transition-colors"
          style={{ color: isOpen ? step.color : "#D4C5A9" }}
        >
          {step.number}
        </span>
        <span className="text-xl shrink-0">{step.icon}</span>
        <div className="flex-1 min-w-0">
          <p
            className="font-cinzel font-bold text-base leading-tight transition-colors"
            style={{ color: isOpen ? "#1A1A2E" : "#4A5568" }}
          >
            {step.title}
          </p>
          <p className="font-jost text-base text-[#4A5568]/60 mt-0.5">{step.description}</p>
        </div>
        <div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? step.color + "15" : "#F5F3EF",
            border: `1px solid ${isOpen ? step.color + "44" : "#E5E1D8"}`,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1L5 5L9 1"
              stroke={isOpen ? step.color : "#9CA3AF"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div
          className="px-6 pb-6 pt-2 space-y-4 border-t"
          style={{ borderColor: step.color + "22" }}
        >
          {step.items.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div
                className="shrink-0 mt-[5px] w-2 h-2 rounded-full"
                style={{ background: step.color }}
              />
              <div>
                <p className="font-jost text-sm font-semibold" style={{ color: step.color }}>
                  {item.label}
                </p>
                <p className="font-jost text-base text-[#4A5568] leading-relaxed mt-0.5">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreationFichePage() {
  const [openStep, setOpenStep] = useState<string | null>("identite")

  const toggle = (id: string) => setOpenStep((prev) => (prev === id ? null : id))

  const scrollTo = (id: string) => {
    setOpenStep(id)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 50)
  }

  return (
    <ScrollRevealProvider>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative min-h-[45vh] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0D1B2A 0%, #1a2a3a 40%, #0D1B2A 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(ellipse at 30% 60%, rgba(201,151,74,0.3) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(139,111,71,0.2) 0%, transparent 45%)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #EFF4FB)" }}
          />
          <div className="relative z-10 text-center px-4 pt-24 pb-16">
            <p className="eyebrow text-[#C9974A] mb-4">Guide du joueur</p>
            <h1
              className="font-cinzel font-bold text-[#F0EDE8] mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
            >
              Créer sa Fiche
            </h1>
            <p className="font-jost text-[#F0EDE8]/60 text-lg max-w-xl mx-auto">
              Tout ce qu&apos;il faut savoir pour créer un personnage validé étape par étape.
            </p>
          </div>
        </section>

        {/* ── Sticky nav pills ── */}
        <div className="bg-[#EFF4FB] border-b border-[#D4C5A9] sticky top-16 z-40">
          <div className="max-w-5xl mx-auto px-4 flex gap-0 overflow-x-auto">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="font-jost text-sm font-medium px-5 py-4 border-b-2 border-transparent hover:text-[#C9974A] hover:border-[#C9974A] transition-all duration-150 whitespace-nowrap"
                style={
                  openStep === s.id
                    ? { color: "#C9974A", borderBottomColor: "#C9974A" }
                    : { color: "#4A5568" }
                }
              >
                {s.icon} {s.label}
              </button>
            ))}
            <button
              onClick={() =>
                document.getElementById("regles")?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-jost text-sm font-medium px-5 py-4 text-[#4A5568] hover:text-[#C9974A] border-b-2 border-transparent hover:border-[#C9974A] transition-all duration-150 whitespace-nowrap"
            >
              🚫 Règles
            </button>
            <button
              onClick={() =>
                document.getElementById("roues")?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-jost text-sm font-medium px-5 py-4 text-[#4A5568] hover:text-[#C9974A] border-b-2 border-transparent hover:border-[#C9974A] transition-all duration-150 whitespace-nowrap"
            >
              🎲 Roues
            </button>
          </div>
        </div>

        {/* ── Intro banner ── */}
        <div className="bg-[#EFF4FB] px-6 pt-10 pb-4">
          <div className="max-w-5xl mx-auto">
            <div
              className="reveal rounded-xl p-6 flex flex-col md:flex-row gap-5 items-start"
              style={{
                background: "rgba(201,151,74,0.07)",
                border: "1px solid rgba(201,151,74,0.25)",
              }}
            >
              <div className="text-3xl shrink-0">📝</div>
              <div className="flex-1">
                <p className="font-cinzel font-semibold text-[#C9974A] text-sm mb-2 tracking-wide uppercase">
                  Comment ça marche ?
                </p>
                <p className="font-jost text-[#4A5568] text-base leading-relaxed">
                  Utilise <strong className="text-[#1A1A2E]">Google Docs</strong> pour créer ta fiche à partir du modèle mis à disposition.
                  Remplis chacune des 6 étapes ci-dessous, puis soumets ta fiche au staff pour validation.
                  Les fiches doivent être entièrement rédigées <strong className="text-[#1A1A2E]">en français</strong>, sans langage SMS ni abréviations.
                  Les fautes d&apos;orthographe ne bloqueront pas la validation, mais le staff recommande d&apos;utiliser un correcteur.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href="https://docs.google.com/document/d/1TldX-cjC4TTD68u9TeYuZNnSuWiWWE5C95VQAnZXmNM/edit?tab=t.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-jost font-semibold px-8 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #C9974A, #E8B96A)",
                      color: "#0D1B2A",
                    }}
                  >
                    📄 Utiliser le modèle
                  </a>
                  <a
                    href="https://www.scribens.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-jost text-base font-medium px-4 py-2 rounded-lg border border-[#D4C5A9] text-[#4A5568] hover:border-[#C9974A] hover:text-[#C9974A] transition-all"
                  >
                    🔤 Corriger sa fiche
                  </a>
                  <a
                    href="https://discord.com/channels/693568556217925652/1054032960480874586"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-jost text-base font-medium px-4 py-2 rounded-lg border border-[#D4C5A9] text-[#4A5568] hover:border-[#C9974A] hover:text-[#C9974A] transition-all"
                  >
                    🗳️ Déposer sa fiche
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Steps accordion ── */}
        <section className="bg-[#EFF4FB] px-6 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="reveal flex items-center gap-6 mb-8">
              <div>
                <p className="eyebrow text-[#C9974A] mb-1">Étape par étape</p>
                <h2 className="font-cinzel font-bold text-2xl text-[#1A1A2E]">
                  Les 6 éléments obligatoires
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4C5A9] to-transparent hidden md:block" />
            </div>

            <div className="space-y-3">
              {steps.map((step) => (
                <div key={step.id} id={step.id}>
                  <StepCard
                    step={step}
                    isOpen={openStep === step.id}
                    onToggle={() => toggle(step.id)}
                  />
                </div>
              ))}
            </div>

            {/* IA notice */}
            <div
              className="reveal mt-4 rounded-xl p-5 flex gap-4 items-start bg-white border"
              style={{ borderColor: "rgba(41,128,185,0.25)" }}
            >
              <span className="text-2xl shrink-0">🤖</span>
              <div>
                <p className="font-jost font-semibold text-[#2980B9] text-base mb-1">
                  Note sur l&apos;utilisation de l&apos;IA
                </p>
                <p className="font-jost text-base text-[#4A5568] leading-relaxed">
                  Une fiche doit être <strong className="text-[#1A1A2E]">ta propre création</strong>. L&apos;utilisation massive de l&apos;IA à des fins de rédaction est proscrite.
                  Tu peux toutefois l&apos;utiliser pour la <strong className="text-[#1A1A2E]">correction orthographique</strong> ou pour générer des <strong className="text-[#1A1A2E]">illustrations visuelles</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Règles ── */}
        <section
          id="regles"
          className="px-6 py-16 bg-[#F8FAFD] border-t border-[#D4C5A9]/40"
        >
          <div className="max-w-5xl mx-auto">
            <div className="reveal flex items-center gap-6 mb-8">
              <div>
                <p className="eyebrow text-[#C9974A] mb-1">À respecter absolument</p>
                <h2 className="font-cinzel font-bold text-2xl text-[#1A1A2E]">
                  Règles & contraintes
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4C5A9] to-transparent hidden md:block" />
            </div>

            <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-3">
              {rules.map((rule, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start rounded-lg px-4 py-3.5 bg-white border border-[#E5E1D8] hover:border-[#D4C5A9] transition-colors"
                >
                  <span className="text-base shrink-0 mt-0.5">{rule.icon}</span>
                  <p className="font-jost text-base text-[#4A5568] leading-snug">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Roues du destin ── */}
        <section
          id="roues"
          className="px-6 py-16 bg-[#EFF4FB] border-t border-[#D4C5A9]/40"
        >
          <div className="max-w-5xl mx-auto">
            <div className="reveal text-center mb-10">
              <p className="eyebrow text-[#C9974A] mb-2">En manque d&apos;inspiration ?</p>
              <h2 className="font-cinzel font-bold text-2xl text-[#1A1A2E] mb-3">
                Les Roues du Destin
              </h2>
              <p className="font-jost text-[#4A5568] text-base max-w-xl mx-auto">
                Laisse le hasard décider pour toi. Clique sur une roue et accepte ce que le destin t&apos;offre.
              </p>
            </div>

            <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4">
              {wheels.map((wheel, i) => (
                <a
                  key={i}
                  href={wheel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-xl p-6 text-center border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderColor: wheel.color + "33" }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${wheel.color}10, transparent 70%)`,
                    }}
                  />
                  <div className="text-4xl mb-3">{wheel.icon}</div>
                  <p className="font-cinzel font-bold text-[#1A1A2E] text-base mb-2">
                    {wheel.label}
                  </p>
                  <p className="font-jost text-xs text-[#4A5568]/70 leading-snug mb-4">
                    {wheel.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 font-jost text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                    style={{
                      background: wheel.color + "15",
                      border: `1px solid ${wheel.color}44`,
                      color: wheel.color,
                    }}
                  >
                    Lancer la roue
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M6 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            <p className="reveal font-jost text-xs text-center mt-5 text-[#4A5568]/50">
              Note : Les roues respectent les mêmes contraintes que les choix manuels. Ex : Hybride + Thérianthrope → pas de seconde race possible.
            </p>
          </div>
        </section>

        {/* ── Ressources & conseils ── */}
        <section className="px-6 py-16 bg-[#F8FAFD] border-t border-[#D4C5A9]/40">
          <div className="max-w-5xl mx-auto">
            <div className="reveal flex items-center gap-6 mb-8">
              <div>
                <p className="eyebrow text-[#C9974A] mb-1">Pour aller plus loin</p>
                <h2 className="font-cinzel font-bold text-2xl text-[#1A1A2E]">
                  Ressources & conseils
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4C5A9] to-transparent hidden md:block" />
            </div>

            <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: "🏰",
                  title: "Explore les nations",
                  text: "Parcours les descriptions de chaque nation avant de choisir. L'environnement de ta nation définira l'atmosphère de ton personnage et t'inspirera pour son histoire.",
                  link: "/nations",
                  linkLabel: "Voir les nations →",
                  color: "#C9974A",
                  external: false,
                },
                {
                  icon: "📚",
                  title: "Lis l'histoire d'Izaria",
                  text: "Les guerres, les renversements de pouvoir, les grands événements... Tout est là pour enrichir le passé de ton personnage et ancrer ta fiche dans le lore.",
                  link: "/histoire",
                  linkLabel: "Lire l'histoire →",
                  color: "#27AE60",
                  external: false,
                },
                {
                  icon: "🧬",
                  title: "Consulte les Races & Classes",
                  text: "Chaque race a ses particularités. Si tu joues un vampire ou un hybride, l'histoire de ta race doit se refléter dans ta fiche. Toutes les combinaisons sont possibles.",
                  link: "/races-et-classes",
                  linkLabel: "Voir les races →",
                  color: "#8B6FBF",
                  external: false,
                },
                {
                  icon: "🗂️",
                  title: "Les fiches validées",
                  text: "Des centaines de fiches validées sont disponibles dans les archives du serveur Discord. C'est la meilleure source d'inspiration pour comprendre le niveau attendu.",
                  link: "https://discord.gg/BXEMWVZYjZ",
                  linkLabel: "Accéder aux archives →",
                  color: "#2980B9",
                  external: true,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group rounded-xl p-6 border bg-white transition-all hover:shadow-md hover:-translate-y-0.5 duration-200"
                  style={{ borderColor: card.color + "30" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4"
                    style={{ background: card.color + "15" }}
                  >
                    {card.icon}
                  </div>
                  <p className="font-cinzel font-bold text-[#1A1A2E] text-sm mb-2">{card.title}</p>
                  <p className="font-jost text-base text-[#4A5568] leading-relaxed mb-4">{card.text}</p>
                  <a
                    href={card.link}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="font-jost text-xs font-semibold transition-colors hover:opacity-80"
                    style={{ color: card.color }}
                  >
                    {card.linkLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section
          className="relative px-6 py-20 text-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0D1B2A 0%, #0D1B2A 50%, #0D1B2A 100%)" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, hsla(0, 0%, 99%, 0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-xl mx-auto">
            <p className="reveal eyebrow text-[#C9974A] mb-4">Tu es prêt ?</p>
            <h2 className="reveal font-cinzel font-bold text-3xl md:text-4xl text-[#F0EDE8] mb-4">
              Commence ta fiche
            </h2>
            <p className="reveal font-jost text-[#F0EDE8]/55 text-base mb-10">
              Le monde d&apos;Izaria n&apos;attend plus que ton personnage.
            </p>
            <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.google.com/document/d/1TldX-cjC4TTD68u9TeYuZNnSuWiWWE5C95VQAnZXmNM/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost font-semibold px-8 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #C9974A, #E8B96A)",
                  color: "#0D1B2A",
                }}
              >
                📄 Utiliser le modèle
              </a>
              <a
                href="/nations"
                className="font-jost font-medium px-8 py-3.5 rounded-lg border border-[#D4C5A9]/25 text-[#F0EDE8]/75 hover:border-[#D4C5A9]/50 hover:text-[#F0EDE8] transition-all"
              >
                Explorer les nations
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </ScrollRevealProvider>
  )
}