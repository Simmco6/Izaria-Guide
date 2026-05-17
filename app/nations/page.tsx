"use client"

import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"

// ─── Types ────────────────────────────────────────────────────────────────────

type ArmyUnit = {
  name: string
  count: string
  role: string
}

type Army = {
  name: string
  total: string
  description: string
  units: ArmyUnit[]
}

type Nation = {
  slug: string
  name: string
  type: string
  population: string
  description: string
  character: string
  gradient: string
  accent: string
  nationHref: string
  leaderHref: string
  status: "active" | "pending" | "destroyed"
  army: Army
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const nations: Nation[] = [
  // ── Actuelles ────────────────────────────────────────────────────────────────
  {
    slug: "alakasham",
    name: "Alakasham",
    type: "Sultanat",
    population: "55 000 habitants",
    description: "Désert, commerce équestre et mercenaires. La sultane a purgé le patriarcat. Le pouvoir et l'argent dictent la loi.",
    character: "Commercial · Matriarcal · Aride",
    gradient: "linear-gradient(135deg, #2e1f0a 0%, #5c3d14 50%, #2e1f0a 100%)",
    accent: "#FFB84A",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Garde du Sable",
      total: "~4 000 soldats",
      description: "Une armée de mercenaires et de cavaliers d'élite, recrutés au plus offrant. La loyauté se paie en or.",
      units: [
        { name: "Cavaliers du Désert", count: "1 200", role: "Cavalerie légère, raids et éclaireurs" },
        { name: "Mercenaires de la Lame", count: "2 000", role: "Infanterie lourde contractuelle" },
        { name: "Arbalétriers de Sable", count: "800", role: "Soutien à distance et défense des caravanes" },
      ],
    },
  },
  {
    slug: "asdorath",
    name: "Asdorath",
    type: "Empire",
    population: "100 000 habitants",
    description: "La dernière grande nation de l'Alliance. L'Impératrice de Narset tient le monde entre ses mains de pierre.",
    character: "Puissant · Militaire · Politique",
    gradient: "linear-gradient(135deg, #1a100a 0%, #cc5d2a 50%, #1f130b 100%)",
    accent: "#FFB84A",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Légions de l'Empire",
      total: "~18 000 soldats",
      description: "La force militaire la plus imposante d'Izaria. Disciplinée, hiérarchisée, redoutée.",
      units: [
        { name: "Légionnaires de Narset", count: "8 000", role: "Infanterie lourde d'élite impériale" },
        { name: "Chevaliers du Trône", count: "2 000", role: "Cavalerie blindée, garde rapprochée de l'Impératrice" },
        { name: "Arquebusiers Impériaux", count: "4 000", role: "Artillerie et soutien à distance" },
        { name: "Mages de Guerre", count: "500", role: "Appui magique de combat" },
        { name: "Corps du Renseignement", count: "3 500", role: "Espionnage, infiltration, contre-espionnage" },
      ],
    },
  },
  {
    slug: "arcabios",
    name: "Arcabios",
    type: "Royaume épéiste",
    population: "50 000 habitants",
    description: "Fondé par un maître épéiste sur les ruines de Toundra. Connu pour sa bibliothèque légendaire et son académie.",
    character: "Érudit · Guerrier · Ordonné",
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #691b1b 50%, #1a0a0a 100%)",
    accent: "#a0a09e",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Ordre de la Lame",
      total: "~5 500 soldats",
      description: "Chaque soldat est aussi lettré que guerrier. L'académie d'Arcabios forme les meilleurs duellistes du continent.",
      units: [
        { name: "Maîtres Épéistes", count: "800", role: "Élite de l'Académie, duellistes hors pair" },
        { name: "Gardiens de la Bibliothèque", count: "300", role: "Protection des archives et des artefacts" },
        { name: "Milice Ordonnée", count: "4 400", role: "Infanterie standard disciplinée" },
      ],
    },
  },
  {
    slug: "dakurodo",
    name: "Dakurodo",
    type: "Royaume sombre",
    population: "70 000 habitants",
    description: "Les pires démons et nécromanciens y règnent. La reine soulève une armée. Le monde retient son souffle.",
    character: "Sombre · Interdit · Menaçant",
    gradient: "linear-gradient(135deg, #393a3b 0%, #202122 50%, #393a3b 100%)",
    accent: "#FF4A4A",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Armée des Morts",
      total: "Indéterminé",
      description: "Une horde de morts-vivants et de créatures démoniaques, augmentée en permanence. Elle ne connaît ni fatigue ni peur.",
      units: [
        { name: "Nécromanciens de Cour", count: "120", role: "Commandement et invocation de masse" },
        { name: "Légion Squelettique", count: "∞", role: "Chair de canon animée, masse infiniment renouvelable" },
        { name: "Démons Contractuels", count: "Inconnu", role: "Entités liées par pacte, force de frappe dévastatrice" },
        { name: "Gardes Vivants", count: "2 000", role: "Humains corrompus, infanterie de choc" },
      ],
    },
  },
  {
    slug: "hokkaido",
    name: "Hokkaido",
    type: "Royaume samourai",
    population: "30 000 habitants",
    description: "La croissance de cette île de l'ouest fut fulgurante, mais sa chute a été tout autant spectaculaire.",
    character: "Samourai · Mafieux · Menaçant",
    gradient: "linear-gradient(135deg, #0e1a2e 0%, #1e2a4a 50%, #2a1a3e 100%)",
    accent: "#B44AFF",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Clan des Ombres Pourpres",
      total: "~3 200 soldats",
      description: "Une armée double : samourais honorables en façade, réseau de yakuzas dans l'ombre. La distinction est souvent floue.",
      units: [
        { name: "Samourais de Rang", count: "600", role: "Élite martiale, code de l'honneur strict" },
        { name: "Ninja du Clan", count: "400", role: "Assassins, espions, exécuteurs" },
        { name: "Milice Insulaire", count: "2 200", role: "Défense côtière et garnison" },
      ],
    },
  },
  {
    slug: "ipulos-tacderen",
    name: "Ipulos Tacderen",
    type: "Royaume du fer",
    population: "20 000 habitants",
    description: "La nation du fer, lieu où tous les rêves, tant qu'ils contiennent des métaux, se voient réalisés.",
    character: "Voleur · Forgeron · Menaçant",
    gradient: "linear-gradient(135deg, #303130 0%, #696b69 50%, #303130 100%)",
    accent: "#a0a09e",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Forge-Guerre",
      total: "~2 800 soldats",
      description: "Les meilleurs équipements du monde au service d'une armée réduite mais redoutablement armée.",
      units: [
        { name: "Forgerons-Soldats", count: "500", role: "Artisans de guerre, réparation et fabrication en campagne" },
        { name: "Chevaliers de Fer", count: "800", role: "Cavalerie lourde en armure intégrale forgée sur mesure" },
        { name: "Pillards Mécanisés", count: "1 500", role: "Infanterie équipée d'armes expérimentales" },
      ],
    },
  },
  {
    slug: "solarsen",
    name: "Solarsen",
    type: "Royaume maritime",
    population: "42 000 habitants",
    description: "Ancienne province d'Asdorath devenue puissance commerciale. Ports prospères, magie reconnue, accès à trois océans.",
    character: "Maritime · Magique · Indépendant",
    gradient: "linear-gradient(135deg, #0a1a2e 0%, #14365c 50%, #0a1a2e 100%)",
    accent: "#4AC8FF",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Flotte de l'Indépendance",
      total: "~5 000 soldats + 40 navires",
      description: "La puissance de Solarsen est navale avant tout. Sur terre, elle est défensive. Sur mer, elle est souveraine.",
      units: [
        { name: "Marines d'Élite", count: "1 200", role: "Infanterie de bord, abordage et défense portuaire" },
        { name: "Mages des Marées", count: "300", role: "Contrôle magique des courants et tempêtes" },
        { name: "Flotte Marchande Armée", count: "3 500", role: "Marins combattants réquisitionnables" },
      ],
    },
  },
  {
    slug: "tengoku",
    name: "Tengoku",
    type: "Îles flottantes",
    population: "75 000 habitants",
    description: "Havre de la magie du vent. Des îles flottantes au cœur de Dakurodo. Un peuple mystérieux que rien ne peut atteindre.",
    character: "Mystique · Aérien · Isolé",
    gradient: "linear-gradient(135deg, #949097 0%, #424446 50%, #949097 100%)",
    accent: "#1a1a1b",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Gardiens du Ciel",
      total: "~4 500 soldats",
      description: "Une armée qui combat dans les airs. Inaccessible à qui ne maîtrise pas la magie du vent.",
      units: [
        { name: "Vents-Lames", count: "800", role: "Guerriers volants, maîtres de la magie du vent" },
        { name: "Archers Célestes", count: "1 200", role: "Tir de précision depuis les hauteurs" },
        { name: "Gardiens des Îles", count: "2 500", role: "Défense statique des plateformes flottantes" },
      ],
    },
  },
  {
    slug: "thogdur",
    name: "Thogdur",
    type: "Royaume orc",
    population: "80 000 habitants",
    description: "Dirigé par le gobelin Thogdur d'une main de fer, le Royaume de Thogdur est l'un des plus fermés, interdit aux humains ou encore aux elfes.",
    character: "Fermé · Autoritaire · Esclavagiste",
    gradient: "linear-gradient(135deg, #1a2e1a 0%, #2d5a2d 50%, #1a2e1a 100%)",
    accent: "#dddab6",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "Horde de Thogdur",
      total: "~22 000 soldats",
      description: "La plus grande armée brute d'Izaria. Peu sophistiquée, mais compensée par des effectifs colossaux et une férocité sans limite.",
      units: [
        { name: "Berserkers Orcs", count: "8 000", role: "Infanterie de choc, charge frontale dévastatrice" },
        { name: "Esclaves de Guerre", count: "10 000", role: "Chair de canon, mineurs et porteurs en campagne" },
        { name: "Shamans de Combat", count: "500", role: "Soutien magique tribal, malédictions et soins" },
        { name: "Garde Personnelle de Thogdur", count: "3 500", role: "Élite gobeline, fanatiquement loyale" },
      ],
    },
  },
  {
    slug: "mitsurin",
    name: "Mitsurin",
    type: "Confédération tribale",
    population: "30 000 habitants",
    description: "Région reculée du nord, le Mitsurin ne connaît que la loi de la jungle — qui recouvre la quasi-totalité de son territoire. Douze tribus souveraines s'y partagent la terre ; un conseil se réunit tous les 122 nuits pour régler les affaires internes de cette nation coupée du monde.",
    character: "Tribal · Sauvage · Isolé",
    gradient: "linear-gradient(135deg, #0e1e0e 0%, #1c3d1a 50%, #0e1e0e 100%)",
    accent: "#6fcf6f",
    nationHref: "#",
    leaderHref: "#",
    status: "active",
    army: {
      name: "La Force du Mitsurin",
      total: "15 500 hommes (issus des 12 tribus)",
      description: "Une armée de jungle forgée par la survie. Chaque combattant est avant tout un chasseur, un traqueur, un survivant. Ils ne connaissent pas la discipline impériale — ils connaissent la forêt.",
      units: [
        { name: "Éclaireurs", count: "500", role: "Hachette et dague — reconnaissance, embuscades et éliminations silencieuses" },
        { name: "Chasseurs", count: "10 000", role: "Arc — tir de précision, harcèlement à distance, piégeage du terrain" },
        { name: "Berserkers", count: "5 000", role: "Hache et potion de rage — charge frontale dévastatrice, combat au corps à corps frénétique" },
      ],
    },
  },
  // ── Inconnues ─────────────────────────────────────────────────────────────────
  {
    slug: "territoire-libre",
    name: "Territoire Libre",
    type: "??? — à définir",
    population: "??? habitants",
    description: "Les informations sur cette nation sont encore en cours de rédaction. Revenez bientôt.",
    character: "??? · ??? · ???",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #0d0d0d 100%)",
    accent: "#8888aa",
    nationHref: "#",
    leaderHref: "#",
    status: "pending",
    army: {
      name: "??? — à définir",
      total: "???",
      description: "Les données militaires du Territoire Libre n'ont pas encore été renseignées.",
      units: [{ name: "À compléter", count: "???", role: "Informations à venir" }],
    },
  },
  {
    slug: "zone-ombre",
    name: "Zone d'Ombre",
    type: "??? — à définir",
    population: "??? habitants",
    description: "Les informations sur cette région sont encore en cours de rédaction. Revenez bientôt.",
    character: "??? · ??? · ???",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #0d0d0d 100%)",
    accent: "#8888aa",
    nationHref: "#",
    leaderHref: "#",
    status: "pending",
    army: {
      name: "??? — à définir",
      total: "???",
      description: "Les données militaires de la Zone d'Ombre n'ont pas encore été renseignées.",
      units: [{ name: "À compléter", count: "???", role: "Informations à venir" }],
    },
  },
  {
    slug: "terres-desolees",
    name: "Terres Désolées",
    type: "??? — à définir",
    population: "??? habitants",
    description: "Les informations sur cette région sont encore en cours de rédaction. Revenez bientôt.",
    character: "??? · ??? · ???",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #0d0d0d 100%)",
    accent: "#8888aa",
    nationHref: "#",
    leaderHref: "#",
    status: "pending",
    army: {
      name: "??? — à définir",
      total: "???",
      description: "Les données militaires des Terres Désolées n'ont pas encore été renseignées.",
      units: [{ name: "À compléter", count: "???", role: "Informations à venir" }],
    },
  },
  // ── Disparues ─────────────────────────────────────────────────────────────────
  {
    slug: "saltir",
    name: "Saltir",
    type: "Sultanat fondateur — Disparue",
    population: "Inconnue",
    description: "Nation fondatrice de la Triple Alliance, Saltir prospéra grâce à son désert et son climat chaud. Prise en tenaille durant la guerre de 2 ans — soulèvement de ses cavaliers du désert d'un côté, attaque d'Hokkaido sur ses côtes de l'autre — elle appela ses alliés qui ne répondirent jamais. Saltir n'existe plus.",
    character: "Fondatrice · Désertique · Abandonnée",
    gradient: "linear-gradient(135deg, #1a1410 0%, #2a2018 50%, #1a1410 100%)",
    accent: "#8B6914",
    nationHref: "#",
    leaderHref: "#",
    status: "destroyed",
    army: {
      name: "— Dissoute —",
      total: "Nation disparue",
      description: "L'armée de Saltir fut décimée lors de la guerre de 2 ans. Ses cavaliers du désert se soulevèrent, ses côtes furent attaquées. Aucun secours ne vint.",
      units: [
        { name: "Cavaliers du Désert", count: "†", role: "Se soulevèrent contre leur propre nation — catalyseurs de la chute" },
        { name: "Garnisons Côtières", count: "†", role: "Écrasées lors du débarquement d'Hokkaido" },
      ],
    },
  },
  {
    slug: "toundra",
    name: "Toundra",
    type: "Grande nation — Disparue",
    population: "Inconnue",
    description: "Toundra jouissait d'un climat stable (5 à 25°C), d'une forte couverture forestière, de montagnes et de marais. Grande perdante de la guerre de 2 ans, elle ne vit pas venir l'attaque d'Hokkaido. Son insouciance créa sa perte : sa capitale, Draguiroux, fut pratiquement rasée. Ses dirigeants sont morts ou au service des nouvelles nations. Toundra n'existe plus.",
    character: "Insouciante · Forestière · Rasée",
    gradient: "linear-gradient(135deg, #101a10 0%, #1a2a1a 50%, #101a10 100%)",
    accent: "#5a7a5a",
    nationHref: "#",
    leaderHref: "#",
    status: "destroyed",
    army: {
      name: "— Dissoute —",
      total: "Nation disparue",
      description: "L'armée de Toundra fut surprise et anéantie lors de la guerre de 2 ans. Draguiroux, sa capitale, fut rasée. Ses chefs de guerre sont morts ou sous joug étranger.",
      units: [
        { name: "Défenseurs de Draguiroux", count: "†", role: "Écrasés lors de la prise de la capitale" },
        { name: "Milice Forestière", count: "†", role: "Dispersée, incapable d'organiser une résistance cohérente" },
      ],
    },
  },
  {
    slug: "azandor",
    name: "Azandor",
    type: "Royaume — Anéanti",
    population: "Inconnue",
    description: "Fruit des ambitions de Saan Uzall, Azandor était déchiré par des troubles internes. Pris de folie, Uzall envoya un assassin tuer l'Impératrice Régina de Narset d'Asdorath. L'assassin fut arrêté à l'entrée du château. Narset marcha sur la capitale, décapita Uzall et tous ses dignitaires de sa propre main, puis fit brûler la ville entièrement. Azandor n'existe plus.",
    character: "Ambitieux · Instable · Brûlé",
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #2e1010 50%, #1a0a0a 100%)",
    accent: "#8B2020",
    nationHref: "#",
    leaderHref: "#",
    status: "destroyed",
    army: {
      name: "— Anéantie —",
      total: "Nation disparue",
      description: "L'armée d'Azandor capitula sans combattre lorsque Narset marcha sur la capitale. Uzall et ses dignitaires furent décapités. La ville fut brûlée jusqu'aux fondations.",
      units: [
        { name: "Garde de Saan Uzall", count: "†", role: "Décapitée avec leur maître par Narset elle-même" },
        { name: "Armée Royale", count: "†", role: "Rendue ou dissoute lors de l'invasion d'Asdorath" },
      ],
    },
  },
]

// ─── Nation Card ──────────────────────────────────────────────────────────────

function NationCard({ nation }: { nation: Nation }) {
  const [armyOpen, setArmyOpen] = useState(false)
  const isDestroyed = nation.status === "destroyed"
  const isPending = nation.status === "pending"

  const badgeConfig = {
    destroyed: { label: "Disparue", color: "#8B2020", bg: "rgba(139,32,32,0.08)", border: "rgba(139,32,32,0.25)" },
    pending:   { label: "À compléter", color: "#8888aa", bg: "rgba(136,136,170,0.08)", border: "rgba(136,136,170,0.25)" },
    active:    null,
  }
  const badge = badgeConfig[nation.status]

  return (
    <div
      className="reveal rounded-2xl overflow-hidden border transition-all duration-300"
      style={{
        borderColor: `${nation.accent}30`,
        opacity: isDestroyed ? 0.85 : 1,
      }}
    >
      {/* ── Header ── */}
      <div
        className="relative px-7 py-6 flex items-start justify-between gap-4"
        style={{ background: nation.gradient }}
      >
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Accent glow */}
        <div
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-full blur-3xl opacity-20"
          style={{ background: nation.accent, transform: "translate(30%, -30%)" }}
        />

        {/* Destroyed diagonal stripe overlay */}
        {isDestroyed && (
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
            }}
          />
        )}

        <div className="relative z-10 flex-1 min-w-0">
          {badge && (
            <span
              className="inline-block font-cinzel text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full border mb-2"
              style={{ borderColor: badge.border, color: badge.color, background: badge.bg }}
            >
              {isDestroyed ? "☠ " : ""}{badge.label}
            </span>
          )}
          <h2
            className="font-cinzel font-bold text-white leading-tight mb-1"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
              textDecoration: isDestroyed ? "line-through" : "none",
              textDecorationColor: "rgba(255,255,255,0.3)",
            }}
          >
            {nation.name}
          </h2>
          <p className="font-jost text-sm font-medium" style={{ color: nation.accent }}>
            {nation.type}
          </p>
        </div>

        <div className="relative z-10 shrink-0 text-right">
          <p className="font-cinzel text-[10px] tracking-widest uppercase text-white/30 mb-0.5">Population</p>
          <p className="font-jost text-sm text-white/70">{nation.population}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div
        className="px-7 py-5 border-t"
        style={{
          borderColor: `${nation.accent}20`,
          background: isDestroyed ? "#F9F7F5" : "white",
        }}
      >
        <p className="font-jost text-[#4A5568] text-sm leading-relaxed mb-4">
          {nation.description}
        </p>

        {/* Traits */}
        <div className="flex flex-wrap gap-2 mb-5">
          {nation.character.split(" · ").map((trait) => (
            <span
              key={trait}
              className="font-jost text-xs px-3 py-1 rounded-full border"
              style={{ borderColor: `${nation.accent}44`, color: nation.accent, background: `${nation.accent}10` }}
            >
              {trait}
            </span>
          ))}
        </div>

        {/* CTA buttons — masqués si disparue */}
        {!isDestroyed && (
          <div className="flex flex-wrap gap-3 mb-4">
            <a
              href={nation.nationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-cinzel text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all duration-200 hover:brightness-95"
              style={{ borderColor: `${nation.accent}50`, color: nation.accent, background: `${nation.accent}10` }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Fiche de nation
            </a>

            <a
              href={nation.leaderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-cinzel text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all duration-200 hover:border-[#4A5568]/40 hover:bg-[#4A5568]/5"
              style={{ borderColor: "#E5E1D8", color: "#4A5568", background: "transparent" }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
              Fiche de dirigeant
            </a>

            {/* Army toggle */}
            <button
              onClick={() => setArmyOpen((o) => !o)}
              className="inline-flex items-center gap-2 font-cinzel text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all duration-200 ml-auto"
              style={{
                borderColor: armyOpen ? `${nation.accent}60` : "#E5E1D8",
                color: armyOpen ? nation.accent : "#4A5568",
                background: armyOpen ? `${nation.accent}10` : "transparent",
              }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
              Armée
              <svg
                className="w-3 h-3 shrink-0 transition-transform duration-300"
                style={{ transform: armyOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* Army for destroyed — always visible, condensed */}
        {isDestroyed && (
          <div
            className="rounded-xl border p-4 mt-1"
            style={{ borderColor: `${nation.accent}20`, background: `${nation.accent}06` }}
          >
            <p className="font-cinzel text-[10px] tracking-widest uppercase mb-2" style={{ color: nation.accent }}>
              Forces — Archives historiques
            </p>
            <div className="space-y-2">
              {nation.army.units.map((unit) => (
                <div
                  key={unit.name}
                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 border bg-white/60"
                  style={{ borderColor: `${nation.accent}15` }}
                >
                  <div
                    className="shrink-0 font-cinzel font-bold text-xs px-2 py-0.5 rounded"
                    style={{ color: nation.accent, background: `${nation.accent}12`, minWidth: "2rem", textAlign: "center" }}
                  >
                    {unit.count}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cinzel text-[#1A1A2E] text-xs font-bold leading-snug">{unit.name}</p>
                    <p className="font-jost text-[11px] text-[#4A5568] mt-0.5 leading-snug">{unit.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Army accordion — active nations only */}
        {!isDestroyed && (
          <div
            className="overflow-hidden transition-all duration-400 ease-in-out"
            style={{ maxHeight: armyOpen ? "600px" : "0px", opacity: armyOpen ? 1 : 0 }}
          >
            <div
              className="rounded-xl border mt-1 p-5"
              style={{ borderColor: `${nation.accent}25`, background: `${nation.accent}06` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-cinzel font-bold text-[#1A1A2E] text-sm mb-0.5">{nation.army.name}</p>
                  <p className="font-jost text-xs" style={{ color: nation.accent }}>{nation.army.total}</p>
                </div>
                <span
                  className="shrink-0 font-cinzel text-[9px] uppercase tracking-widest px-2 py-1 rounded-full border"
                  style={{ borderColor: `${nation.accent}30`, color: nation.accent, background: `${nation.accent}10` }}
                >
                  Forces militaires
                </span>
              </div>

              <p className="font-jost text-xs text-[#4A5568] leading-relaxed mb-4">
                {nation.army.description}
              </p>

              <div className="space-y-2">
                {nation.army.units.map((unit) => (
                  <div
                    key={unit.name}
                    className="flex items-start gap-3 rounded-lg px-4 py-3 border bg-white"
                    style={{ borderColor: `${nation.accent}20` }}
                  >
                    <div
                      className="shrink-0 font-cinzel font-bold text-xs px-2 py-0.5 rounded"
                      style={{ color: nation.accent, background: `${nation.accent}12`, minWidth: "3.5rem", textAlign: "center" }}
                    >
                      {unit.count}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-cinzel text-[#1A1A2E] text-xs font-bold leading-snug">{unit.name}</p>
                      <p className="font-jost text-[11px] text-[#4A5568] mt-0.5 leading-snug">{unit.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NationsPage() {
  const [filter, setFilter] = useState<string>("all")

  const typeGroups = [
    { key: "all", label: "Toutes" },
    { key: "actual", label: "Actuelles" },
    { key: "destroyed", label: "Disparues" },
    { key: "unknown", label: "Inconnues" },
  ]

  const filterMap: Record<string, string[]> = {
    actual: ["asdorath", "alakasham", "arcabios", "dakurodo", "hokkaido", "ipulos-tacderen", "solarsen", "tengoku", "thogdur", "mitsurin"],
    unknown: ["territoire-libre", "zone-ombre", "terres-desolees"],
    destroyed: ["saltir", "toundra", "azandor"],
  }

  const visible = filter === "all" ? nations : nations.filter((n) => filterMap[filter]?.includes(n.slug))

  return (
    <ScrollRevealProvider>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative min-h-[45vh] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #060D15 0%, #0D1B2A 40%, #060D15 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")` }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <div className="absolute top-0 left-[10%] w-72 h-72 rounded-full blur-[80px]" style={{ background: "#FFB84A" }} />
            <div className="absolute top-0 right-[15%] w-64 h-64 rounded-full blur-[80px]" style={{ background: "#FF4A4A" }} />
            <div className="absolute bottom-0 left-[30%] w-56 h-56 rounded-full blur-[80px]" style={{ background: "#4AC8FF" }} />
            <div className="absolute bottom-0 right-[10%] w-48 h-48 rounded-full blur-[80px]" style={{ background: "#B44AFF" }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />

          <div className="relative z-10 text-center px-4 pt-24 pb-16">
            <p className="eyebrow text-[#C9974A] mb-4">Cartographie politique</p>
            <h1
              className="font-cinzel font-bold text-[#F0EDE8] mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
            >
              Les Nations d&apos;Izaria
            </h1>
            <p className="font-jost text-[#F0EDE8]/50 text-lg max-w-xl mx-auto">
              Onze nations, onze destins. Chacune porte en elle une histoire, une ambition, et une armée prête à défendre — ou à conquérir.
            </p>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <div className="bg-white border-b border-[#E5E1D8] px-6 py-5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-8">
              {[
                { label: "Nations actives", value: "10" },
                { label: "Population totale", value: "~650 000" },
                { label: "Nations disparues", value: "3" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-cinzel font-bold text-xl text-[#1A1A2E]">{value}</p>
                  <p className="font-jost text-xs text-[#4A5568]/50 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {typeGroups.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="font-cinzel text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200"
                  style={{
                    borderColor: filter === key ? "#C9974A" : "#E5E1D8",
                    color: filter === key ? "#C9974A" : "#4A5568",
                    background: filter === key ? "rgba(201,151,74,0.08)" : "transparent",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <section className="bg-[#EFF4FB] px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {visible.map((nation) => (
                <NationCard key={nation.slug} nation={nation} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Legend ── */}
        <section className="bg-[#F8FAFD] border-t border-[#D4C5A9]/40 px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="reveal rounded-xl border border-[#E5E1D8] bg-white p-6">
              <p className="font-cinzel text-[#C9974A] text-[10px] tracking-widest uppercase mb-4">Note du Maître du Jeu</p>
              <div className="grid md:grid-cols-3 gap-4 font-jost text-sm text-[#4A5568] leading-relaxed">
                <p>Les fiches de nation contiennent les règles spécifiques, l'histoire, la géographie et les relations diplomatiques de chaque territoire.</p>
                <p>Les fiches de dirigeant décrivent le personnage non-joueur à la tête de chaque nation : biographie, motivations, capacités et rumeurs.</p>
                <p>Les données militaires sont approximatives et évoluent selon les événements en jeu. Les nations disparues sont consignées à titre d'archives historiques.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </ScrollRevealProvider>
  )
}
