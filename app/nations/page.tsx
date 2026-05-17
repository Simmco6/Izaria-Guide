"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"

// ─── Types ────────────────────────────────────────────────────────────────────

type ArmyUnit = { name: string; count: string; role: string }
type Army = { name: string; total: string; description: string; units: ArmyUnit[] }
type Nation = {
  slug: string
  name: string
  type: string
  population: string
  description: string
  character: string
  accent: string
  nationHref: string
  leaderHref: string
  status: "active" | "pending" | "destroyed"
  army: Army
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const nations: Nation[] = [
  {
    slug: "alakasham", name: "Alakasham", type: "Sultanat", population: "55 000 habitants",
    description: "Ce royaume a été bâti sur l'ancien désert de Saltir. Connu pour ses chevaux, ce peuple de mercenaires a connu plusieurs revirements politiques au sein de la famille dirigeante. L'actuelle sultane est la fille illégitime du fondateur. Elle purgea le royaume du système patriarcal que son défunt père et demi-frère avaient mis en place. Aujourd'hui, tout y tourne autour de l'argent et du commerce équestre.",
    character: "Commercial · Matriarcal · Aride", accent: "#FFB84A",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Garde du Sable", total: "~4 000 soldats", description: "Une armée de mercenaires et de cavaliers d'élite, recrutés au plus offrant. La loyauté se paie en or.", units: [{ name: "Cavaliers du Désert", count: "1 200", role: "Cavalerie légère, raids et éclaireurs" }, { name: "Mercenaires de la Lame", count: "2 000", role: "Infanterie lourde contractuelle" }, { name: "Arbalétriers de Sable", count: "800", role: "Soutien à distance et défense des caravanes" }] },
  },
  {
    slug: "arcabios", name: "Arcabios", type: "Royaume épéiste", population: "50 000 habitants",
    description: "Fondé par un maître épéiste, ce royaume fut bâti sur une partie des anciennes terres de Toundra et de sa capitale, Draguiroux. Elle fut entièrement reconstruite après la guerre. Il y fait bon vivre tant que vous n'êtes pas originaire d'Hokkaido. Arcabios est connu pour sa bibliothèque et son académie des Épéistes. Les lois de la nation sont réparties en 3 codes qui dictent tous les faits et gestes du royaume. Le monarque et ses sept conseillers veillent à ce que les plaines de la contrée soient exemptes de bandits et pillards. Cela nuirait au tourisme magique qui vient pour les trésors de sa bibliothèque.",
    character: "Érudit · Guerrier · Ordonné", accent: "#da3636",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Ordre de la Lame", total: "~5 500 soldats", description: "Chaque soldat est aussi lettré que guerrier. L'académie d'Arcabios forme les meilleurs duellistes du continent.", units: [{ name: "Maîtres Épéistes", count: "800", role: "Élite de l'Académie, duellistes hors pair" }, { name: "Gardiens de la Bibliothèque", count: "300", role: "Protection des archives et artefacts" }, { name: "Milice Ordonnée", count: "4 400", role: "Infanterie standard disciplinée" }] },
  },
  {
    slug: "asdorath", name: "Asdorath", type: "Empire", population: "100 000 habitants",
    description: "Cette ancienne grande nation a préféré signer l'armistice lorsque son empereur fut exécuté par la main du roi d'Hokkaido. Maintenant que la guerre de 2 ans est finie, la hargne de son impératrice fait que sa nation tient encore debout. Avec les années, les problèmes internes ont tendance à se calmer, mais Asdorath cherche des alliés de toutes parts car non seulement elle craint Dakurodo, mais elle aimerait surtout anéantir Hokkaido une bonne fois pour toutes.",
    character: "Puissant · Militaire · Politique", accent: "#E8793A",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Légions de l'Empire", total: "~18 000 soldats", description: "La force militaire la plus imposante d'Izaria. Disciplinée, hiérarchisée, redoutée.", units: [{ name: "Légionnaires de Narset", count: "8 000", role: "Infanterie lourde d'élite impériale" }, { name: "Chevaliers du Trône", count: "2 000", role: "Cavalerie blindée, garde rapprochée" }, { name: "Arquebusiers Impériaux", count: "4 000", role: "Artillerie et soutien à distance" }, { name: "Mages de Guerre", count: "500", role: "Appui magique de combat" }, { name: "Corps du Renseignement", count: "3 500", role: "Espionnage et infiltration" }] },
  },
  {
    slug: "dakurodo", name: "Dakurodo", type: "Royaume sombre", population: "70 000 habitants",
    description: "Les pires démons et nécromanciens y règnent. La reine soulève une armée. Le monde retient son souffle.",
    character: "Sombre · Interdit · Menaçant", accent: "#FF4A4A",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Armée des Morts", total: "Indéterminé", description: "Une horde de morts-vivants et de créatures démoniaques. Elle ne connaît ni fatigue ni peur.", units: [{ name: "Nécromanciens de Cour", count: "120", role: "Commandement et invocation de masse" }, { name: "Légion Squelettique", count: "∞", role: "Masse infiniment renouvelable" }, { name: "Démons Contractuels", count: "Inconnu", role: "Force de frappe dévastatrice" }, { name: "Gardes Vivants", count: "2 000", role: "Humains corrompus, infanterie de choc" }] },
  },
  {
    slug: "hokkaido", name: "Hokkaido", type: "Royaume samourai", population: "30 000 habitants",
    description: "La croissance de cette île de l'ouest fut fulgurante, mais sa chute a été tout autant spectaculaire.",
    character: "Samourai · Mafieux · Menaçant", accent: "#B44AFF",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Clan des Ombres Pourpres", total: "~3 200 soldats", description: "Une armée double : samourais honorables en façade, réseau de yakuzas dans l'ombre.", units: [{ name: "Samourais de Rang", count: "600", role: "Élite martiale, code de l'honneur strict" }, { name: "Ninja du Clan", count: "400", role: "Assassins, espions, exécuteurs" }, { name: "Milice Insulaire", count: "2 200", role: "Défense côtière et garnison" }] },
  },
  {
    slug: "ipulos-tacderen", name: "Ipulos Tacderen", type: "Royaume du fer", population: "20 000 habitants",
    description: "La nation du fer, lieu où tous les rêves, tant qu'ils contiennent des métaux, se voient réalisés.",
    character: "Voleur · Forgeron · Menaçant", accent: "#a0a09e",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Forge-Guerre", total: "~2 800 soldats", description: "Les meilleurs équipements du monde au service d'une armée réduite mais redoutablement armée.", units: [{ name: "Forgerons-Soldats", count: "500", role: "Artisans de guerre en campagne" }, { name: "Chevaliers de Fer", count: "800", role: "Cavalerie lourde en armure intégrale" }, { name: "Pillards Mécanisés", count: "1 500", role: "Infanterie aux armes expérimentales" }] },
  },
  {
    slug: "solarsen", name: "Solarsen", type: "Royaume maritime", population: "42 000 habitants",
    description: "Ancienne province d'Asdorath devenue puissance commerciale. Ports prospères, magie reconnue, accès à trois océans.",
    character: "Maritime · Magique · Indépendant", accent: "#4AC8FF",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Flotte de l'Indépendance", total: "~5 000 soldats + 40 navires", description: "La puissance de Solarsen est navale avant tout. Sur mer, elle est souveraine.", units: [{ name: "Marines d'Élite", count: "1 200", role: "Infanterie de bord et défense portuaire" }, { name: "Mages des Marées", count: "300", role: "Contrôle magique des courants" }, { name: "Flotte Marchande Armée", count: "3 500", role: "Marins combattants réquisitionnables" }] },
  },
  {
    slug: "tengoku", name: "Tengoku", type: "Îles flottantes", population: "75 000 habitants",
    description: "Havre de la magie du vent. Des îles flottantes au cœur de Dakurodo. Un peuple mystérieux que rien ne peut atteindre.",
    character: "Mystique · Aérien · Isolé", accent: "#9090a8",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Gardiens du Ciel", total: "~4 500 soldats", description: "Une armée qui combat dans les airs. Inaccessible à qui ne maîtrise pas la magie du vent.", units: [{ name: "Vents-Lames", count: "800", role: "Guerriers volants, maîtres du vent" }, { name: "Archers Célestes", count: "1 200", role: "Tir de précision depuis les hauteurs" }, { name: "Gardiens des Îles", count: "2 500", role: "Défense des plateformes flottantes" }] },
  },
  {
    slug: "thogdur", name: "Thogdur", type: "Royaume orc", population: "80 000 habitants",
    description: "Dirigé par le gobelin Thogdur d'une main de fer, interdit aux humains ou aux elfes.",
    character: "Fermé · Autoritaire · Esclavagiste", accent: "#8ab870",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Horde de Thogdur", total: "~22 000 soldats", description: "La plus grande armée brute d'Izaria. Compensée par des effectifs colossaux et une férocité sans limite.", units: [{ name: "Berserkers Orcs", count: "8 000", role: "Infanterie de choc, charge frontale" }, { name: "Esclaves de Guerre", count: "10 000", role: "Chair de canon et porteurs" }, { name: "Shamans de Combat", count: "500", role: "Soutien magique tribal" }, { name: "Garde de Thogdur", count: "3 500", role: "Élite gobeline fanatiquement loyale" }] },
  },
  {
    slug: "mitsurin", name: "Mitsurin", type: "Confédération tribale", population: "30 000 habitants",
    description: "Région reculée du nord ne connaissant que la loi de la jungle. Douze tribus ; un conseil tous les 122 nuits.",
    character: "Tribal · Sauvage · Isolé", accent: "#6fcf6f",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "La Force du Mitsurin", total: "15 500 hommes (12 tribus)", description: "Une armée de jungle forgée par la survie. Ils ne connaissent pas la discipline impériale — ils connaissent la forêt.", units: [{ name: "Éclaireurs", count: "500", role: "Hachette et dague — reconnaissance et embuscades" }, { name: "Chasseurs", count: "10 000", role: "Arc — harcèlement à distance et piégeage" }, { name: "Berserkers", count: "5 000", role: "Hache et potion de rage — charge frénétique" }] },
  },
  {
    slug: "territoire-libre", name: "Territoire Libre", type: "??? — à définir", population: "???",
    description: "Les informations sur cette nation sont encore en cours de rédaction.",
    character: "??? · ??? · ???", accent: "#8888aa",
    nationHref: "#", leaderHref: "#", status: "pending",
    army: { name: "??? — à définir", total: "???", description: "Données non renseignées.", units: [{ name: "À compléter", count: "???", role: "Informations à venir" }] },
  },
  {
    slug: "zone-ombre", name: "Zone d'Ombre", type: "??? — à définir", population: "???",
    description: "Les informations sur cette région sont encore en cours de rédaction.",
    character: "??? · ??? · ???", accent: "#8888aa",
    nationHref: "#", leaderHref: "#", status: "pending",
    army: { name: "??? — à définir", total: "???", description: "Données non renseignées.", units: [{ name: "À compléter", count: "???", role: "Informations à venir" }] },
  },
  {
    slug: "terres-desolees", name: "Terres Désolées", type: "??? — à définir", population: "???",
    description: "Les informations sur cette région sont encore en cours de rédaction.",
    character: "??? · ??? · ???", accent: "#8888aa",
    nationHref: "#", leaderHref: "#", status: "pending",
    army: { name: "??? — à définir", total: "???", description: "Données non renseignées.", units: [{ name: "À compléter", count: "???", role: "Informations à venir" }] },
  },
  {
    slug: "saltir", name: "Saltir", type: "Sultanat fondateur", population: "Inconnue",
    description: "Nation fondatrice de la Triple Alliance. Prise en tenaille durant la guerre de 2 ans — ses alliés ne répondirent jamais. Saltir n'existe plus.",
    character: "Fondatrice · Désertique · Abandonnée", accent: "#8B6914",
    nationHref: "#", leaderHref: "#", status: "destroyed",
    army: { name: "— Dissoute —", total: "Nation disparue", description: "L'armée de Saltir fut décimée. Ses cavaliers se soulevèrent, ses côtes furent attaquées.", units: [{ name: "Cavaliers du Désert", count: "†", role: "Se soulevèrent contre leur propre nation" }, { name: "Garnisons Côtières", count: "†", role: "Écrasées lors du débarquement d'Hokkaido" }] },
  },
  {
    slug: "toundra", name: "Toundra", type: "Grande nation", population: "Inconnue",
    description: "Grande perdante de la guerre de 2 ans. Sa capitale Draguiroux fut rasée. Ses dirigeants sont morts ou au service des nouvelles nations. Toundra n'existe plus.",
    character: "Insouciante · Forestière · Rasée", accent: "#5a7a5a",
    nationHref: "#", leaderHref: "#", status: "destroyed",
    army: { name: "— Dissoute —", total: "Nation disparue", description: "Surprise et anéantie. Draguiroux rasée. Ses chefs de guerre sont morts ou sous joug étranger.", units: [{ name: "Défenseurs de Draguiroux", count: "†", role: "Écrasés lors de la prise de la capitale" }, { name: "Milice Forestière", count: "†", role: "Dispersée, sans résistance cohérente" }] },
  },
  {
    slug: "azandor", name: "Azandor", type: "Royaume anéanti", population: "Inconnue",
    description: "Uzall envoya un assassin tuer l'Impératrice Narset. L'assassin fut arrêté. Narset marcha sur la capitale, décapita Uzall de sa propre main et fit brûler la ville. Azandor n'existe plus.",
    character: "Ambitieux · Instable · Brûlé", accent: "#8B2020",
    nationHref: "#", leaderHref: "#", status: "destroyed",
    army: { name: "— Anéantie —", total: "Nation disparue", description: "L'armée capitula sans combattre. Uzall décapité. La ville brûlée jusqu'aux fondations.", units: [{ name: "Garde de Saan Uzall", count: "†", role: "Décapitée avec leur maître par Narset" }, { name: "Armée Royale", count: "†", role: "Rendue lors de l'invasion d'Asdorath" }] },
  },
]

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({ nation }: { nation: Nation }) {
  const [armyOpen, setArmyOpen] = useState(false)
  const isDestroyed = nation.status === "destroyed"
  const isPending = nation.status === "pending"

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-white border h-full flex flex-col transition-all duration-500"
      style={{ borderColor: `${nation.accent}35`, boxShadow: `0 8px 40px ${nation.accent}18` }}
    >
      {/* Panorama */}
      <div className="relative h-64 shrink-0 overflow-hidden">
        <Image
          src={`/nations/${nation.slug}/panorama.png`}
          alt={nation.name}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-700"
          style={{ filter: isDestroyed ? "grayscale(55%) brightness(0.75)" : "brightness(0.82)" }}
          priority
        />
        {/* Gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)" }} />

        {/* Accent tint */}
        <div className="absolute inset-0 opacity-15" style={{ background: `linear-gradient(135deg, ${nation.accent} 0%, transparent 60%)` }} />

        {/* Destroyed hatch */}
        {isDestroyed && (
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 16px)" }} />
        )}

        {/* Status badge */}
        {(isPending || isDestroyed) && (
          <div className="absolute top-4 left-4 z-10">
            <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border backdrop-blur-md"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white", background: isDestroyed ? "rgba(139,32,32,0.6)" : "rgba(80,80,120,0.6)" }}>
              {isDestroyed ? "☠ Disparue" : "À compléter"}
            </span>
          </div>
        )}

        {/* Name overlay on panorama */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <p className="font-cinzel text-xs tracking-[0.25em] uppercase mb-1" style={{ color: `${nation.accent}` }}>
            {nation.type}
          </p>
          <h2
            className="font-cinzel font-bold text-white mb-1"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              lineHeight: 1.1,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              textDecoration: isDestroyed ? "line-through" : "none",
              textDecorationColor: "rgba(255,255,255,0.4)",
            }}
          >
            {nation.name}
          </h2>
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-white/50 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <p className="font-jost text-xs text-white/60">{nation.population}</p>
          </div>
        </div>

        {/* Blason — bottom right of panorama, fully inside */}
        <div className="absolute bottom-4 right-4 z-20">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 shadow-xl bg-white/10 backdrop-blur-sm"
            style={{ borderColor: `${nation.accent}80` }}>
            <Image
              src={`/nations/${nation.slug}/blason.png`}
              alt={`Blason ${nation.name}`}
              width={64} height={64}
              className="object-cover w-full h-full"
              style={{ filter: isDestroyed ? "grayscale(50%)" : "none" }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Traits */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {nation.character.split(" · ").map((trait) => (
            <span key={trait} className="font-jost text-xs px-2.5 py-1 rounded-full border"
              style={{ borderColor: `${nation.accent}40`, color: nation.accent, background: `${nation.accent}0d` }}>
              {trait}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-jost text-[#4A5568] text-sm leading-relaxed flex-1 mb-5">
          {nation.description}
        </p>

        {/* Divider */}
        <div className="h-px mb-5" style={{ background: `linear-gradient(to right, ${nation.accent}40, transparent)` }} />

        {/* Buttons */}
        {!isDestroyed ? (
          <div className="flex flex-wrap gap-2 mb-4">
            <a href={nation.nationHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-cinzel text-[10px] tracking-wider uppercase px-4 py-2 rounded-lg border transition-all duration-200 hover:brightness-95"
              style={{ borderColor: `${nation.accent}50`, color: nation.accent, background: `${nation.accent}0d` }}>
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Fiche de nation
            </a>
            <a href={nation.leaderHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-cinzel text-[10px] tracking-wider uppercase px-4 py-2 rounded-lg border transition-all duration-200 hover:bg-[#4A5568]/5"
              style={{ borderColor: "#E5E1D8", color: "#4A5568" }}>
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
              Fiche de dirigeant
            </a>
            <button onClick={() => setArmyOpen(o => !o)}
              className="inline-flex items-center gap-1.5 font-cinzel text-[10px] tracking-wider uppercase px-4 py-2 rounded-lg border transition-all duration-200 ml-auto"
              style={{ borderColor: armyOpen ? `${nation.accent}60` : "#E5E1D8", color: armyOpen ? nation.accent : "#4A5568", background: armyOpen ? `${nation.accent}0d` : "transparent" }}>
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
              Armée
              <svg className="w-2.5 h-2.5 shrink-0 transition-transform duration-300"
                style={{ transform: armyOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <p className="font-cinzel text-[10px] tracking-widest uppercase mb-3" style={{ color: nation.accent }}>
            ☠ Archives historiques
          </p>
        )}

        {/* Army accordion */}
        <div className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: (isDestroyed || armyOpen) ? "500px" : "0px", opacity: (isDestroyed || armyOpen) ? 1 : 0 }}>
          <div className="rounded-xl border p-4" style={{ borderColor: `${nation.accent}22`, background: `${nation.accent}06` }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-cinzel font-bold text-[#1A1A2E] text-xs mb-0.5">{nation.army.name}</p>
                <p className="font-jost text-[11px]" style={{ color: nation.accent }}>{nation.army.total}</p>
              </div>
            </div>
            <p className="font-jost text-[11px] text-[#4A5568] leading-relaxed mb-3">{nation.army.description}</p>
            <div className="space-y-1.5">
              {nation.army.units.map((unit) => (
                <div key={unit.name} className="flex items-start gap-2.5 rounded-lg px-3 py-2 border bg-white"
                  style={{ borderColor: `${nation.accent}18` }}>
                  <div className="shrink-0 font-cinzel font-bold text-[10px] px-2 py-0.5 rounded"
                    style={{ color: nation.accent, background: `${nation.accent}12`, minWidth: "2.8rem", textAlign: "center" }}>
                    {unit.count}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cinzel text-[#1A1A2E] text-[10px] font-bold leading-snug">{unit.name}</p>
                    <p className="font-jost text-[10px] text-[#4A5568] mt-0.5 leading-snug">{unit.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Mini Card ────────────────────────────────────────────────────────────────

function MiniCard({ nation, isActive, onClick }: { nation: Nation; isActive: boolean; onClick: () => void }) {
  const isDestroyed = nation.status === "destroyed"
  const isPending = nation.status === "pending"

  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-xl overflow-hidden border transition-all duration-200 relative flex items-stretch gap-0"
      style={{
        borderColor: isActive ? nation.accent : "#E5E1D8",
        boxShadow: isActive ? `0 2px 16px ${nation.accent}25` : "none",
        background: "white",
      }}
    >
      {/* Panorama thumbnail */}
      <div className="relative w-20 shrink-0 overflow-hidden">
        <Image
          src={`/nations/${nation.slug}/panorama.png`}
          alt={nation.name}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ filter: isDestroyed ? "grayscale(60%) brightness(0.7)" : "brightness(0.85)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, white 100%)" }} />
      </div>

      {/* Active indicator bar */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r" style={{ background: nation.accent }} />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 py-2.5 pr-3 pl-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          {/* Blason mini */}
          <div className="w-5 h-5 rounded overflow-hidden border shrink-0" style={{ borderColor: `${nation.accent}50` }}>
            <Image
              src={`/nations/${nation.slug}/blason.png`}
              alt=""
              width={20} height={20}
              className="object-cover w-full h-full"
              style={{ filter: isDestroyed ? "grayscale(60%)" : "none" }}
            />
          </div>
          <p className="font-cinzel font-bold text-[11px] text-[#1A1A2E] leading-tight truncate"
            style={{ textDecoration: isDestroyed ? "line-through" : "none", textDecorationColor: "rgba(0,0,0,0.3)" }}>
            {nation.name}
          </p>
        </div>
        <p className="font-jost text-[10px] truncate" style={{ color: nation.accent }}>
          {nation.type}
        </p>
        {(isPending || isDestroyed) && (
          <span className="inline-block font-cinzel text-[8px] tracking-wider uppercase mt-1 px-1.5 py-0.5 rounded"
            style={{ color: isDestroyed ? "#8B2020" : "#8888aa", background: isDestroyed ? "rgba(139,32,32,0.08)" : "rgba(136,136,170,0.08)" }}>
            {isDestroyed ? "☠ Disparue" : "À compléter"}
          </span>
        )}
      </div>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const FILTER_KEYS = {
  all: nations.map(n => n.slug),
  actual: ["asdorath","alakasham","arcabios","dakurodo","hokkaido","ipulos-tacderen","solarsen","tengoku","thogdur","mitsurin"],
  unknown: ["territoire-libre","zone-ombre","terres-desolees"],
  destroyed: ["saltir","toundra","azandor"],
}

export default function NationsPage() {
  const [filter, setFilter] = useState<keyof typeof FILTER_KEYS>("all")
  const [selectedSlug, setSelectedSlug] = useState<string>("alakasham")

  const visible = nations.filter(n => FILTER_KEYS[filter].includes(n.slug))

  // If current selection not in filtered list, default to first
  const featured = visible.find(n => n.slug === selectedSlug) ?? visible[0]

  const handleFilterChange = useCallback((key: keyof typeof FILTER_KEYS) => {
    setFilter(key)
    const newVisible = nations.filter(n => FILTER_KEYS[key].includes(n.slug))
    if (!newVisible.find(n => n.slug === selectedSlug)) {
      setSelectedSlug(newVisible[0]?.slug ?? "")
    }
  }, [selectedSlug])

  const typeGroups: { key: keyof typeof FILTER_KEYS; label: string }[] = [
    { key: "all", label: "Toutes" },
    { key: "actual", label: "Actuelles" },
    { key: "destroyed", label: "Disparues" },
    { key: "unknown", label: "Inconnues" },
  ]

  return (
    <ScrollRevealProvider>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative min-h-[42vh] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #060D15 0%, #0D1B2A 40%, #060D15 100%)" }}
        >
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")` }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <div className="absolute top-0 left-[10%] w-72 h-72 rounded-full blur-[80px]" style={{ background: "#FFB84A" }} />
            <div className="absolute top-0 right-[15%] w-64 h-64 rounded-full blur-[80px]" style={{ background: "#FF4A4A" }} />
            <div className="absolute bottom-0 left-[30%] w-56 h-56 rounded-full blur-[80px]" style={{ background: "#4AC8FF" }} />
            <div className="absolute bottom-0 right-[10%] w-48 h-48 rounded-full blur-[80px]" style={{ background: "#B44AFF" }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
          <div className="relative z-10 text-center px-4 pt-24 pb-16">
            <p className="eyebrow text-[#C9974A] mb-4">Cartographie politique</p>
            <h1 className="font-cinzel font-bold text-[#F0EDE8] mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}>
              Les Nations d&apos;Izaria
            </h1>
            <p className="font-jost text-[#F0EDE8]/50 text-lg max-w-xl mx-auto">
              Onze nations, onze destins. Chacune porte en elle une histoire, une ambition, et une armée prête à défendre — ou à conquérir.
            </p>
          </div>
        </section>

        {/* ── Stats + filters ── */}
        <div className="bg-white border-b border-[#E5E1D8] px-6 py-5 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-6 md:gap-10">
              {[
                { label: "Nations actives", value: "10" },
                { label: "Population totale", value: "~650 000" },
                { label: "Disparues", value: "3" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-cinzel font-bold text-lg md:text-xl text-[#1A1A2E]">{value}</p>
                  <p className="font-jost text-[10px] text-[#4A5568]/50 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {typeGroups.map(({ key, label }) => (
                <button key={key} onClick={() => handleFilterChange(key)}
                  className="font-cinzel text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200"
                  style={{
                    borderColor: filter === key ? "#C9974A" : "#E5E1D8",
                    color: filter === key ? "#C9974A" : "#4A5568",
                    background: filter === key ? "rgba(201,151,74,0.08)" : "transparent",
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Magazine layout ── */}
        <section className="bg-[#EFF4FB] px-4 md:px-6 py-10">
          <div className="max-w-7xl mx-auto">

            {/* Desktop: featured left + sidebar right */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-5 items-start">

              {/* Featured */}
              <div className="sticky top-[89px]">
                {featured && <FeaturedCard key={featured.slug} nation={featured} />}
              </div>

              {/* Sidebar — scrollable list */}
              <div className="flex flex-col gap-2.5 max-h-[calc(100vh-120px)] overflow-y-auto pr-1"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#D4C5A9 transparent" }}>
                {visible.map((nation) => (
                  <MiniCard
                    key={nation.slug}
                    nation={nation}
                    isActive={nation.slug === featured?.slug}
                    onClick={() => setSelectedSlug(nation.slug)}
                  />
                ))}
              </div>
            </div>

            {/* Mobile: mini cards grid + selected detail below */}
            <div className="lg:hidden space-y-4">
              {/* Mini cards scroll horizontal */}
              <div className="flex gap-2.5 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {visible.map((nation) => (
                  <button
                    key={nation.slug}
                    onClick={() => setSelectedSlug(nation.slug)}
                    className="shrink-0 flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all duration-200"
                    style={{
                      borderColor: nation.slug === featured?.slug ? nation.accent : "#E5E1D8",
                      background: nation.slug === featured?.slug ? `${nation.accent}0d` : "white",
                      minWidth: "80px",
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden border"
                      style={{ borderColor: `${nation.accent}50` }}>
                      <Image
                        src={`/nations/${nation.slug}/blason.png`}
                        alt={nation.name}
                        width={48} height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="font-cinzel text-[9px] font-bold text-center text-[#1A1A2E] leading-tight line-clamp-2"
                      style={{ maxWidth: "72px" }}>
                      {nation.name}
                    </p>
                  </button>
                ))}
              </div>

              {/* Featured detail */}
              {featured && <FeaturedCard key={featured.slug} nation={featured} />}
            </div>

          </div>
        </section>

        {/* ── Note MJ ── */}
        <section className="bg-[#F8FAFD] border-t border-[#D4C5A9]/40 px-6 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="reveal rounded-xl border border-[#E5E1D8] bg-white p-6">
              <p className="font-cinzel text-[#C9974A] text-[10px] tracking-widest uppercase mb-4">Note du Maître du Jeu</p>
              <div className="grid md:grid-cols-3 gap-4 font-jost text-sm text-[#4A5568] leading-relaxed">
                <p>Les fiches de nation contiennent les règles spécifiques, l'histoire, la géographie et les relations diplomatiques de chaque territoire.</p>
                <p>Les fiches de dirigeant décrivent le personnage non-joueur à la tête de chaque nation : biographie, motivations, capacités et rumeurs.</p>
                <p>Les données militaires sont approximatives. Les nations disparues sont consignées à titre d'archives historiques.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </ScrollRevealProvider>
  )
}
