"use client"

import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"

// ─── Types ────────────────────────────────────────────────────────────────────

type TutorialSection = {
  id: string
  emoji: string
  title: string
  subtitle: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tutorialSections: TutorialSection[] = [
  {
    id: "rp",
    emoji: "🎭",
    title: "Comment bien RP ?",
    subtitle: "Les fondamentaux de la narration collaborative",
  },
  {
    id: "personnages",
    emoji: "✒️",
    title: "Créer des personnages originaux",
    subtitle: "De l'étincelle à l'incarnation",
  },
  {
    id: "fiches",
    emoji: "📄",
    title: "Belles fiches sur Google Docs",
    subtitle: "Mise en forme, typographie et export",
  },
]

// ─── Step ─────────────────────────────────────────────────────────────────────

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 mb-8">
      <div
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-cinzel font-bold text-sm mt-0.5"
        style={{ background: "rgba(201,151,74,0.12)", border: "1.5px solid rgba(201,151,74,0.35)", color: "#C9974A" }}
      >
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-cinzel font-bold text-[#1A1A2E] text-base mb-2 leading-snug">{title}</h4>
        <div className="font-jost text-sm text-[#4A5568] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

// ─── Tip ──────────────────────────────────────────────────────────────────────

function Tip({ label = "💡 Conseil", children }: { label?: string; children: React.ReactNode }) {
  return (
    <div
      className="my-6 px-5 py-4 rounded-r-xl"
      style={{ borderLeft: "3px solid #C9974A", background: "rgba(201,151,74,0.07)" }}
    >
      <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[#C9974A] font-bold mb-1.5">{label}</p>
      <div className="font-jost text-sm text-[#4A5568] leading-relaxed">{children}</div>
    </div>
  )
}

// ─── Compare ──────────────────────────────────────────────────────────────────

function Compare({ bad, good }: { bad: string; good: string }) {
  return (
    <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-xl border border-[#E5E1D8] bg-[#FAFAF8] p-4">
        <p className="font-cinzel text-[10px] tracking-widest uppercase text-[#4A5568]/40 mb-2">❌ Faible</p>
        <p className="font-jost text-sm text-[#4A5568] italic leading-relaxed">{bad}</p>
      </div>
      <div
        className="rounded-xl border p-4"
        style={{ borderColor: "rgba(201,151,74,0.4)", background: "rgba(201,151,74,0.06)" }}
      >
        <p className="font-cinzel text-[10px] tracking-widest uppercase mb-2" style={{ color: "#C9974A" }}>✓ Fort</p>
        <p className="font-jost text-sm text-[#4A5568] italic leading-relaxed">{good}</p>
      </div>
    </div>
  )
}

// ─── Pillar ───────────────────────────────────────────────────────────────────

function Pillar({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
      <p className="font-cinzel text-[#C9974A] text-xs font-bold tracking-wide mb-1.5">{label}</p>
      <p className="font-jost text-sm text-[#4A5568] leading-relaxed">{desc}</p>
    </div>
  )
}

// ─── Tag ──────────────────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-jost text-xs px-3 py-1 rounded-full border inline-block"
      style={{ borderColor: "rgba(201,151,74,0.4)", color: "#C9974A", background: "rgba(201,151,74,0.08)" }}
    >
      {children}
    </span>
  )
}

// ─── ELink ────────────────────────────────────────────────────────────────────

function ELink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C9974A] hover:underline">
      {children}
    </a>
  )
}

// ─── BulletList ───────────────────────────────────────────────────────────────

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-2 space-y-1.5 list-none pl-0">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 items-start">
          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9974A]/50" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6 mt-10 first:mt-0">
      <p className="font-cinzel font-bold text-[#1A1A2E] text-base whitespace-nowrap">{children}</p>
      <div className="flex-1 h-px bg-gradient-to-r from-[#D4C5A9] to-transparent" />
    </div>
  )
}

// ─── QuoteBlock ───────────────────────────────────────────────────────────────

function QuoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-3 rounded-xl p-4 border font-jost text-sm italic text-[#4A5568] leading-relaxed"
      style={{ background: "rgba(201,151,74,0.06)", borderColor: "rgba(201,151,74,0.3)" }}
    >
      {children}
    </div>
  )
}

// ─── InfoGrid ─────────────────────────────────────────────────────────────────

function InfoGrid({ items }: { items: { label: string; desc: string }[] }) {
  return (
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map(({ label, desc }) => (
        <div key={label} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
          <p className="font-cinzel text-[#C9974A] text-xs font-bold tracking-wide mb-1">{label}</p>
          <p className="font-jost text-sm text-[#4A5568]">{desc}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Section: Comment bien RP ─────────────────────────────────────────────────

function SectionRP() {
  return (
    <div>
      <p className="font-jost text-[#4A5568] text-base leading-relaxed mb-8">
        Le roleplay, c'est l'art de jouer un personnage dans un récit partagé. Que ce soit en écrit, en vocal ou en
        jeu de table, les mêmes fondamentaux s'appliquent.
      </p>

      <SectionHeader>Partie 1 — Les bases absolues</SectionHeader>

      <Step number={1} title="Comprendre ce qu'est le RP">
        Le RP consiste à incarner un personnage fictif dans une histoire co-construite. Ce n'est ni du théâtre
        improvisé, ni un jeu vidéo : c'est une{" "}
        <strong className="text-[#1A1A2E] font-semibold">narration collaborative</strong>. Ton rôle principal :
        contribuer à une histoire intéressante pour tous, pas seulement pour toi.
        <br /><br />
        Les deux piliers du bon RP : <em className="text-[#1A1A2E]">cohérence</em> (ton personnage agit logiquement
        selon qui il est) et <em className="text-[#1A1A2E]">réactivité</em> (tu réponds à ce que les autres font,
        pas seulement à ce que tu veux raconter).
      </Step>

      <Step number={2} title="Distinguer IC et OOC">
        <strong className="text-[#1A1A2E] font-semibold">IC (In Character)</strong> = ce que vit ton personnage.{" "}
        <strong className="text-[#1A1A2E] font-semibold">OOC (Out Of Character)</strong> = ce que toi, le joueur,
        tu communiques hors du jeu.
        <br /><br />
        Toujours marquer clairement le passage OOC avec des parenthèses{" "}
        <code className="bg-[#F0ECE8] text-[#4A5568] px-1.5 py-0.5 rounded text-xs font-mono">(( ))</code> ou un
        préfixe comme{" "}
        <code className="bg-[#F0ECE8] text-[#4A5568] px-1.5 py-0.5 rounded text-xs font-mono">// OOC :</code>.
        Mélanger les deux est l'une des erreurs les plus fréquentes chez les débutants.
      </Step>

      <Step number={3} title="Écrire en RP écrit : la structure de base">
        La plupart des serveurs utilisent la{" "}
        <strong className="text-[#1A1A2E] font-semibold">description à la 3ème personne</strong> :
        <QuoteBlock>
          Éléonore referme lentement le livre posé sur ses genoux. Son regard glisse vers la fenêtre — la pluie
          commence à tomber, fine et froide. Elle soupire, presque imperceptiblement, puis murmure : « Encore ce
          soir, alors. »
        </QuoteBlock>
        Structure :{" "}
        <strong className="text-[#1A1A2E] font-semibold">Action physique → Détail sensoriel → Parole ou pensée</strong>.
        Ce triptyque rend chaque post vivant et jouable.
      </Step>

      <Step number={4} title="Gérer son tour de jeu">
        Le RP, c'est un ping-pong narratif. Quelques règles d'or :
        <BulletList
          items={[
            <>Ne jamais jouer les actions des personnages des autres (<strong className="text-[#1A1A2E] font-semibold">godmod</strong>). Tu décris ce que fait <em>ton</em> personnage, pas ce qu'il réussit à faire à l'autre.</>,
            <>Éviter le <strong className="text-[#1A1A2E] font-semibold">powergaming</strong> : ton personnage n'est pas invincible, ne sait pas tout, ne réussit pas tout.</>,
            <>Donner de la matière à jouer. Chaque post doit offrir au moins une "entrée" — une question, une émotion visible, une action incomplète — sur laquelle les autres peuvent rebondir.</>,
          ]}
        />
      </Step>

      <Tip>
        Si tu ne sais pas quoi écrire, décris l'état intérieur de ton personnage. Une hésitation, un malaise, une
        pensée fugace. C'est souvent plus intéressant qu'une action spectaculaire.
      </Tip>

      <SectionHeader>Partie 2 — Progresser et gagner en profondeur</SectionHeader>

      <Step number={5} title="Jouer les émotions sans les nommer">
        Plutôt que d'écrire <em className="text-[#4A5568]/60">« Il était triste »</em>, montrer la tristesse :
        <Compare
          bad="Kaï se sentait seul ce soir-là."
          good="Kaï porte son verre vide sans le reposer. Ses yeux fixent la table. Quand quelqu'un lui parle, il met une seconde de trop à lever la tête."
        />
        C'est la règle <strong className="text-[#1A1A2E] font-semibold">Show, don't tell</strong>. Elle s'applique à chaque post.
      </Step>

      <Step number={6} title="Gérer les conflits et les désaccords">
        Les conflits IC créent du drama — c'est sain. Les conflits OOC se règlent hors du jeu, calmement.
        <BulletList
          items={[
            <><strong className="text-[#1A1A2E] font-semibold">Safeword ou retrait</strong> : toujours possible de se retirer d'une scène sans justification. Le bien-être du joueur prime sur la cohérence narrative.</>,
            <><strong className="text-[#1A1A2E] font-semibold">Ne pas prendre IC pour OOC</strong> : si un personnage insulte le tien, c'est de la fiction. Si le joueur t'insulte toi, c'est un problème réel à adresser.</>,
          ]}
        />
      </Step>

      <Step number={7} title="Faire évoluer son personnage">
        Un personnage qui ne change pas est un personnage mort. À chaque grande scène, deux questions :
        <BulletList
          items={[
            "Qu'est-ce que mon personnage a appris ou perdu dans cette scène ?",
            "Qu'est-ce qui a changé dans sa façon de voir le monde ou les autres ?",
          ]}
        />
        Même une légère évolution — une méfiance qui grandit, une conviction qui vacille — rend un personnage vivant sur la durée.
      </Step>

      <Step number={8} title="Maîtriser le rythme narratif">
        Tout bon récit alterne tensions et respirations :
        <InfoGrid
          items={[
            { label: "Scènes d'action", desc: "Posts courts, percutants, rythme rapide." },
            { label: "Scènes intimes", desc: "Posts longs, riches en détails sensoriels, silence et nuance." },
            { label: "Transitions", desc: "Une phrase, une ellipse, un « plus tard ce soir-là… »." },
            { label: "Ellipses OOC", desc: "N'hésite pas à sauter dans le temps en accord avec les autres joueurs." },
          ]}
        />
      </Step>

      <Tip label="📚 Pour aller plus loin">
        Lis des extraits de romans à la 3ème personne du présent. Ursula K. Le Guin et Andrzej Sapkowski sont des
        références pour écrire de l'action et des émotions sans sur-expliquer.
      </Tip>
    </div>
  )
}

// ─── Section: Personnages ─────────────────────────────────────────────────────

function SectionPersonnages() {
  return (
    <div>
      <p className="font-jost text-[#4A5568] text-base leading-relaxed mb-8">
        Un personnage original n'est pas un personnage étrange ou surchargé. C'est un personnage{" "}
        <em className="text-[#1A1A2E]">cohérent</em> : chaque trait découle d'une histoire, chaque choix d'un désir
        profond. La complexité émerge d'une cohérence interne bien posée.
      </p>

      <SectionHeader>Partie 1 — L'identité et les fondations</SectionHeader>

      <Step number={1} title="Choisir la race et la culture : séparer les deux">
        La race définit la biologie et les aptitudes. La culture définit les valeurs, les rituels, les rapports
        sociaux. Les deux sont <strong className="text-[#1A1A2E] font-semibold">indépendants</strong>.
        <br /><br />
        Exercice : prends une race classique. Associe-lui une culture qui ne lui est <em>jamais</em> associée dans
        les œuvres que tu connais. Note 3 valeurs fondamentales, 2 tabous sociaux, 1 relation particulière à la mort
        ou aux ancêtres. Un elfe élevé dans une culture nomade de steppe n'a rien à voir avec l'elfe forestier
        classique — même oreilles, autre âme.
        <br /><br />
        <strong className="text-[#1A1A2E] font-semibold">Outils :</strong>{" "}
        <ELink href="https://www.fantasynamegenerators.com">fantasynamegenerators.com</ELink> (noms, cultures, religions fictives) ·{" "}
        <ELink href="https://www.behindthename.com">behindthename.com</ELink> (étymologie des prénoms réels du monde entier).
      </Step>

      <Step number={2} title="Construire la psychologie en 3 piliers">
        Oublie la liste de traits. Un personnage réel repose sur trois fondations :
        <div className="mt-4 space-y-3">
          <Pillar
            label="La peur centrale"
            desc="Pas la peur de l'araignée — la peur existentielle. L'abandon. La perte de contrôle. L'inutilité. Cette peur oriente chaque décision, souvent sans que le personnage en soit conscient."
          />
          <Pillar
            label="Le désir profond"
            desc="Ce qu'il veut vraiment, souvent différent de ses objectifs déclarés. Un guerrier peut désirer mourir au combat non par désespoir, mais parce que c'est la seule façon d'être pleinement présent."
          />
          <Pillar
            label="La contradiction interne"
            desc="L'endroit où ses valeurs s'affrontent. C'est cette friction qui rend un personnage vivant. Sans elle, il n'a nulle part où aller narrativement."
          />
        </div>
        <p className="mt-4 font-jost text-sm text-[#4A5568]">
          <strong className="text-[#1A1A2E] font-semibold">Outils :</strong>{" "}
          <ELink href="https://www.16personalities.com">16personalities.com</ELink> (MBTI gratuit, comportement sous stress) ·{" "}
          <ELink href="https://www.truity.com">truity.com</ELink> (Ennéagramme — motivations inconscientes).
        </p>
      </Step>

      <Step number={3} title="Trouver le nom qui sonne juste">
        <BulletList
          items={[
            "Cherche l'étymologie d'un prénom réel sur behindthename.com, puis déforme-le légèrement.",
            "Combine deux racines de langues différentes pour créer quelque chose d'unique mais naturel.",
            "Utilise fantasynamegenerators.com avec le filtre de la race ou de la culture choisie.",
          ]}
        />
        <p className="mt-2">
          Le nom doit être <strong className="text-[#1A1A2E] font-semibold">prononçable</strong> par les autres
          joueurs et <strong className="text-[#1A1A2E] font-semibold">mémorable</strong> sans être bizarre.
        </p>
      </Step>

      <SectionHeader>Partie 2 — Compétences, arme et magie</SectionHeader>

      <Step number={4} title="L'arme comme extension biographique">
        L'arme n'est pas un choix d'optimisation. C'est un choix narratif. Pose-toi toujours :{" "}
        <strong className="text-[#1A1A2E] font-semibold">pourquoi cette arme pour cette vie-là ?</strong>
        <div
          className="my-4 rounded-xl border p-4 font-jost text-sm text-[#4A5568] leading-relaxed space-y-1.5"
          style={{ background: "rgba(201,151,74,0.06)", borderColor: "rgba(201,151,74,0.25)" }}
        >
          <p>Un couteau de cuisine transformé en arme → n'a jamais eu les moyens d'une vraie lame</p>
          <p>Une rapière entre les mains d'une noble → besoin de distance, d'élégance, de contrôle</p>
          <p>Un soldat qui porte un bâton de marche → refuse de tuer à nouveau, mais ne peut pas ne pas se défendre</p>
        </div>
        De même, le <strong className="text-[#1A1A2E] font-semibold">style de combat</strong> reflète la psychologie :
        l'impulsif charge tête baissée, le calculateur attend, celui qui a peur de blesser hésite toujours au moment décisif.
      </Step>

      <Step number={5} title="La magie qui coûte quelque chose">
        Un pouvoir sans contrepartie est une béquille narrative. Le coût est ce qui rend la magie intéressante :
        <InfoGrid
          items={[
            { label: "Physique", desc: "La magie use le corps, épuise, défigure, vieillit." },
            { label: "Émotionnel", desc: "Utiliser ce pouvoir force à revivre ce qu'il voudrait oublier." },
            { label: "Moral", desc: "Chaque sort est une petite trahison d'une valeur proclamée." },
            { label: "Social", desc: "La magie marque, attire l'attention, crée des ennemis." },
          ]}
        />
        <p className="mt-3">
          La magie doit être une <strong className="text-[#1A1A2E] font-semibold">extension de qui il est</strong>,
          pas une fonctionnalité. Une magie de soin qui laisse une cicatrice sur son propre corps dit quelque chose
          sur son rapport au sacrifice.
        </p>
      </Step>

      <SectionHeader>Partie 3 — L'histoire et la backstory</SectionHeader>

      <Step number={6} title="Trouver la fracture fondatrice">
        Tout personnage mémorable a un moment fondateur — un événement qui a réorienté sa trajectoire.
        <br /><br />
        La bonne question n'est pas <em className="text-[#4A5568]/60">« que s'est-il passé ? »</em> mais :{" "}
        <strong className="text-[#1A1A2E] font-semibold">« qu'a-t-il décidé de croire à partir de là ? »</strong>
        <br /><br />
        C'est cette croyance — souvent erronée, toujours compréhensible — qui produit le comportement observable.
        Un enfant abandonné qui décide que l'amour se mérite passera sa vie à se surpasser pour mériter ce qu'il
        n'obtiendra jamais de façon inconditionnelle.
      </Step>

      <Step number={7} title="Construire la backstory en trois couches">
        <div className="mt-3 space-y-3">
          {[
            { n: "1", label: "Ce que tout le monde sait", desc: "L'origine, la profession, la réputation, les anecdotes qu'il raconte volontiers." },
            { n: "2", label: "Ce que savent les proches", desc: "Les raisons du départ, les relations importantes, la perte qui a tout changé." },
            { n: "3", label: "Ce qu'il refuse de regarder en face", desc: "L'erreur, la honte, la peur qu'il ne formulerait jamais à voix haute, même seul. C'est là que vit le vrai personnage." },
          ].map(({ n, label, desc }) => (
            <div key={n} className="flex gap-4 items-start">
              <div
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-cinzel font-bold text-xs mt-0.5"
                style={{ background: "rgba(201,151,74,0.12)", border: "1px solid rgba(201,151,74,0.3)", color: "#C9974A" }}
              >
                {n}
              </div>
              <div>
                <p className="font-cinzel text-[#1A1A2E] text-sm font-bold mb-0.5">{label}</p>
                <p className="font-jost text-sm text-[#4A5568] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 font-jost text-sm text-[#4A5568]">
          <strong className="text-[#1A1A2E] font-semibold">Outils :</strong>{" "}
          <ELink href="https://www.seventhsanctum.com">seventhsanctum.com</ELink> (générateur d'histoires de personnage) ·{" "}
          <ELink href="https://wheelofnames.com">wheelofnames.com</ELink> (roue personnalisée avec tes propres listes).
        </p>
      </Step>

      <Step number={8} title="Vérifier la cohérence globale">
        Teste ton personnage avec ces questions :
        <BulletList
          items={[
            "Si son pire ennemi le décrivait en trois phrases, que dirait-il ?",
            "Quelle décision ce personnage ne pourrait-il jamais prendre, même sous la contrainte ?",
            "Dans 6 mois de jeu intensif, où est-il ? A-t-il encore des endroits où aller narrativement ?",
          ]}
        />
        <p className="mt-2">
          Un personnage sans défaut véritable n'est pas jouable sur la durée. La faille doit{" "}
          <strong className="text-[#1A1A2E] font-semibold">coûter quelque chose</strong> à un moment ou un autre.
        </p>
      </Step>

      <Tip label="🎲 Exemples concrets">
        <strong className="text-[#1A1A2E] font-semibold">Séraphine (médiéval-fantastique)</strong> — faussaire dont la
        peur centrale est de croire en quelqu'un qui ne le mérite pas. Sa magie involontaire laisse des taches d'encre
        permanentes sur sa peau.
        <br /><br />
        <strong className="text-[#1A1A2E] font-semibold">Reza (cyberpunk)</strong> — netrunner qui traite les gens
        comme des données, dont l'interface neuronale efface lentement la frontière entre mémoire et réseau.
        <br /><br />
        <strong className="text-[#1A1A2E] font-semibold">Marta (post-apo)</strong> — cartographe sans aucun pouvoir,
        dont la compulsion de compter ses onze paires de gants chaque matin est le seul aveu silencieux de sa fragilité.
      </Tip>
    </div>
  )
}

// ─── Section: Fiches ──────────────────────────────────────────────────────────

function SectionFiches() {
  return (
    <div>
      <p className="font-jost text-[#4A5568] text-base leading-relaxed mb-8">
        Une belle fiche de personnage sur Google Docs, c'est à la fois un outil de jeu et une pièce de présentation.
        Elle doit être lisible rapidement pendant une session ET agréable à consulter en dehors.
      </p>

      <SectionHeader>Partie 1 — Mise en place et structure</SectionHeader>

      <Step number={1} title="Configurer le document correctement">
        Avant tout contenu, configure la page :
        <BulletList
          items={[
            <><strong className="text-[#1A1A2E] font-semibold">Fichier → Mise en page</strong> : Portrait, marges réduites (1,5 cm côtés, 2 cm haut/bas), couleur de page <code className="bg-[#F0ECE8] text-[#4A5568] px-1.5 py-0.5 rounded text-xs font-mono">#1a1a2e</code> (sombre) ou <code className="bg-[#F0ECE8] text-[#4A5568] px-1.5 py-0.5 rounded text-xs font-mono">#faf7f2</code> (parchemin).</>,
            <><strong className="text-[#1A1A2E] font-semibold">Format → Styles de paragraphe</strong> : définis tes titres une bonne fois pour toutes. La cohérence vient des styles, pas de la mise en forme manuelle.</>,
            <>Désactive la correction automatique (<strong className="text-[#1A1A2E] font-semibold">Outils → Préférences</strong>) pour éviter les guillemets intelligents mal placés dans les noms propres.</>,
          ]}
        />
      </Step>

      <Step number={2} title="Choisir une typographie cohérente">
        Règle d'or : <strong className="text-[#1A1A2E] font-semibold">maximum 2 polices</strong> dans tout le document.
        <div className="mt-3 space-y-3">
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <p className="font-cinzel text-[#C9974A] text-xs font-bold tracking-wide mb-2">Police de titre / ambiance</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Cinzel", "IM Fell English", "Uncial Antiqua", "Cormorant Garamond"].map((f) => <Tag key={f}>{f}</Tag>)}
            </div>
            <p className="font-jost text-xs text-[#4A5568]/60">Pour les noms, titres de section, citations importantes.</p>
          </div>
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <p className="font-cinzel text-[#C9974A] text-xs font-bold tracking-wide mb-2">Police de corps</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Lato", "Libre Baskerville", "Source Serif 4", "Nunito"].map((f) => <Tag key={f}>{f}</Tag>)}
            </div>
            <p className="font-jost text-xs text-[#4A5568]/60">Pour toutes les descriptions, stats, textes courants.</p>
          </div>
        </div>
        <p className="mt-3 text-sm">
          Pour installer : <strong className="text-[#1A1A2E] font-semibold">menu polices → Plus de polices</strong>, cherche le nom, ajoute.
        </p>
      </Step>

      <Step number={3} title="Structurer la fiche en blocs clairs">
        Une bonne fiche se lit en moins de 30 secondes en diagonal :
        <div className="mt-3 space-y-2">
          {[
            { n: 1, label: "En-tête", desc: "Nom du personnage, race/classe, âge, devise ou citation courte." },
            { n: 2, label: "Identité", desc: "Apparence physique (3–5 lignes max), signes distinctifs." },
            { n: 3, label: "Caractère", desc: "3 traits dominants, peur centrale, désir profond." },
            { n: 4, label: "Pouvoir", desc: "Style de combat, capacités spéciales avec leurs coûts." },
            { n: 5, label: "Histoire", desc: "La fracture fondatrice (5–8 lignes), ce que tout le monde sait, ce que peu savent." },
            { n: 6, label: "Arme et équipement", desc: "Liste des armes et objets équipementaires du personnage." },
            { n: 7, label: "Traits notables", desc: "Personnages avec leur lien, handicaps, richesse familiale, en gros les funs facts." },
          ].map(({ n, label, desc }) => (
            <div key={n} className="flex gap-3 items-start">
              <div
                className="shrink-0 w-6 h-6 rounded flex items-center justify-center font-cinzel font-bold text-xs"
                style={{ background: "rgba(201,151,74,0.12)", color: "#C9974A" }}
              >
                {n}
              </div>
              <div className="flex-1 flex gap-2 flex-wrap items-baseline">
                <span className="font-cinzel text-[#1A1A2E] text-xs font-bold">{label}</span>
                <span className="font-jost text-sm text-[#4A5568]">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Step>

      <SectionHeader>Partie 2 — Mise en forme avancée</SectionHeader>

      <Step number={4} title="Utiliser les tableaux pour les stats">
        <strong className="text-[#1A1A2E] font-semibold">Insertion → Tableau → 3×2 ou 4×2.</strong> Puis :
        <BulletList
          items={[
            <>Sélectionne toutes les cellules → <strong className="text-[#1A1A2E] font-semibold">Format → Tableau → Propriétés</strong> → supprime les bordures ou mets-les en couleur d'accent.</>,
            <>Applique une couleur de fond subtile à la ligne de titre via <strong className="text-[#1A1A2E] font-semibold">fond de cellule</strong>.</>,
            <>Aligne le texte au centre dans les cellules de stats, à gauche dans les cellules de description.</>,
          ]}
        />
      </Step>

      <Step number={5} title="Ajouter un visuel de personnage proprement">
        <BulletList
          items={[
            <><strong className="text-[#1A1A2E] font-semibold">Insertion → Image.</strong> Clic → <strong className="text-[#1A1A2E] font-semibold">Habillage du texte → Encadré</strong> pour la positionner librement.</>,
            <>Pour un rendu soigné, utilise une image à fond transparent (PNG) ou une illustration en tons accordés à ta palette.</>,
            <>Redimensionne en tenant le <strong className="text-[#1A1A2E] font-semibold">coin</strong> (pas le bord) pour garder les proportions.</>,
            <>Clic droit → <strong className="text-[#1A1A2E] font-semibold">Options d'image → Bordure</strong> pour ajouter un effet cadre.</>,
          ]}
        />
      </Step>

      <Step number={6} title="Créer des séparateurs décoratifs">
        Évite les lignes horizontales basiques. Alternatives élégantes :
        <BulletList
          items={[
            <><strong className="text-[#1A1A2E] font-semibold">Caractères spéciaux</strong> comme <span className="text-[#C9974A] font-mono">── ✦ ──</span> ou <span className="text-[#C9974A] font-mono">❧</span> centrés, dans la police de titre, en couleur d'accent.</>,
            <>Un tableau d'une cellule, hauteur minimale (2–3 mm), fond de couleur d'accent, sans bordure → ligne colorée pleine largeur.</>,
            <><strong className="text-[#1A1A2E] font-semibold">Insertion → Dessin → Nouveau</strong> : trace une ligne stylisée ou un ornement simple.</>,
          ]}
        />
      </Step>

      <Step number={7} title="Gérer les couleurs avec cohérence">
        Définis <strong className="text-[#1A1A2E] font-semibold">3 couleurs seulement</strong> et tiens-t'y :
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Fond principal", example: "bleu foncé ou blanc cassé" },
            { label: "Accent (titres, ornements)", example: "Violet, cuivre, teal…" },
            { label: "Texte courant", example: "beige ou gris" },
          ].map(({ label, example }) => (
            <div key={label} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
              <p className="font-cinzel text-[#C9974A] text-xs font-bold tracking-wide mb-1">{label}</p>
              <p className="font-jost text-xs text-[#4A5568]/60">{example}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm">
          Pour retrouver une couleur personnalisée dans Docs : sélecteur de couleur →{" "}
          <strong className="text-[#1A1A2E] font-semibold">Personnalisée</strong> → colle le code hex.
        </p>
      </Step>

      <Step number={8} title="Partager proprement">
        <BulletList
          items={[
            <><strong className="text-[#1A1A2E] font-semibold">Partage en lecture seule</strong> : Partager → Changer → Lecteur. Personne ne modifie par accident.</>,
          ]}
        />
      </Step>

      <Tip label="🎨 Inspiration visuels">
        Palettes de couleurs cohérentes : <ELink href="https://coolors.co">coolors.co</ELink>. Polices en aperçu :{" "}
        <ELink href="https://fonts.google.com">fonts.google.com</ELink>. Illustrations RP libres de droits :{" "}
        <ELink href="https://www.artbreeder.com">artbreeder.com</ELink> et{" "}
        <ELink href="https://www.deviantart.com">deviantart.com</ELink> (avec permission de l'auteur).
      </Tip>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommentRPPage() {
  const [active, setActive] = useState<string>("rp")
  const current = tutorialSections.find((s) => s.id === active)!

  return (
    <ScrollRevealProvider>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden"
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
            <p className="eyebrow text-[#C9974A] mb-4">Guides du joueur</p>
            <h1
              className="font-cinzel font-bold text-[#F0EDE8] mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1 }}
            >
              L'Atelier du Rôliste
            </h1>
            <p className="font-jost text-[#F0EDE8]/60 text-lg max-w-xl mx-auto">
              Trois guides complets pour maîtriser l'écriture roleplay, créer des personnages mémorables
              et composer de belles fiches.
            </p>
          </div>
        </section>

        {/* ── Tabs + Content ── */}
        <section className="bg-[#EFF4FB] px-6 py-10">
          <div className="max-w-4xl mx-auto">

            {/* Tab navigation */}
            <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {tutorialSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className="text-left p-4 rounded-xl border bg-white transition-all duration-200"
                  style={{
                    borderColor: active === s.id ? "#C9974A" : "#E5E1D8",
                    boxShadow: active === s.id ? "0 2px 12px rgba(201,151,74,0.15)" : "none",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{s.emoji}</span>
                    <p
                      className="font-cinzel text-sm font-bold leading-snug"
                      style={{ color: active === s.id ? "#C9974A" : "#1A1A2E" }}
                    >
                      {s.title}
                    </p>
                  </div>
                  <p className="font-jost text-xs text-[#4A5568]/60 leading-snug pl-7">{s.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Content card */}
            <div
              className="reveal rounded-xl border border-[#E5E1D8] bg-white overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(201,151,74,0.08)" }}
            >
              {/* Card header */}
              <div
                className="px-8 py-5 border-b border-[#E5E1D8]"
                style={{ background: "rgba(201,151,74,0.04)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{current.emoji}</span>
                  <div>
                    <h2 className="font-cinzel font-bold text-[#1A1A2E] text-xl leading-snug">{current.title}</h2>
                    <p className="font-jost text-sm text-[#4A5568]/60 mt-0.5">{current.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="px-8 py-8">
                {active === "rp" && <SectionRP />}
                {active === "personnages" && <SectionPersonnages />}
                {active === "fiches" && <SectionFiches />}
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </ScrollRevealProvider>
  )
}
