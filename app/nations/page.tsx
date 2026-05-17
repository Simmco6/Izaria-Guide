"use client"

import React, { useState } from "react"
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
  glow: string
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
    character: "Commercial · Matriarcal · Aride", accent: "#FFB84A", glow: "rgba(255,184,74,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Garde du Sable", total: "~4 000 soldats", description: "Une armée de mercenaires et de cavaliers d'élite, recrutés au plus offrant. La loyauté se paie en or.", units: [{ name: "Cavaliers du Désert", count: "1 200", role: "Cavalerie légère, raids et éclaireurs" }, { name: "Mercenaires de la Lame", count: "2 000", role: "Infanterie lourde contractuelle" }, { name: "Arbalétriers de Sable", count: "800", role: "Soutien à distance et défense des caravanes" }] },
  },
  {
    slug: "arcabios", name: "Arcabios", type: "Royaume épéiste", population: "50 000 habitants",
    description: "Fondé par un maître épéiste, ce royaume fut bâti sur une partie des anciennes terres de Toundra et de sa capitale, Draguiroux. Elle fut entièrement reconstruite après la guerre. Il y fait bon vivre tant que vous n'êtes pas originaire d'Hokkaido. Arcabios est connu pour sa bibliothèque et son académie des Épéistes. Les lois de la nation sont réparties en 3 codes qui dictent tous les faits et gestes du royaume. Le monarque et ses sept conseillers veillent à ce que les plaines de la contrée soient exemptes de bandits et pillards. Cela nuirait au tourisme magique qui vient pour les trésors de sa bibliothèque.",
    character: "Érudit · Guerrier · Ordonné", accent: "#912525", glow: "rgba(176,173,173,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Ordre de la Lame", total: "~5 500 soldats", description: "Chaque soldat est aussi lettré que guerrier. L'académie d'Arcabios forme les meilleurs duellistes du continent.", units: [{ name: "Maîtres Épéistes", count: "800", role: "Élite de l'Académie, duellistes hors pair" }, { name: "Gardiens de la Bibliothèque", count: "300", role: "Protection des archives et des artefacts" }, { name: "Milice Ordonnée", count: "4 400", role: "Infanterie standard disciplinée" }] },
  },
  {
    slug: "asdorath", name: "Asdorath", type: "Empire", population: "100 000 habitants",
    description: "Cette ancienne grande nation a préféré signer l'armistice lorsque son empereur fut exécuté par la main du roi d'Hokkaido. Maintenant que la guerre de 2 ans est finie, la hargne de son impératrice fait que sa nation tient encore debout. Avec les années, les problèmes internes ont tendance à se calmer, mais Asdorath cherche des alliés de toutes parts car non seulement elle craint Dakurodo, mais elle aimerait surtout anéantir Hokkaido une bonne fois pour toutes.",
    character: "Puissant · Militaire · Politique", accent: "#E8793A", glow: "rgba(232,121,58,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Légions de l'Empire", total: "~18 000 soldats", description: "La force militaire la plus imposante d'Izaria. Disciplinée, hiérarchisée, redoutée.", units: [{ name: "Légionnaires de Narset", count: "8 000", role: "Infanterie lourde d'élite impériale" }, { name: "Chevaliers du Trône", count: "2 000", role: "Cavalerie blindée, garde rapprochée" }, { name: "Arquebusiers Impériaux", count: "4 000", role: "Artillerie et soutien à distance" }, { name: "Mages de Guerre", count: "500", role: "Appui magique de combat" }, { name: "Corps du Renseignement", count: "3 500", role: "Espionnage, infiltration, contre-espionnage" }] },
  },
  {
    slug: "dakurodo", name: "Dakurodo", type: "Royaume sombre", population: "70 000 habitants",
    description: "Dakurodo est une nation atypique. Grand royaume du nord, on dit que la reine de Dakurodo est en train de soulever une immense armée. Ce royaume n'est allié de personne, et pourquoi le serait-il quand on est le plus lugubre, où vivent les pires démons et nécromanciens. Ici, le meurtre est autorisé tant qu'il respecte le modèle féodal ou que c'est un sacrifice d'étranger. Les anges n'ont bien entendu pas leur place ici.",
    character: "Sombre · Interdit · Menaçant", accent: "#221212", glow: "rgba(255,74,74,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Armée des Morts", total: "Indéterminé", description: "Une horde de morts-vivants et de créatures démoniaques, augmentée en permanence. Elle ne connaît ni fatigue ni peur.", units: [{ name: "Nécromanciens de Cour", count: "120", role: "Commandement et invocation de masse" }, { name: "Légion Squelettique", count: "∞", role: "Chair de canon animée, masse infiniment renouvelable" }, { name: "Démons Contractuels", count: "Inconnu", role: "Entités liées par pacte, force de frappe dévastatrice" }, { name: "Gardes Vivants", count: "2 000", role: "Humains corrompus, infanterie de choc" }] },
  },
  {
    slug: "hokkaido", name: "Hokkaido", type: "Royaume samourai", population: "30 000 habitants",
    description: "Entre petit fief du royaume de Toundra, tanière mafieuse et grand vainqueur de la guerre de 2 ans, la croissance de cette île de l'ouest fut fulgurante, mais sa chute a été tout autant spectaculaire. Les membres de l'ancienne famille royale se sont fait décimer. Entre duels à mort et assassinats, ils ont tous connu un triste sort. Une seule d'entre eux est portée disparue. Un conclave des 5 familles a été alors mis en place. Cette organisation élit les nouveaux rois d'Hokkaido, du moins en théorie, car la reine actuelle en a décidé autrement.",
    character: "Samourai · Mafieux · Menaçant", accent: "#B44AFF", glow: "rgba(180,74,255,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Clan des Ombres Pourpres", total: "~3 200 soldats", description: "Une armée double : samourais honorables en façade, réseau de yakuzas dans l'ombre. La distinction est souvent floue.", units: [{ name: "Samourais de Rang", count: "600", role: "Élite martiale, code de l'honneur strict" }, { name: "Ninja du Clan", count: "400", role: "Assassins, espions, exécuteurs" }, { name: "Milice Insulaire", count: "2 200", role: "Défense côtière et garnison" }] },
  },
  {
    slug: "ipulos-tacderen", name: "Ipulos Tacderen", type: "Royaume du fer", population: "20 000 habitants",
    description: "La nation du fer, lieu où tous les rêves, tant qu'ils contiennent des métaux, se voient réalisés. Gardant quelques séquelles de la guerre dont elle a été victime, son symbole, l'éclipse, représente l'émergence de cet empire, à l'instar du soleil qui se dégage de l'ombre que lui fait la lune. Mais d'autres y voient le regard impitoyable de la famille souveraine, les Mélisande, qui surveillent d'un œil avide leur trésor. La tour, refuge des défunts de la Grande guerre, surplombe et veille sur la ville et le moindre de ses habitants. Ici, il n'y a pas de loi écrite, les habitants ont toujours raison, les étrangers se doivent de payer un impôt pour obtenir le droit de passage. Les Tacderiens sont connus pour leur maîtrise du fer et sont fascinés par le pouvoir qu'exerce l'électricité sur ce dernier. Ils s'en servent même pour le travailler; les armes et armures forgées par la foudre sont un savoir qu'eux seuls maîtrisent et qui vaut, par la même occasion, leur réputation.",
    character: "Voleur · Forgeron · Menaçant", accent: "#a0a09e", glow: "rgba(160,160,158,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Forge-Guerre", total: "~2 800 soldats", description: "Les meilleurs équipements du monde au service d'une armée réduite mais redoutablement armée.", units: [{ name: "Forgerons-Soldats", count: "500", role: "Artisans de guerre, réparation et fabrication en campagne" }, { name: "Chevaliers de Fer", count: "800", role: "Cavalerie lourde en armure intégrale forgée sur mesure" }, { name: "Pillards Mécanisés", count: "1 500", role: "Infanterie équipée d'armes expérimentales" }] },
  },
  {
    slug: "mitsurin", name: "Mitsurin", type: "Confédération tribale", population: "30 000 habitants",
    description: "Le Mitsurin, région reculée du nord, ne connaît que la loi de la jungle. Elle recouvre, d'ailleurs, la presque totalité du territoire. Ce sont des tribus qui dirigent cette nation; un conseil se regroupe chaque 122 nuits pour régler les problèmes internes de cette terre coupée du monde.",
    character: "Tribal · Démocratique · Isolé", accent: "#6fcf6f", glow: "rgba(111,207,111,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "La Force du Mitsurin", total: "15 500 hommes (12 tribus)", description: "Une armée de jungle forgée par la survie. Ils ne connaissent pas la discipline impériale — ils connaissent la forêt.", units: [{ name: "Éclaireurs", count: "500", role: "Hachette et dague — reconnaissance, embuscades et éliminations silencieuses" }, { name: "Chasseurs", count: "10 000", role: "Arc — tir de précision, harcèlement à distance, piégeage du terrain" }, { name: "Berserkers", count: "5 000", role: "Hache et potion de rage — charge frontale dévastatrice" }] },
  },
  {
    slug: "solarsen", name: "Solarsen", type: "Royaume maritime", population: "42 000 habitants",
    description: "Solarsen est un royaume fraîchement indépendant, ancienne province d'Asdorath devenue puissance commerciale. C'est une nation en plein essor, dont les ravages de la guerre marquent encore les terres. Solarsen reste un pays ouvert aux marchandises et autres commerces en tout genre, malgré une loi stricte pour les étrangers.",
    character: "Maritime · Magique · Indépendant", accent: "#4AC8FF", glow: "rgba(74,200,255,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Flotte de l'Indépendance", total: "~5 000 soldats + 40 navires", description: "La puissance de Solarsen est navale avant tout. Sur terre, elle est défensive. Sur mer, elle est souveraine.", units: [{ name: "Marines d'Élite", count: "1 200", role: "Infanterie de bord, abordage et défense portuaire" }, { name: "Mages des Marées", count: "300", role: "Contrôle magique des courants et tempêtes" }, { name: "Flotte Marchande Armée", count: "3 500", role: "Marins combattants réquisitionnables" }] },
  },
  {
    slug: "tengoku", name: "Tengoku", type: "Îles flottantes", population: "75 000 habitants",
    description: "Tengoku est une nation à part : en effet, elle est composée d'îles volantes et possède une évolution fortement avancée. Ses habitants s'intéressent particulièrement à l'espace au détriment de leur propre planète. Étant isolée du reste du monde, cette nation est relativement neutre, sauf avec Arcabios et Asdorath. Les trois royaumes entretiennent d'étroites relations. En effet, la grande bibliothèque d'Arcabios abrite les runes fondatrices de Tengoku, et ce sont des explorateurs d'Asdorath qui ont découvert Tengoku.",
    character: "Mystique · Aérien · Isolé", accent: "#9090a8", glow: "rgba(144,144,168,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Gardiens du Ciel", total: "~4 500 soldats", description: "Une armée qui combat dans les airs. Inaccessible à qui ne maîtrise pas la magie du vent.", units: [{ name: "Vents-Lames", count: "800", role: "Guerriers volants, maîtres de la magie du vent" }, { name: "Archers Célestes", count: "1 200", role: "Tir de précision depuis les hauteurs" }, { name: "Gardiens des Îles", count: "2 500", role: "Défense statique des plateformes flottantes" }] },
  },
  {
    slug: "thogdur", name: "Thogdur", type: "Royaume orc", population: "80 000 habitants",
    description: "Bien que plutôt jeune et parti de zéro sur les terres de Saltir, le Royaume de Thogdur est devenu une puissance importante sur le plan commercial, militaire et diplomatique. Dirigé par le gobelin Thogdur d'une main de fer, le Royaume de Thogdur est l'un des plus fermés, interdit aux humains ou encore aux elfes ; l'ordre et l'autorité y règnent plus que tout. Esclavagisme, pillages ou encore massacres massifs, telles sont les pratiques du Roi Thogdur, faisant de lui le Gobelin le plus respecté par tous les orcs qui composent le pays.",
    character: "Fermé · Autoritaire · Esclavagiste", accent: "#8ab870", glow: "rgba(138,184,112,0.12)",
    nationHref: "#", leaderHref: "#", status: "active",
    army: { name: "Horde de Thogdur", total: "~22 000 soldats", description: "La plus grande armée brute d'Izaria. Peu sophistiquée, mais compensée par des effectifs colossaux et une férocité sans limite.", units: [{ name: "Berserkers Orcs", count: "8 000", role: "Infanterie de choc, charge frontale dévastatrice" }, { name: "Esclaves de Guerre", count: "10 000", role: "Chair de canon, mineurs et porteurs en campagne" }, { name: "Shamans de Combat", count: "500", role: "Soutien magique tribal, malédictions et soins" }, { name: "Garde Personnelle de Thogdur", count: "3 500", role: "Élite gobeline, fanatiquement loyale" }] },
  },
  // ── Inconnues ─────────────────────────────────────────────────────────────────
  {
    slug: "territoire-libre", name: "Territoire Libre", type: "??? — à définir", population: "???",
    description: "Les informations sur cette nation sont encore en cours de rédaction. Revenez bientôt.",
    character: "??? · ??? · ???", accent: "#8888aa", glow: "rgba(136,136,170,0.10)",
    nationHref: "#", leaderHref: "#", status: "pending",
    army: { name: "??? — à définir", total: "???", description: "Les données militaires n'ont pas encore été renseignées.", units: [{ name: "À découvrir", count: "???", role: "Informations à venir" }] },
  },
  {
    slug: "zone-ombre", name: "Zone d'Ombre", type: "??? — à définir", population: "???",
    description: "Les informations sur cette région sont encore en cours de rédaction. Revenez bientôt.",
    character: "??? · ??? · ???", accent: "#8888aa", glow: "rgba(136,136,170,0.10)",
    nationHref: "#", leaderHref: "#", status: "pending",
    army: { name: "??? — à définir", total: "???", description: "Les données militaires n'ont pas encore été renseignées.", units: [{ name: "À découvrir", count: "???", role: "Informations à venir" }] },
  },
  {
    slug: "terres-desolees", name: "Terres Désolées", type: "??? — à définir", population: "???",
    description: "Les informations sur cette région sont encore en cours de rédaction. Revenez bientôt.",
    character: "??? · ??? · ???", accent: "#8888aa", glow: "rgba(136,136,170,0.10)",
    nationHref: "#", leaderHref: "#", status: "pending",
    army: { name: "??? — à définir", total: "???", description: "Les données militaires n'ont pas encore été renseignées.", units: [{ name: "À découvrir", count: "???", role: "Informations à venir" }] },
  },
  // ── Disparues ─────────────────────────────────────────────────────────────────
  {
    slug: "saltir", name: "Saltir", type: "Sultanat fondateur", population: "Inconnue",
    description: "Saltir était composée d'un désert qui fut sa plus grande force, mais c'est aussi ce qui créa sa chute. Nation fondatrice de la Triple Alliance, elle fut prospère et son climat chaud fut un avantage, et cela est encore vrai aujourd'hui bien que la nation soit tombée après avoir été prise en tenaille durant la guerre de 2 ans. Entre le soulèvement de ses cavaliers du désert et l'attaque d'Hokkaido sur les côtes, elle appela désespérément ses alliés qui ne furent d'aucune aide. Cette nation n'existe plus aujourd'hui.",
    character: "Fondatrice · Désertique · Abandonnée", accent: "#8B6914", glow: "rgba(139,105,20,0.12)",
    nationHref: "#", leaderHref: "#", status: "destroyed",
    army: { name: "— Dissoute —", total: "Nation disparue", description: "L'armée de Saltir fut décimée et dispersée. Ses chefs de guerre furent tués ou capturés. La nation fut abandonnée par ses alliés et laissée à l'abandon." , units: [{ name: "Cavaliers du Désert", count: "†", role: "Anéantis lors de la prise de Saltir" }, { name: "Mercenaires de la Lame", count: "†", role: "Dissous, certains capturés, d'autres tués" }, { name: "Arbalétriers de Sable", count: "†", role: "Décimés, incapables de défendre les caravanes" }] },
  },
  {
    slug: "toundra", name: "Toundra", type: "Grande nation", population: "Inconnue",
    description: "Toundra a un climat plutôt stable ; à vrai dire, il est composé de températures généralement comprises entre 5 et 25 degrés. On y remarque une forte présence forestière, des montagnes et un marais. Grande perdante de la guerre de 2 ans, cette grande nation ne vit pas venir l'attaque d'Hokkaido. Son insouciance créa sa perte. Sa capitale, Draguiroux, fut pratiquement rasée, et ses hauts dirigeants sont soit morts soit au service des nouvelles nations. Cette nation n'existe plus aujourd'hui.",
    character: "Insouciante · Forestière · Rasée", accent: "#5a7a5a", glow: "rgba(90,122,90,0.12)",
    nationHref: "#", leaderHref: "#", status: "destroyed",
    army: { name: "— Dissoute —", total: "Nation disparue", description: "L'armée de Toundra fut surprise et anéantie. Draguiroux rasée. Ses chefs de guerre sont morts ou sous joug étranger.", units: [{ name: "Défenseurs de Draguiroux", count: "†", role: "Écrasés lors de la prise de la capitale" }, { name: "Milice Forestière", count: "†", role: "Dispersée, incapable d'organiser une résistance" }] },
  },
  {
    slug: "azandor", name: "Azandor", type: "Royaume anéanti", population: "Inconnue",
    description: "Le royaume d'Azandor était le fruit des ambitions de Saan Uzall. Mais cette nation était déchirée par des troubles internes entre ses murs. Pris de folie et d'une jalousie absolue, Uzall envoya un assassin tuer l'Impératrice voisine, Régina de Narset d'Asdorath. Cet assassin a été arrêté juste après son arrivée dans le château. Narset décida alors de marcher sur la capitale avec ses cavaliers et décapita elle-même Saan Uzall ainsi que tous ses dignitaires avant de brûler entièrement la ville. Cette nation n'existe plus aujourd'hui.",
    character: "Ambitieux · Instable · Brûlé", accent: "#8B2020", glow: "rgba(139,32,32,0.12)",
    nationHref: "#", leaderHref: "#", status: "destroyed",
    army: { name: "— Anéantie —", total: "Nation disparue", description: "L'armée capitula sans combattre. Uzall et ses dignitaires furent décapités. La ville brûlée jusqu'aux fondations.", units: [{ name: "Garde de Saan Uzall", count: "†", role: "Décapitée avec leur maître par Narset" }, { name: "Armée Royale", count: "†", role: "Rendue ou dissoute lors de l'invasion d'Asdorath" }] },
  },
]

// ─── Nation Tab ───────────────────────────────────────────────────────────────

function NationTab({ nation, isSelected, onClick }: { nation: Nation; isSelected: boolean; onClick: () => void }) {
  const isDestroyed = nation.status === "destroyed"
  const isPending = nation.status === "pending"

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 text-center w-full relative overflow-hidden"
      style={{
        background: isSelected ? `${nation.accent}10` : "white",
        borderColor: isSelected ? nation.accent : "#E5E1D8",
        boxShadow: isSelected ? `0 2px 10px ${nation.glow}` : "none",
        opacity: isDestroyed ? 0.75 : 1,
      }}
    >
      <div
        className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border"
        style={{ borderColor: isSelected ? `${nation.accent}60` : "#E5E1D8" }}
      >
        <Image
          src={`/nations/${nation.slug}/blason.png`}
          alt={nation.name}
          fill sizes="56px"
          className="object-cover transition-transform duration-200 group-hover:scale-110"
          style={{ filter: isDestroyed ? "grayscale(50%)" : "none" }}
        />
      </div>
      <p
        className="font-cinzel font-bold text-xs leading-tight"
        style={{
          color: isSelected ? nation.accent : "#4A5568",
          textDecoration: isDestroyed ? "line-through" : "none",
          textDecorationColor: "rgba(0,0,0,0.3)",
        }}
      >
        {nation.name}
      </p>
      {(isPending || isDestroyed) && (
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
          style={{ background: isDestroyed ? "#8B2020" : "#8888aa" }}
        />
      )}
    </button>
  )
}

// ─── Nation Detail ────────────────────────────────────────────────────────────

function NationDetail({ nation }: { nation: Nation }) {
  const [armyOpen, setArmyOpen] = useState(false)
  const isDestroyed = nation.status === "destroyed"
  const isPending = nation.status === "pending"

  return (
    <div className="reveal space-y-3">

      {/* ── Carte principale : panorama 2/3 | infos 1/3 ── */}
      <div
        className="rounded-xl border bg-white overflow-hidden"
        style={{ borderColor: `${nation.accent}44`, boxShadow: `0 4px 20px ${nation.glow}` }}
      >
        <div className="grid md:grid-cols-[2fr_1fr]">

          {/* Col gauche : Panorama plein */}
          <div className="relative overflow-hidden" style={{ minHeight: "420px" }}>
            <Image
              src={`/nations/${nation.slug}/panorama.png`}
              alt={`Panorama de ${nation.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
              style={{ filter: isDestroyed ? "grayscale(55%) brightness(0.72)" : "brightness(0.85)" }}
              priority
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 55%, rgba(255,255,255,0.08) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 40%, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(135deg, ${nation.accent}, transparent 60%)` }} />
            {isDestroyed && (
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0px,#fff 1px,transparent 1px,transparent 16px)" }} />
            )}
            {(isPending || isDestroyed) && (
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="font-cinzel text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border backdrop-blur-sm"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "white", background: isDestroyed ? "rgba(139,32,32,0.65)" : "rgba(80,80,120,0.65)" }}
                >
                  {isDestroyed ? "☠ Disparue" : "À découvrir"}
                </span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex items-end gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 shadow-xl shrink-0" style={{ borderColor: `${nation.accent}90`, background: "rgba(0,0,0,0.2)" }}>
                <Image
                  src={`/nations/${nation.slug}/blason.png`}
                  alt={`Blason de ${nation.name}`}
                  width={64} height={64}
                  className="object-cover w-full h-full"
                  style={{ filter: isDestroyed ? "grayscale(50%)" : "none" }}
                />
              </div>
              <div>
                <p className="font-cinzel text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: nation.accent }}>{nation.type}</p>
                <h2
                  className="font-cinzel font-bold text-white"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1.1, textShadow: "0 2px 12px rgba(0,0,0,0.6)", textDecoration: isDestroyed ? "line-through" : "none", textDecorationColor: "rgba(255,255,255,0.35)" }}
                >
                  {nation.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Col droite : infos */}
          <div className="flex flex-col p-7 border-t md:border-t-0 md:border-l" style={{ borderColor: `${nation.accent}20` }}>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-3.5 h-3.5 shrink-0 text-[#4A5568]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <p className="font-jost text-sm text-[#4A5568]">{nation.population}</p>
            </div>

            <p className="font-jost text-[#4A5568] text-sm leading-relaxed mb-5">{nation.description}</p>

            <div className="mb-6">
              <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#4A5568] mb-2">Caractère</p>
              <div className="flex flex-wrap gap-1.5">
                {nation.character.split(" · ").map((trait) => (
                  <span key={trait} className="font-jost text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: `${nation.accent}44`, color: nation.accent, background: `${nation.accent}10` }}>
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1" />
            <div className="h-px mb-5" style={{ background: `linear-gradient(to right, ${nation.accent}35, transparent)` }} />

            {!isDestroyed ? (
              <div className="flex flex-col gap-2 mb-4">
                <a href={nation.nationHref} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-cinzel text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all duration-200 hover:brightness-95"
                  style={{ borderColor: `${nation.accent}50`, color: nation.accent, background: `${nation.accent}0d` }}>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  Fiche de nation
                </a>
                <a href={nation.leaderHref} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-cinzel text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all duration-200 hover:bg-[#4A5568]/5"
                  style={{ borderColor: "#E5E1D8", color: "#4A5568" }}>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                  Fiche de dirigeant
                </a>
              </div>
            ) : (
              <div className="rounded-lg px-4 py-3 border-l-2 mb-4" style={{ background: `${nation.accent}08`, borderColor: nation.accent }}>
                <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: nation.accent }}>☠ Archives historiques</p>
                <p className="font-jost text-xs text-[#4A5568] leading-relaxed">Cette nation n'existe plus. Son histoire est conservée à titre d'archives pour le lore d'Izaria.</p>
              </div>
            )}

            {/* Bouton armée — ouvre la carte en dessous */}
            <button
              onClick={() => setArmyOpen(o => !o)}
              className="flex items-center justify-between w-full font-cinzel text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all duration-200"
              style={{
                borderColor: armyOpen ? `${nation.accent}60` : "#E5E1D8",
                color: armyOpen ? nation.accent : "#4A5568",
                background: armyOpen ? `${nation.accent}0d` : "transparent",
              }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                </svg>
                {isDestroyed ? "Archives militaires" : "Forces militaires"}
              </span>
              <svg
                className="w-3 h-3 shrink-0 transition-transform duration-300"
                style={{ transform: armyOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Carte armée — apparaît en dessous avec animation ── */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: armyOpen ? "800px" : "0px",
          opacity: armyOpen ? 1 : 0,
          transform: armyOpen ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div
          className="rounded-xl border bg-white overflow-hidden"
          style={{ borderColor: `${nation.accent}44`, boxShadow: `0 4px 20px ${nation.glow}` }}
        >
          {/* Header de la carte armée */}
          <div
            className="px-7 py-4 border-b flex items-center justify-between"
            style={{ borderColor: `${nation.accent}20`, background: `${nation.accent}06` }}
          >
            <div>
              <p className="font-cinzel font-bold text-[#1A1A2E] text-sm">{nation.army.name}</p>
              <p className="font-jost text-xs mt-0.5" style={{ color: nation.accent }}>{nation.army.total}</p>
            </div>
            <span
              className="font-cinzel text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{ borderColor: `${nation.accent}30`, color: nation.accent, background: `${nation.accent}10` }}
            >
              {isDestroyed ? "Archives" : "Forces militaires"}
            </span>
          </div>

          {/* Corps de la carte armée */}
          <div className="p-7">
            <p className="font-jost text-sm text-[#4A5568] leading-relaxed mb-5">
              {nation.army.description}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {nation.army.units.map((unit) => (
                <div
                  key={unit.name}
                  className="rounded-xl border p-4"
                  style={{ borderColor: `${nation.accent}20`, background: `${nation.accent}05` }}
                >
                  <p
                    className="font-cinzel font-bold text-lg mb-1 leading-none"
                    style={{ color: nation.accent }}
                  >
                    {unit.count}
                  </p>
                  <p className="font-cinzel text-[#1A1A2E] text-xs font-bold mb-1">{unit.name}</p>
                  <p className="font-jost text-[11px] text-[#4A5568] leading-snug">{unit.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NationsPage() {
  const [selected, setSelected] = useState<string>(nations[0].slug)
  const nation = nations.find((n) => n.slug === selected)!

  const activeNations   = nations.filter(n => n.status === "active")
  const pendingNations  = nations.filter(n => n.status === "pending")
  const destroyedNations = nations.filter(n => n.status === "destroyed")

  return (
    <ScrollRevealProvider>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative min-h-[45vh] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0D1B2A 0%, #1a2a3a 40%, #0D1B2A 100%)" }}
        >
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")` }}
          />
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(ellipse at 30% 60%, rgba(201,151,74,0.3) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(139,111,71,0.2) 0%, transparent 45%)` }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #EFF4FB)" }} />
          <div className="relative z-10 text-center px-4 pt-24 pb-16">
            <p className="eyebrow text-[#C9974A] mb-4">Cartographie politique</p>
            <h1 className="font-cinzel font-bold text-[#F0EDE8] mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}>
              Les Nations d&apos;Izaria
            </h1>
            <p className="font-jost text-[#F0EDE8]/60 text-lg max-w-xl mx-auto">
              Chaque nation d&apos;Izaria porte en elle une histoire, une ambition, et une armée prête à défendre — ou à conquérir.
            </p>
          </div>
        </section>

        {/* ── Selector + Detail ── */}
        <section className="bg-[#EFF4FB] px-6 py-10">
          <div className="max-w-6xl mx-auto">

            {/* Nations actives */}
            <div className="reveal mb-3">
              <p className="font-cinzel text-s tracking-[0.25em] uppercase text-[#9B6B3A] mb-3">Nations actives</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                {activeNations.map((n) => (
                  <NationTab key={n.slug} nation={n} isSelected={selected === n.slug} onClick={() => setSelected(n.slug)} />
                ))}
              </div>
            </div>

            {/* Inconnues */}
            <div className="reveal mb-3">
              <p className="font-cinzel text-s tracking-[0.25em] uppercase text-[#9B6B3A] mb-3">Régions inconnues</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                {pendingNations.map((n) => (
                  <NationTab key={n.slug} nation={n} isSelected={selected === n.slug} onClick={() => setSelected(n.slug)} />
                ))}
              </div>
            </div>

            {/* Disparues */}
            <div className="reveal mb-8">
              <p className="font-cinzel text-s tracking-[0.25em] uppercase text-[#9B6B3A] mb-3">Nations disparues</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                {destroyedNations.map((n) => (
                  <NationTab key={n.slug} nation={n} isSelected={selected === n.slug} onClick={() => setSelected(n.slug)} />
                ))}
              </div>
            </div>

            <NationDetail nation={nation} />

          </div>
        </section>

        {/* ── Note MJ ── */}
        <section className="px-6 py-16 bg-[#F8FAFD] border-t border-[#D4C5A9]/40">
          <div className="max-w-6xl mx-auto">
            <div className="reveal flex items-center gap-6 mb-10">
              <div>
                <p className="eyebrow text-[#C9974A] mb-1">Note du Maître du Jeu</p>
                <h2 className="font-cinzel font-bold text-2xl text-[#1A1A2E]">Lore & ressources</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4C5A9] to-transparent hidden md:block" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Fiches de nation", text: "Chaque fiche contient les règles spécifiques, l'histoire, la géographie et les relations diplomatiques du territoire." },
                { title: "Fiches de dirigeant", text: "Le personnage non-joueur à la tête de chaque nation : biographie, motivations, capacités et rumeurs circulant sur son compte." },
                { title: "Données militaires", text: "Les effectifs sont approximatifs et évoluent selon les événements. Les nations disparues sont conservées à titre d'archives historiques." },
              ].map(({ title, text }) => (
                <div key={title} className="reveal rounded-xl border border-[#E5E1D8] bg-white p-6">
                  <p className="font-cinzel text-[#C9974A] text-xs tracking-widest uppercase mb-3">{title}</p>
                  <p className="font-jost text-sm text-[#4A5568] leading-relaxed">{text}</p>
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
