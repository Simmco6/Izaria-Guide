"use client"

import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"
import Image from "next/image"

// ─── Data ─────────────────────────────────────────────────────────────────────

const races = [
  {
    slug: "humain",
    name: "Humain",
    subtitle: "La race la plus répandue d'Izaria",
    description: "Polyvalents et adaptables, les humains s'épanouissent dans toutes les nations. Leur durée de vie courte les pousse à accomplir de grandes choses en peu de temps.",
    traits: ["2 m max", "80–100 ans"],
    lifespan: "80–100 ans",
    accent: "#C9974A",
  },
  {
    slug: "demon2",
    name: "Démon",
    subtitle: "Êtres des abysses",
    description: "Créatures des profondeurs infernales, les démons arborent des cornes imposantes et une stature colossale. Leur nature démoniaque les rend redoutables au combat.",
    traits: ["3 m max", "600 ans", "Cornes"],
    lifespan: "600 ans",
    accent: "#C04040",
  },
  {
    slug: "ange",
    name: "Ange",
    subtitle: "Messagers du divin",
    description: "Êtres célestes aux ailes d'une blancheur immaculée, les anges sont les gardiens de la lumière à Izaria. Leur présence inspire autant la dévotion que la crainte.",
    traits: ["3 m max", "600 ans", "Ailes blanches"],
    lifespan: "600 ans",
    accent: "#E8D4A0",
  },
  {
    slug: "dechu",
    name: "Ange Déchu",
    subtitle: "Lumière corrompue",
    description: "Anges bannis et déchus, leurs ailes jadis blanches ont noirci sous le poids de leur chute. Tiraillés entre leur nature céleste et leur damnation, ils errent à la frontière du bien et du mal.",
    traits: ["3 m max", "600 ans", "Ailes noires"],
    lifespan: "600 ans",
    accent: "#7A7A8C",
  },
  {
    slug: "therianthrope",
    name: "Thérianthrope",
    subtitle: "L'humain et la bête",
    description: "Mi-humains, mi-animaux, les thérianthropes portent les signes distinctifs de leur animal totem. En tant que race déjà hybride, ils ne peuvent être hybridés davantage.",
    traits: ["2 m max", "80–100 ans", "Signe animal", "Non hybridable"],
    lifespan: "80–100 ans",
    accent: "#8B6E4E",
  },
  {
    slug: "mort-vivant",
    name: "Mort-Vivant",
    subtitle: "Entre vie et trépas",
    description: "Revenus des royaumes de la mort, les morts-vivants existent sous deux formes : corps en décomposition ou squelette. Leur persistance au-delà de la mort reste un mystère.",
    traits: ["2 m max", "400 ans", "Corps en décomposition"],
    lifespan: "400 ans",
    accent: "#6B7A5A",
  },
  {
    slug: "vampire",
    name: "Vampire",
    subtitle: "Seigneurs de la nuit",
    description: "Prédateurs nocturnes aux dents acérées, les vampires se nourrissent de sang et fuient la lumière du soleil. Leur longévité exceptionnelle leur a permis d'accumuler pouvoir et secrets.",
    traits: ["2,5 m max", "600 ans", "Se nourrit de sang", "Craint le soleil"],
    lifespan: "600 ans",
    accent: "#B85555",
  },
  {
    slug: "orc",
    name: "Orc",
    subtitle: "Guerriers à la peau verte",
    description: "Reconnaissables à leur peau verte et leur stature imposante, les orcs sont des combattants nés. Leur force brute et leur endurance font d'eux de redoutables adversaires.",
    traits: ["2,5 m max", "200 ans", "Peau verte"],
    lifespan: "200 ans",
    accent: "#6B8F5E",
  },
  {
    slug: "geant",
    name: "Géant",
    subtitle: "Colosses d'Izaria",
    description: "Atteignant jusqu'à cinq mètres de hauteur, les géants sont les plus imposants habitants d'Izaria. Leur taille extraordinaire fait d'eux des alliés précieux — ou des ennemis terrifiants.",
    traits: ["5 m max", "80–100 ans", "Taille colossale"],
    lifespan: "80–100 ans",
    accent: "#A09070",
  },
  {
    slug: "fae",
    name: "Fae",
    subtitle: "Esprits de la nature",
    description: "Petits êtres féeriques aux oreilles elfiques et aux ailes de papillon délicates, les Fae sont liés à la nature et à la magie primitive. Ne vous fiez pas à leur taille : leur esprit est vif et leur magie puissante.",
    traits: ["1,5 m max", "200 ans", "Oreilles elfiques", "Ailes de papillon"],
    lifespan: "200 ans",
    accent: "#9B7BB8",
  },
  {
    slug: "ghoul",
    name: "Ghoul",
    subtitle: "Dévoreurs des ombres",
    description: "Créatures aux yeux perçants qui se nourrissent de chair fraîche, les ghouls vivent en marge de la société. Leur apparence inquiétante cache des êtres capables de loyauté profonde envers leur clan.",
    traits: ["2 m max", "80–100 ans", "Yeux perçants", "Se nourrit de chair"],
    lifespan: "80–100 ans",
    accent: "#7A8C6B",
  },
  {
    slug: "nain",
    name: "Nain",
    subtitle: "Forgerons des profondeurs",
    description: "Petits mais robustes, les nains sont maîtres de la forge et de la montagne. Leur longévité et leur ténacité font d'eux des artisans et guerriers de légende.",
    traits: ["1,5 m max", "250 ans", "Petite taille"],
    lifespan: "250 ans",
    accent: "#A0785A",
  },
  {
    slug: "elfe",
    name: "Elfe",
    subtitle: "Anciens aux oreilles pointues",
    description: "Reconnaissables à leurs oreilles elfiques et leur stature élancée, les elfes sont une race ancienne et gracieuse. Leur longévité leur a permis de maîtriser arts, magie et diplomatie.",
    traits: ["3 m max", "200 ans", "Oreilles elfiques"],
    lifespan: "200 ans",
    accent: "#7EB88A",
  },
  {
    slug: "hybride",
    name: "Hybride",
    subtitle: "Né de deux races",
    description: "Les hybrides héritent des caractéristiques des deux races parentales selon leur gène dominant. Les gobelins (orc + nain) et les ologs (géant + orc) sont des hybrides notables. Certaines combinaisons restent interdites.",
    traits: ["Variable", "Gène dominant", "Règles spéciales"],
    lifespan: "Variable",
    accent: "#C9974A",
    note: "Non autorisés : Dragon+autre · Esprit+autre · Goblin+autre · Olog+autre",
  },
]

const classes = [
  {
    slug: "guerrier",
    name: "Guerrier",
    subtitle: "Maître du combat",
    description:
      "Expert dans toutes les armes et armures, le guerrier est le pilier de toute compagnie. Sa discipline martiale et sa résistance en font un combattant redoutable.",
    traits: ["Combat rapproché", "Résistant", "Polyvalent"],
    role: "DPS / Tank",
    accent: "#C9974A",
  },
  {
    slug: "mage",
    name: "Mage",
    subtitle: "Tisserand des arcanes",
    description:
      "Maîtrisant les forces mystiques de l'univers, le mage peut déclencher des sorts dévastateurs ou subtils. Sa fragilité physique est compensée par une puissance magique sans égale.",
    traits: ["Sorts puissants", "Érudit", "Fragile"],
    role: "DPS / Support",
    accent: "#6B9AC9",
  },
  {
    slug: "voleur",
    name: "Voleur",
    subtitle: "Maître des ombres",
    description:
      "Discret et létal, le voleur opère dans l'ombre. Ses techniques de furtivité, de crochetage et d'assassinat en font l'outil idéal pour les missions délicates.",
    traits: ["Furtif", "Précis", "Débrouillard"],
    role: "DPS / Utilitaire",
    accent: "#7A7A8C",
  },
  {
    slug: "paladin",
    name: "Paladin",
    subtitle: "Champion divin",
    description:
      "Guerrier sacré portant la lumière dans les ténèbres, le paladin allie combat et guérison. Son aura sacrée protège ses alliés et terrifie les morts-vivants.",
    traits: ["Aura sacrée", "Guérisseur", "Protecteur"],
    role: "Tank / Support",
    accent: "#D4AF37",
  },
  {
    slug: "rodeur",
    name: "Rôdeur",
    subtitle: "Traqueur des terres sauvages",
    description:
      "À l'aise dans toutes les contrées sauvages, le rôdeur est un chasseur et un traqueur hors pair. Son lien avec la nature lui confère des sens aiguisés.",
    traits: ["Traqueur", "Archer", "Survivaliste"],
    role: "DPS / Scout",
    accent: "#6B8F5E",
  },
  {
    slug: "clerc",
    name: "Clerc",
    subtitle: "Serviteur des dieux",
    description:
      "Canal entre le divin et le mortel, le clerc canalise la volonté de son dieu pour guérir ses alliés ou terrasser ses ennemis. Un pilier indispensable de toute quête.",
    traits: ["Guérison", "Sorts divins", "Bouclier"],
    role: "Support / DPS",
    accent: "#E8D4A0",
  },
  {
    slug: "barbare",
    name: "Barbare",
    subtitle: "Fureur incarnée",
    description:
      "Puisant dans une rage primitive, le barbare est un ouragan de destruction au corps-à-corps. Sa résistance à la douleur et sa force brute dépassent toutes les limites.",
    traits: ["Rage", "Force brute", "Endurant"],
    role: "DPS / Tank",
    accent: "#B85555",
  },
  {
    slug: "barde",
    name: "Barde",
    subtitle: "Maître de l'inspiration",
    description:
      "Musicien, conteur et magicien à la fois, le barde utilise son art pour influencer les esprits, galvaniser ses compagnons et dérouter ses ennemis.",
    traits: ["Inspiration", "Magie arcane", "Polyvalent"],
    role: "Support / Utilitaire",
    accent: "#9B7BB8",
  },
]

// ─── Card Component ────────────────────────────────────────────────────────────

function Card({
  item,
  type,
}: {
  item: (typeof races)[0] | (typeof classes)[0]
  type: "race" | "class"
}) {
  const [hovered, setHovered] = useState(false)
  const folder = type === "race" ? "races" : "classes"

  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500"
      style={{
        background: "linear-gradient(160deg, #111827 0%, #0D1B2A 100%)",
        border: `1px solid ${hovered ? item.accent + "60" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? `0 20px 60px ${item.accent}20, 0 0 0 1px ${item.accent}30`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative h-52 overflow-hidden">
        {/* Gradient overlay from bottom */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, #0D1B2A 0%, #0D1B2A 10%, rgba(13,27,42,0.6) 50%, transparent 100%)`,
          }}
        />
        {/* Accent color overlay on hover */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${item.accent}18 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
        {/* The image */}
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        >
          <Image
            src={`/${folder}/${item.slug}.png`}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top"
            style={{
              opacity: hovered ? 0.85 : 0.55,
              transition: "opacity 0.5s ease",
            }}
          />
        </div>

        {/* Role/lifespan badge */}
        <div className="absolute top-3 right-3 z-20">
          <span
            className="font-jost text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(13,27,42,0.85)",
              border: `1px solid ${item.accent}50`,
              color: item.accent,
              backdropFilter: "blur(8px)",
            }}
          >
            {"role" in item ? item.role : item.lifespan}
          </span>
        </div>

        {/* Name overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <h3
            className="font-cinzel font-bold text-xl text-white leading-tight"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
          >
            {item.name}
          </h3>
          <p
            className="font-eb-garamond italic text-sm mt-0.5"
            style={{ color: item.accent }}
          >
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-3">
        <p className="font-eb-garamond text-[0.9rem] leading-relaxed text-[#F0EDE8]/65 line-clamp-3">
          {item.description}
        </p>

        {/* Traits */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.traits.map((trait) => (
            <span
              key={trait}
              className="font-jost text-[0.65rem] font-medium uppercase tracking-wide px-2 py-0.5 rounded"
              style={{
                background: `${item.accent}12`,
                border: `1px solid ${item.accent}25`,
                color: `${item.accent}CC`,
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Note spéciale (ex: Hybride) */}
        {"note" in item && (item as { note?: string }).note && (
          <p className="mt-3 font-jost text-[0.6rem] leading-relaxed text-[#F0EDE8]/35 border-t border-white/5 pt-3">
            {(item as { note?: string }).note}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({
  tag,
  title,
  subtitle,
  accent = "#C9974A",
}: {
  tag: string
  title: string
  subtitle: string
  accent?: string
}) {
  return (
    <div className="reveal mb-12">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px flex-1 max-w-[60px]" style={{ background: accent }} />
        <span
          className="font-jost text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {tag}
        </span>
      </div>
      <h2 className="font-cinzel font-bold text-3xl md:text-4xl text-[#F0EDE8] mb-3">
        {title}
      </h2>
      <p className="font-eb-garamond italic text-lg text-[#F0EDE8]/55 max-w-xl">
        {subtitle}
      </p>
    </div>
  )
}

// ─── Tab Component ─────────────────────────────────────────────────────────────

function Tab({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2.5 px-6 py-3 font-jost font-medium text-sm transition-all duration-300"
      style={{
        color: active ? "#F0EDE8" : "rgba(240,237,232,0.45)",
        borderBottom: active
          ? "2px solid #C9974A"
          : "2px solid transparent",
      }}
    >
      {children}
      <span
        className="text-xs px-1.5 py-0.5 rounded font-jost"
        style={{
          background: active ? "rgba(201,151,74,0.18)" : "rgba(255,255,255,0.06)",
          color: active ? "#C9974A" : "rgba(240,237,232,0.3)",
        }}
      >
        {count}
      </span>
    </button>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function RacesEtClassesPage() {
  const [activeTab, setActiveTab] = useState<"races" | "classes">("races")

  return (
    <ScrollRevealProvider>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative min-h-[420px] flex items-end pb-16 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #0D1B2A 0%, #1A2A3A 60%, #0D1B2A 100%)",
          }}
        >
          {/* Grain texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(201,151,74,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Top gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(13,27,42,0.9), transparent)",
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
            <div className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#C9974A]" />
                <span className="font-jost text-xs font-semibold uppercase tracking-[0.2em] text-[#C9974A]">
                  Guide du joueur
                </span>
              </div>
              <h1 className="font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl text-[#F0EDE8] leading-tight mb-4">
                Races &amp; Classes
              </h1>
              <p className="font-eb-garamond italic text-xl md:text-2xl text-[#F0EDE8]/55 max-w-2xl leading-relaxed">
                Choisissez l&apos;identité de votre personnage parmi les races et les vocations disponibles dans le monde d&apos;Izaria.
              </p>
            </div>

            {/* Stats pills */}
            <div className="reveal flex flex-wrap gap-3 mt-8">
              {[
                { label: "Races jouables", value: races.length.toString() },
                { label: "Classes disponibles", value: classes.length.toString() },
                { label: "Combinaisons", value: "Toutes" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(201,151,74,0.08)",
                    border: "1px solid rgba(201,151,74,0.2)",
                  }}
                >
                  <span className="font-cinzel font-bold text-base text-[#C9974A]">
                    {stat.value}
                  </span>
                  <span className="font-jost text-xs text-[#F0EDE8]/45 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tabs ── */}
        <div
          className="sticky top-0 z-40"
          style={{
            background: "rgba(13,27,42,0.92)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-1">
              <Tab
                active={activeTab === "races"}
                onClick={() => setActiveTab("races")}
                count={races.length}
              >
                Races
              </Tab>
              <Tab
                active={activeTab === "classes"}
                onClick={() => setActiveTab("classes")}
                count={classes.length}
              >
                Classes
              </Tab>
            </div>
          </div>
        </div>

        {/* ── Grid Section ── */}
        <section
          className="py-16 px-6 min-h-screen"
          style={{
            background: "linear-gradient(to bottom, #0D1B2A 0%, #111827 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto">

            {activeTab === "races" && (
              <div>
                <SectionHeader
                  tag="Races jouables"
                  title="Choisissez votre race"
                  subtitle="Chaque race possède son histoire, sa culture et ses particularités. Toutes les combinaisons avec les classes sont autorisées."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {races.map((race) => (
                    <div key={race.slug} className="reveal">
                      <Card item={race} type="race" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "classes" && (
              <div>
                <SectionHeader
                  tag="Classes disponibles"
                  title="Choisissez votre classe"
                  subtitle="La classe définit le métier et le style de combat de votre personnage. Elle est obligatoire lors de la création de fiche."
                  accent="#6B9AC9"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {classes.map((cls) => (
                    <div key={cls.slug} className="reveal">
                      <Card item={cls} type="class" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-20 px-6"
          style={{
            background: "linear-gradient(160deg, #0D1B2A 0%, #1a2a3a 100%)",
            borderTop: "1px solid rgba(201,151,74,0.12)",
          }}
        >
          <div className="max-w-2xl mx-auto text-center reveal">
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(201,151,74,0.08)",
                border: "1px solid rgba(201,151,74,0.2)",
              }}
            >
              <span className="font-jost text-xs font-semibold uppercase tracking-widest text-[#C9974A]">
                Prochaine étape
              </span>
            </div>
            <h2 className="font-cinzel font-bold text-3xl md:text-4xl text-[#F0EDE8] mb-4">
              Prêt à créer votre personnage ?
            </h2>
            <p className="font-eb-garamond italic text-lg text-[#F0EDE8]/50 mb-8 max-w-lg mx-auto leading-relaxed">
              Une fois votre race et votre classe choisies, suivez le guide complet de création de fiche.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/creation-dune-fiche"
                className="font-jost font-semibold px-8 py-3.5 rounded-lg transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #C9974A, #E8B96A)",
                  color: "#0D1B2A",
                  boxShadow: "0 4px 20px rgba(201,151,74,0.3)",
                }}
              >
                Créer ma fiche
              </a>
              <a
                href="/nations"
                className="font-jost font-medium px-8 py-3.5 rounded-lg border transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(240,237,232,0.12)",
                  color: "rgba(240,237,232,0.6)",
                }}
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