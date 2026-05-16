"use client"

import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"
import Image from "next/image"

// ─── Data ─────────────────────────────────────────────────────────────────────

type Spell = {
  name: string
  level: number
  classes: string[]
  castingTime: string
  range: string
  components: string
  duration: string
  description: string
  upcast?: string
}

type Magic = {
  slug: string
  name: string
  subtitle: string
  color: string
  glow: string
  icon: string
  description: string
  traits: string[]
  forbidden: string
  spell: Spell
}

const magics: Magic[] = [
  {
    slug: "blood",
    name: "Sang",
    subtitle: "La magie de la vie et de la douleur",
    color: "#C0392B",
    glow: "rgba(192,57,43,0.12)",
    icon: "/pouvoirs/Blood.png",
    description: "Née des veines du monde vivant, la magie du Sang puise son pouvoir dans l'essence vitale des êtres. Ceux qui la maîtrisent tissent la vie et la mort comme d'autres tissent le fil.",
    traits: ["Vampirique", "Régénération", "Contrôle des corps"],
    forbidden: "Limité au sang propre du personnage (6 litres max).",
    spell: {
      name: "Lame Sanguine",
      level: 2,
      classes: ["Ensorceleur", "Sorcier"],
      castingTime: "Action",
      range: "Soi (ligne de 5 mètres)",
      components: "V, S",
      duration: "Concentration, jusqu'à 1 minute",
      description: "Vous arrachez le sang de vos veines et le solidifiez en un jet tranchant. Chaque créature sur la ligne doit réussir un jet de sauvegarde de Dextérité ou subir 3d6 dégâts tranchants, la moitié en cas de succès. Vous récupérez la moitié des dégâts infligés sous forme de points de vie.",
      upcast: "Les dégâts augmentent de 1d6 par niveau d'emplacement supplémentaire.",
    },
  },
  {
    slug: "earth",
    name: "Terre",
    subtitle: "L'immuable force du monde souterrain",
    color: "#8B5E3C",
    glow: "rgba(139,94,60,0.12)",
    icon: "/pouvoirs/Earth.png",
    description: "La Terre est la plus ancienne des magies — elle précède les dieux eux-mêmes. Ses praticiens deviennent aussi inamovibles que la roche et aussi patients que la montagne.",
    traits: ["Fortification", "Séismes", "Pétrification"],
    forbidden: "La magie de Terre ne peut jamais être lancée en vol ou sans contact avec le sol.",
    spell: {
      name: "Carapace de Pierre",
      level: 1,
      classes: ["Sorcier", "Vagabond", "Mage"],
      castingTime: "Action",
      range: "Soi",
      components: "V, S",
      duration: "1 minute",
      description: "Votre peau se couvre d'une fine couche de roche vivante, chaude et vibrante. La première fois que vous subissez des dégâts à chaque tour, réduisez ces dégâts de 1d6. Les éclats de pierre tombent de vous comme des larmes.",
    },
  },
  {
    slug: "fire",
    name: "Feu",
    subtitle: "La danse éternelle de la destruction",
    color: "#E04B1A",
    glow: "rgba(224,75,26,0.12)",
    icon: "/pouvoirs/Fire.png",
    description: "Impulsive et dévorante, la magie du Feu est la plus instinctive à maîtriser — et la plus difficile à dompter. Elle brûle aussi vite dans l'âme du lanceur que dans sa cible.",
    traits: ["Combustion", "Zone de feu", "Explosion"],
    forbidden: "Le feu ne distingue pas ami et ennemi. Toute zone enflammée est incontrôlable.",
    spell: {
      name: "Jet de Flammes",
      level: 2,
      classes: ["Ensorceleur", "Mage"],
      castingTime: "Action",
      range: "Soi (ligne de 5 mètres)",
      components: "V, S",
      duration: "Concentration, jusqu'à 1 minute",
      description: "Un torrent de feu jaillit de votre paume. Chaque créature sur la ligne doit réussir un jet de Dextérité ou subir 3d6 dégâts de feu, la moitié en cas de succès. Vous pouvez recracher les flammes à chacun de vos tours suivants en dépensant votre action.",
      upcast: "Les dégâts augmentent de 1d6 par niveau d'emplacement supplémentaire.",
    },
  },
  {
    slug: "lightning",
    name: "Foudre",
    subtitle: "La rapidité incarnée des cieux",
    color: "#C49A00",
    glow: "rgba(196,154,0,0.12)",
    icon: "/pouvoirs/Lightning.png",
    description: "La Foudre ne s'accumule pas — elle frappe. Ses utilisateurs vivent dans l'instant, leurs sorts partant avant même que leur esprit ne les ait conscientisés.",
    traits: ["Rapidité", "Paralysie", "Chaîne d'éclairs"],
    forbidden: "Un sort de Foudre ne peut jamais être maintenu en Concentration au-delà de 3 tours.",
    spell: {
      name: "Arc Galvanique",
      level: 2,
      classes: ["Ensorceleur", "Mage"],
      castingTime: "Réaction",
      range: "18 mètres",
      components: "V",
      duration: "Instantané",
      description: "Quand une créature que vous voyez attaque, vous libérez un arc électrique qui bondit vers elle avant même que le coup ne tombe. La cible subit 3d6 dégâts de foudre et doit réussir un jet de Constitution ou être paralysée jusqu'à la fin de son tour.",
      upcast: "Les dégâts augmentent de 1d6 par niveau d'emplacement supplémentaire.",
    },
  },
  {
    slug: "nature",
    name: "Nature",
    subtitle: "La voix verte de la forêt primordiale",
    color: "#27AE60",
    glow: "rgba(39,174,96,0.12)",
    icon: "/pouvoirs/Nature.png",
    description: "La Nature parle à ceux qui savent écouter. Ses mages ne commandent pas le monde vivant — ils le demandent. Et parfois, il accepte.",
    traits: ["Croissance", "Soin", "Communion animale"],
    forbidden: "Brûler ou détruire une forêt en présence de son mage de Nature est une faute impardonnable.",
    spell: {
      name: "Réseau des Racines",
      level: 2,
      classes: ["Druide", "Rôdeur"],
      castingTime: "Action",
      range: "18 mètres (zone de 3 mètres)",
      components: "V, S",
      duration: "Concentration, jusqu'à 1 minute",
      description: "Le sol s'ouvre et des racines vivantes jaillissent pour enchevêtrer vos ennemis. Chaque créature dans la zone doit réussir un jet de Force ou être entravée. Une créature entravée peut tenter de se libérer à chacun de ses tours en dépensant son action.",
      upcast: "La zone augmente de 1,5 mètre par niveau supplémentaire.",
    },
  },
  {
    slug: "necromancy",
    name: "Nécromancie",
    subtitle: "Le murmure des âmes perdues",
    color: "#171618",
    glow: "rgba(23,22,24,0.15)",
    icon: "/pouvoirs/Necromancy.png",
    description: "La Nécromancie ne crée pas la mort — elle en est la continuation. Ses praticiens voient là où les autres ferment les yeux, et dialoguent avec ce que les vivants préfèrent oublier.",
    traits: ["Invocation de morts", "Drain de vie", "Vision des ombres"],
    forbidden: "Un nécromancien ne peut jamais rappeler une âme qui a refusé de revenir.",
    spell: {
      name: "Étreinte Spectrale",
      level: 2,
      classes: ["Mage", "Sorcier"],
      castingTime: "Action",
      range: "9 mètres",
      components: "V, S",
      duration: "Concentration, jusqu'à 1 minute",
      description: "Une main fantôme émerge du sol et saisit une créature. La cible doit réussir un jet de Constitution ou subir 2d8 dégâts nécrotiques et voir sa vitesse réduite à 0. Vous récupérez autant de points de vie que la moitié des dégâts infligés.",
      upcast: "Les dégâts augmentent de 1d6 par niveau supplémentaire.",
    },
  },
  {
    slug: "rune",
    name: "Rune",
    subtitle: "La mémoire gravée dans la pierre",
    color: "#7F8C8D",
    glow: "rgba(127,140,141,0.12)",
    icon: "/pouvoirs/Rune.png",
    description: "Les Runes précèdent le langage. Elles sont la grammaire du monde, inscrites dans la roche avant même que les mortels existent. Leurs mages ne créent pas — ils révèlent.",
    traits: ["Glyphes", "Boucliers arcanes", "Amplification"],
    forbidden: "Une rune gravée est permanente. Elle ne peut être effacée, seulement scellée.",
    spell: {
      name: "Verrou Runique",
      level: 1,
      classes: ["Mage", "Paladin"],
      castingTime: "Action",
      range: "Contact",
      components: "V, S, M (craie de pierre argentée)",
      duration: "Jusqu'à être déclenchée",
      description: "Vous inscrivez une rune invisible sur une surface. La prochaine créature qui marche sur cette rune sans connaître le mot de passe déclenche une explosion d'énergie arcane : 4d6 dégâts de force dans une zone de 1,5 mètre.",
      upcast: "Les dégâts augmentent de 2d6 par niveau supplémentaire.",
    },
  },
  {
    slug: "water",
    name: "Eau",
    subtitle: "L'éternelle adaptabilité des profondeurs",
    color: "#2980B9",
    glow: "rgba(41,128,185,0.12)",
    icon: "/pouvoirs/Water.png",
    description: "L'Eau ne résiste à rien — elle contourne, s'infiltre, submerge. Ses mages ont compris que la force véritable n'est pas dans la résistance mais dans la persistance.",
    traits: ["Submersion", "Soin", "Purification"],
    forbidden: "La magie de l'Eau ne peut jamais assécher ce qui est vivant.",
    spell: {
      name: "Vague Déferlante",
      level: 2,
      classes: ["Druide", "Ensorceleur"],
      castingTime: "Action",
      range: "Soi (cône de 9 mètres)",
      components: "V, S",
      duration: "Instantané",
      description: "Une vague d'eau surgit de vos mains et balaie tout sur son passage. Chaque créature dans le cône doit réussir un jet de Force ou subir 3d6 dégâts contondants et être renversée. L'eau s'évapore ensuite dans les airs.",
      upcast: "Les dégâts augmentent de 1d6 par niveau supplémentaire.",
    },
  },
  {
    slug: "wind",
    name: "Vent",
    subtitle: "La liberté insaisissable des cieux",
    color: "#1ABC9C",
    glow: "rgba(26,188,156,0.12)",
    icon: "/pouvoirs/Wind.png",
    description: "Le Vent est la magie de ceux qui refusent d'être saisis. Ses utilisateurs glissent entre les coups, dansent dans les tempêtes, et disparaissent avant que leurs ennemis ne comprennent ce qui s'est passé.",
    traits: ["Vitesse", "Évasion", "Tempête"],
    forbidden: "La magie du Vent ne peut jamais être utilisée dans un espace clos sans risque de retournement.",
    spell: {
      name: "Bourrasque Tranchante",
      level: 2,
      classes: ["Druide", "Rôdeur", "Ensorceleur"],
      castingTime: "Action",
      range: "Soi (ligne de 18 mètres)",
      components: "V, S",
      duration: "Instantané",
      description: "Un couloir de vent comprimé fuse entre vos doigts avec un sifflement aigu. Chaque créature sur la ligne doit réussir un jet de Force ou subir 2d8 dégâts tranchants et être repoussée de 4,5 mètres. Les créatures de petite taille ont un désavantage au jet.",
      upcast: "Les dégâts augmentent de 1d6 par niveau supplémentaire.",
    },
  },
  {
    slug: "ice",
    name: "Glace",
    subtitle: "L'immobilité éternelle du grand froid",
    color: "#5DADE2",
    glow: "rgba(93,173,226,0.12)",
    icon: "/pouvoirs/Ice.png",
    description: "La Glace est la magie de la patience et de la finitude. Là où le Feu consume, la Glace préserve — et fige pour toujours. Ses mages apprennent à ralentir le monde avant de l'arrêter.",
    traits: ["Immobilisation", "Armure de givre", "Cristallisation"],
    forbidden: "La température maximale du froid généré doit être précisée en °C. Tout gel d'un liquide vital (sang, eau corporelle) est interdit.",
    spell: {
      name: "Geôle de Givre",
      level: 2,
      classes: ["Mage", "Ensorceleur"],
      castingTime: "Action",
      range: "18 mètres",
      components: "V, S",
      duration: "Concentration, jusqu'à 1 minute",
      description: "Des éclats de glace jaillissent du sol autour d'une créature. La cible doit réussir un jet de Constitution ou subir 2d8 dégâts de froid et voir sa vitesse réduite de moitié. Si elle échoue de 5 ou plus, elle est entièrement figée jusqu'à la fin de son prochain tour.",
      upcast: "Les dégâts augmentent de 1d6 par niveau supplémentaire.",
    },
  },
  {
    slug: "shadow",
    name: "Ombres",
    subtitle: "Ce qui se cache entre les lumières",
    color: "#2C3E50",
    glow: "rgba(44,62,80,0.15)",
    icon: "/pouvoirs/Shadow.png",
    description: "Les Ombres ne sont pas l'absence de lumière — elles sont une présence à part entière. Ses mages apprennent à s'y fondre, à les sculpter, à y lire ce que les autres ne peuvent voir.",
    traits: ["Invisibilité", "Téléportation d'ombre", "Terreur"],
    forbidden: "La magie des Ombres ne fonctionne pas en pleine lumière naturelle directe. Elle s'affaiblit proportionnellement à l'intensité lumineuse.",
    spell: {
      name: "Manteau du Néant",
      level: 2,
      classes: ["Sorcier", "Assassin"],
      castingTime: "Action bonus",
      range: "Soi",
      components: "S",
      duration: "Concentration, jusqu'à 1 minute",
      description: "Vous vous enveloppez d'un voile d'ombre vivante. Jusqu'à la fin du sort, vous êtes difficile à percevoir dans les zones de faible lumière — les attaques contre vous ont un désavantage en conditions de pénombre. En lumière totale, l'effet cesse immédiatement.",
      upcast: "La durée augmente de 1 minute par niveau supplémentaire.",
    },
  },
  {
    slug: "shamanism",
    name: "Chamanisme",
    subtitle: "La voix des esprits et des ancêtres",
    color: "#9B59B6",
    glow: "rgba(155,89,182,0.12)",
    icon: "/pouvoirs/Shamanism.png",
    description: "Le Chamanisme est un dialogue, pas une maîtrise. Ses pratiquants parlent aux esprits de la nature, aux âmes des ancêtres, aux forces invisibles qui tissent le monde. En échange de faveurs, ces entités agissent.",
    traits: ["Invocation d'esprits", "Bénédictions", "Vision ancestrale"],
    forbidden: "Les esprits invoqués ne sont pas des serviteurs — ils peuvent refuser, exiger une contrepartie ou se retourner si mal traités. Une seule entité à la fois peut être invoquée.",
    spell: {
      name: "Appel de l'Esprit Gardien",
      level: 2,
      classes: ["Chaman", "Druide"],
      castingTime: "Action",
      range: "Soi (zone de 4,5 mètres)",
      components: "V, S",
      duration: "Concentration, jusqu'à 1 minute",
      description: "Vous invoquez l'esprit d'un ancêtre guerrier qui patrouille autour de vous. Chaque ennemi qui entre dans la zone ou y commence son tour doit réussir un jet de Sagesse ou subir 2d8 dégâts psychiques. Vos alliés dans la zone récupèrent 1d6 points de vie au début de leur tour.",
      upcast: "Les dégâts et les soins augmentent de 1d4 par niveau supplémentaire.",
    },
  },
]

// ─── Spell Card ───────────────────────────────────────────────────────────────

function SpellCard({ spell, color }: { spell: Spell; color: string }) {
  return (
    <div className="rounded-xl border bg-[#FAFAF8] p-5 mt-4" style={{ borderColor: `${color}33` }}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-cinzel font-bold text-[#1A1A2E] text-base leading-snug">{spell.name}</p>
          <p className="font-jost text-xs mt-0.5" style={{ color }}>
            Niveau {spell.level} · {spell.classes.join(", ")}
          </p>
        </div>
        <span
          className="shrink-0 font-cinzel text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider"
          style={{ borderColor: `${color}44`, color, background: `${color}10` }}
        >
          Sort
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 p-3 rounded-lg border" style={{ background: `${color}06`, borderColor: `${color}18` }}>
        {[
          { label: "Incantation", value: spell.castingTime },
          { label: "Portée", value: spell.range },
          { label: "Composantes", value: spell.components },
          { label: "Durée", value: spell.duration },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="font-jost text-[10px] uppercase tracking-widest text-[#4A5568]/50 mb-0.5">{label}</p>
            <p className="font-jost text-sm text-[#1A1A2E] font-medium leading-snug">{value}</p>
          </div>
        ))}
      </div>

      <p className="font-jost text-sm text-[#4A5568] leading-relaxed">{spell.description}</p>

      {spell.upcast && (
        <p className="font-jost text-xs mt-3 pt-3 border-t text-[#4A5568]/60" style={{ borderColor: `${color}22` }}>
          ↑ <span className="font-semibold" style={{ color }}>Niveaux supérieurs :</span> {spell.upcast}
        </p>
      )}
    </div>
  )
}

// ─── Magic Tab ────────────────────────────────────────────────────────────────

function MagicTab({ magic, isSelected, onClick }: { magic: Magic; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 text-center w-full"
      style={{
        background: isSelected ? `${magic.color}10` : "white",
        borderColor: isSelected ? magic.color : "#E5E1D8",
        boxShadow: isSelected ? `0 2px 10px ${magic.glow}` : "none",
      }}
    >
      <div className="relative w-20 h-20 shrink-0">
        <Image
          src={magic.icon}
          alt={magic.name}
          fill
          sizes="80px"
          className="object-contain transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      <p className="font-cinzel font-bold text-sm leading-tight" style={{ color: isSelected ? magic.color : "#4A5568" }}>
        {magic.name}
      </p>
    </button>
  )
}

// ─── Magic Detail ─────────────────────────────────────────────────────────────

function MagicDetail({ magic }: { magic: Magic }) {
  return (
    <div
      className="reveal rounded-xl border bg-white overflow-hidden"
      style={{ borderColor: `${magic.color}44`, boxShadow: `0 4px 20px ${magic.glow}` }}
    >
      <div className="grid md:grid-cols-[200px_1fr_1fr]">

        {/* Col 1 — grande image centrée */}
        <div
          className="flex items-center justify-center p-6 border-b md:border-b-0 md:border-r"
          style={{ background: `${magic.color}06`, borderColor: `${magic.color}20` }}
        >
          <div className="relative w-40 h-40">
            <Image src={magic.icon} alt={magic.name} fill sizes="160px" className="object-contain drop-shadow-md" />
          </div>
        </div>

        {/* Col 2 — infos */}
        <div className="p-7 border-b md:border-b-0 md:border-r" style={{ borderColor: `${magic.color}20` }}>
          <h2 className="font-cinzel font-bold text-2xl text-[#1A1A2E] mb-1">{magic.name}</h2>
          <p className="font-jost text-sm mb-5" style={{ color: magic.color }}>{magic.subtitle}</p>

          <p className="font-jost text-[#4A5568] text-sm leading-relaxed mb-5">{magic.description}</p>

          <div className="mb-5">
            <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#4A5568]/40 mb-2">Affinités</p>
            <div className="flex flex-wrap gap-2">
              {magic.traits.map((t) => (
                <span key={t} className="font-jost text-xs px-3 py-1 rounded-full border" style={{ borderColor: `${magic.color}44`, color: magic.color, background: `${magic.color}10` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4 border-l-2" style={{ background: `${magic.color}08`, borderColor: magic.color }}>
            <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: magic.color }}>Restriction</p>
            <p className="font-jost text-sm text-[#4A5568] leading-relaxed">{magic.forbidden}</p>
          </div>
        </div>

        {/* Col 3 — sort */}
        <div className="p-7">
          <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#4A5568]/40 mb-1">Sort exemple</p>
          <p className="font-jost text-sm text-[#4A5568]/60 mb-2">Un aperçu de ce que cette magie permet en combat ou en exploration.</p>
          <SpellCard spell={magic.spell} color={magic.color} />
        </div>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PouvairsPage() {
  const [selected, setSelected] = useState<string>(magics[0].slug)
  const magic = magics.find((m) => m.slug === selected)!

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
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")` }}
          />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(ellipse at 30% 60%, rgba(201,151,74,0.3) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(139,111,71,0.2) 0%, transparent 45%)` }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #EFF4FB)" }} />
          <div className="relative z-10 text-center px-4 pt-24 pb-16">
            <p className="eyebrow text-[#C9974A] mb-4">Grimoire d&apos;Izaria</p>
            <h1 className="font-cinzel font-bold text-[#F0EDE8] mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}>
              Les Magies d&apos;Izaria
            </h1>
            <p className="font-jost text-[#F0EDE8]/60 text-lg max-w-xl mx-auto">
              Chaque mage d&apos;Izaria est lié à l&apos;essence même du personnage. Ce lien est inné, profond, souvent inexplicable. Il ne se choisit pas, il se découvre.
            </p>
          </div>
        </section>

        {/* ── Selector + Detail ── */}
        <section className="bg-[#EFF4FB] px-6 py-10">
          <div className="max-w-5xl mx-auto">

            <div className="reveal grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
              {magics.map((m) => (
                <MagicTab key={m.slug} magic={m} isSelected={selected === m.slug} onClick={() => setSelected(m.slug)} />
              ))}
            </div>

            <MagicDetail magic={magic} />

          </div>
        </section>

        {/* ── Crédit icônes ── */}
        <div className="bg-[#EFF4FB] px-6 pb-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 rounded-lg border border-[#E5E1D8] bg-white px-4 py-3">
              <span className="text-base shrink-0">🎨</span>
              <p className="font-jost text-s text-[#4A5568] leading-relaxed">
                Icônes des magies réalisées par{" "}
                <a href="https://memimic.net/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C9974A] hover:underline">
                  me.miminic
                </a>
                {" "}— contenu modulaire pour D&D 5e. Soutenez-le sur{" "}
                <a href="https://www.patreon.com/cw/memimic" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C9974A] hover:underline">
                  Patreon
                </a>
                .
              </p>
            </div>
          </div>
        </div>


        <section className="px-6 py-16 bg-[#F8FAFD] border-t border-[#D4C5A9]/40">
          <div className="max-w-5xl mx-auto">

            <div className="reveal flex items-center gap-6 mb-10">
              <div>
                <p className="eyebrow text-[#C9974A] mb-1">Guide du joueur</p>
                <h2 className="font-cinzel font-bold text-2xl text-[#1A1A2E]">Comment construire son pouvoir ?</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4C5A9] to-transparent hidden md:block" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="reveal rounded-xl border border-[#E5E1D8] bg-white p-6">
                <p className="font-cinzel text-[#C9974A] text-xs tracking-widest uppercase mb-5">Structure obligatoire</p>
                <div className="space-y-5">
                  {[
                    { n: "1", label: "Utilisation", text: "Comment le pouvoir s'active-t-il ? Quelle est son étendue, sa forme, son déclencheur ?" },
                    { n: "2", label: "Limites & conditions", text: "Dans quels cas est-il inefficace ? Qu'est-ce qui le bloque, le réduit ou l'annule ?" },
                    { n: "3", label: "Conséquences", text: "À quel point le personnage est-il affecté pendant et après l'utilisation ?" },
                  ].map(({ n, label, text }) => (
                    <div key={n} className="flex gap-4 items-start">
                      <span className="font-cinzel font-bold text-2xl text-[#C9974A]/30 leading-none shrink-0 w-6">{n}</span>
                      <div>
                        <p className="font-cinzel text-[#1A1A2E] text-sm font-bold mb-1">{label}</p>
                        <p className="font-jost text-sm text-[#4A5568] leading-relaxed">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="reveal rounded-xl border border-[#E5E1D8] bg-white p-6">
                  <p className="font-cinzel text-[#C9974A] text-xs tracking-widest uppercase mb-3">L&apos;essence de la magie</p>
                  <p className="font-jost text-sm text-[#4A5568] leading-relaxed">
                    Les limites et conséquences sont l&apos;essence même de la magie d&apos;Izaria. La magie doit avoir
                    une <span className="text-[#1A1A2E] font-semibold">contrepartie physique instantanée</span> sur
                    le personnage à chaque lancer de sort. Il n&apos;est pas possible de contourner une limite quelle qu&apos;elle soit.
                  </p>
                </div>

                <div className="reveal rounded-xl border border-[#E5E1D8] bg-white p-6">
                  <p className="font-cinzel text-[#C9974A] text-xs tracking-widest uppercase mb-4">Précisions techniques</p>
                  <div className="space-y-3">
                    {[
                      { icon: "🔥", text: "Feu & Glace → température maximale en °C obligatoire." },
                      { icon: "⚡", text: "Foudre → ampérage chiffré en milliampères (mA) obligatoire." },
                      { icon: "💨", text: "Toute vitesse → chiffrée en km/h ou m/s sans exception." },
                      { icon: "🩸", text: "Magie du Sang → limité au sang propre du personnage (6 litres max)." },
                      { icon: "🎯", text: "Une seule capacité issue d'un seul et unique pouvoir par fiche." },
                    ].map(({ icon, text }) => (
                      <div key={icon} className="flex gap-3 items-start">
                        <span className="text-base shrink-0">{icon}</span>
                        <p className="font-jost text-sm text-[#4A5568] leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Classes exceptionnelles */}
            <div className="reveal mt-6 rounded-xl border border-[#E5E1D8] bg-white p-6">
              <p className="font-cinzel text-[#C9974A] text-xs tracking-widest uppercase mb-4">Classes exceptionnelles</p>

              {/* Alerte mana EN PREMIER */}
              <div className="rounded-lg px-4 py-3 border-l-2 border-[#C0392B] mb-5" style={{ background: "rgba(192,57,43,0.05)" }}>
                <p className="font-jost text-[#C0392B] text-xs font-semibold mb-1">⚠ Attention</p>
                <p className="font-jost text-sm text-[#4A5568]">
                  Si la réserve de mana tombe à 0, le personnage meurt. Le mana se régénère à raison de 1 point par minute.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <p className="font-jost text-sm text-[#4A5568] leading-relaxed md:col-span-3">
                  Les classes <span className="text-[#1A1A2E] font-semibold">Mage, Sorcier et Nécromancien</span> peuvent
                  posséder plusieurs sorts. Chaque sort doit alors préciser un coût de mana chiffré, et le personnage
                  doit avoir une réserve de mana définie. Cela s&apos;applique en plus du schéma de base.
                </p>
                <div className="flex gap-3 items-start rounded-lg border border-[#E5E1D8] px-4 py-3">
                  <span className="text-base shrink-0">🚫</span>
                  <p className="font-jost text-sm text-[#4A5568]">
                    La classe <span className="font-semibold text-[#1A1A2E]">Guérisseur</span> n&apos;a pas accès à la magie noire.
                  </p>
                </div>
                <div className="flex gap-3 items-start rounded-lg border border-[#E5E1D8] px-4 py-3">
                  <span className="text-base shrink-0">🚫</span>
                  <p className="font-jost text-sm text-[#4A5568]">
                    La classe <span className="font-semibold text-[#1A1A2E]">Nécromancien</span> n&apos;a pas accès à la magie de soin.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Pouvoirs interdits ── */}
        <section className="px-6 py-16 bg-[#EFF4FB] border-t border-[#D4C5A9]/40">
          <div className="max-w-5xl mx-auto">

            <div className="reveal flex items-center gap-6 mb-4">
              <div>
                <p className="eyebrow text-[#C0392B] mb-1">Règles absolues</p>
                <h2 className="font-cinzel font-bold text-2xl text-[#1A1A2E]">Quels pouvoirs sont interdits ?</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4C5A9] to-transparent hidden md:block" />
            </div>
            <p className="reveal font-jost text-[#4A5568] text-base mb-8">
              Ces capacités sont proscrites sans exception. Aucune fiche les incluant ne sera validée.
            </p>

            <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: "🌀", label: "Contrôle de la gravité" },
                { icon: "🌩", label: "Contrôle de la météo" },
                { icon: "⏳", label: "Contrôle du temps" },
                { icon: "♾️", label: "Immortalité, intangibilité et invincibilité" },
                { icon: "🧠", label: "Manipulation mentale, physique ou magique d'un autre rôliste" },
                { icon: "👥", label: "Contrôle multiple de clone" },
                { icon: "🎭", label: "Contrôle d'apparence d'autres personnages" },
                { icon: "⚗️", label: "Contrôle de la matière ou de l'énergie" },
                { icon: "📋", label: "Copie des capacités physiques ou magiques d'un autre rôliste" },
                { icon: "💥", label: "Création de catastrophes aléatoires" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-lg px-4 py-3.5 bg-white border border-[#E5E1D8] hover:border-[#C0392B]/30 transition-colors">
                  <span className="text-lg shrink-0">{icon}</span>
                  <p className="font-jost text-sm text-[#4A5568] leading-snug flex-1">{label}</p>
                  <span className="shrink-0 text-[#C0392B]/40 font-bold">✕</span>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </ScrollRevealProvider>
  )
}
