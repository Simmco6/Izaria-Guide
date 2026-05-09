import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Histoire",
  description: "Les chroniques d'Izaria, depuis la guerre de Zu'Naat jusqu'à l'an 9527.",
}

const chapters = [
  {
    id: "prologue",
    label: "Prologue",
    year: "An 9188",
    title: "La Guerre de Zu'Naat",
    accent: "#9B6B3A",
    content: [
      {
        type: "p",
        text: "Izaria est une planète mystérieuse regorgeant de multiples espèces. Il s'y trouve différentes races comme des Humains, Elfes, hommes-chats, Faes et de nombreuses autres créatures fantastiques. Autrefois, cette terre abritait plusieurs royaumes et nations. Chacune des espèces vivait dans son propre royaume sans qu'il n'y ait eu de mélange. Une nation, une seule race.",
      },
      {
        type: "p",
        text: "Cependant, un événement en l'an 9188 bouscula tout ce qui était établi depuis des siècles. Durant la longue période d'hiver, l'Empire Koron, gouverné par l'Empereur Zu'Naat, décida de déclarer la guerre aux nations existantes. Zu'Naat était un Empereur Fae ; il éprouvait une haine profonde pour toutes autres races que la sienne. Assoiffé de pouvoir, il voulait étendre ses terres.",
      },
      {
        type: "quote",
        text: "Pour se défendre face à cet ennemi commun, les nations décidèrent de former une alliance.",
      },
      {
        type: "p",
        text: "L'Empereur, sachant qu'il devait augmenter sa puissance, partit à la recherche d'une arme légendaire. Il fit alors des alliances sous forme de clans secrets avec ceux qui avaient des savoirs sur cette arme ou son emplacement, leur promettant en échange une partie de ses territoires ainsi qu'un pouvoir égal au sien, leur donnant le titre de Grands Chefs.",
      },
      {
        type: "p",
        text: "Zu'Naat, apprenant que cette fameuse arme se trouvait dans un ancien temple en ruine, décida d'aller s'en emparer. Une fois cette arme légendaire en main, la quantité de pouvoir qu'il posséderait lui permettrait d'en finir une bonne fois pour toutes... Il était pris d'une frénésie sauvage qui le poussait à tout tuer.",
      },
      {
        type: "p",
        text: "Ayant conscience du danger que représentait cet homme pour le monde, de nombreux rois et chefs de clans s'unirent pour le vaincre. Par la suite, les alliés de l'Empereur lui-même, dupés par ce dernier, les rejoignirent dans leur combat. On appela cette coalition l'Alliance.",
      },
      {
        type: "p",
        text: "L'Empereur vaincu, l'Alliance décida de détruire l'arme car elle représentait un danger trop important. Cependant, l'Empereur savait que cette arme légendaire n'avait pas atteint sa pleine puissance, ce qui avait causé sa perte. Les chefs de clan choisirent de le détrôner puis de l'emprisonner dans un endroit inconnu de tous, par crainte qu'il puisse se venger. Le monarque fou y décéda seul et exilé quelques années plus tard.",
      },
      {
        type: "p",
        text: "Grâce à l'Alliance, les nations gagnèrent la guerre et détrônèrent l'Empereur Zu'Naat. Les royaumes acceptèrent de s'ouvrir aux autres et permirent aux espèces de cohabiter. Depuis ce jour, les nations organisent une grande fête pour célébrer la fin de la guerre et la cohabitation des races.",
      },
    ],
  },
  {
    id: "trois-siecles",
    label: "3 siècles plus tard",
    year: "An 9507",
    title: "La Guerre de 2 ans",
    accent: "#9B6B3A",
    content: [
      {
        type: "p",
        text: "Environ trois siècles se sont déroulés dans la paix et la prospérité. Alors que l'Alliance de Saltir, Asdorath et Toundra prospère, aucun d'entre eux ne se doute que sur l'île d'Hokkaido un mal les guette. Proches alliés de Zu'Naat, les Kemuri ont tout perdu il y a 319 ans à la suite de la défaite de l'Empereur.",
      },
      {
        type: "quote",
        text: "En un éclair, le clan des Kemuri prit son indépendance face à Toundra, devenant le Royaume d'Hokkaido.",
      },
      {
        type: "p",
        text: "Afin d'obtenir vengeance et de retrouver leur gloire passée, les Kemuri avaient pour objectif de détruire l'Alliance. Pour cela, ils déclenchèrent une nouvelle guerre contre la Triple Alliance avec l'aide de leurs alliés du nord : les Zetsubo. Cette guerre dura 2 ans, d'où son nom : la Guerre de 2 ans.",
      },
      {
        type: "p",
        text: "Pendant la guerre, Asdorath s'est repliée après la mort de son roi, ce qui causa la défaite de l'Alliance, l'exil du roi de Saltir et la destruction de Toundra. L'Alliance tomba en laissant derrière elle que des ruines.",
      },
      {
        type: "p",
        text: "Elle se retrouve alors divisée en plusieurs royaumes ; seule la nation d'Asdorath reste debout suite à sa retraite de la guerre. Elle est considérée de nos jours comme étant l'une des nations les plus puissantes du continent, empêchant le royaume d'Hokkaido d'achever sa vengeance envers l'ancienne Alliance.",
      },
    ],
  },
  {
    id: "aujourd-hui",
    label: "Aujourd'hui",
    year: "An 9527",
    title: "Un monde en ruines",
    accent: "#9B6B3A",
    content: [
      {
        type: "p",
        text: "Nous voilà aujourd'hui en l'an 9527, vingt ans après la Guerre de 2 ans, et le monde a changé. Les cicatrices de la guerre sont telles que les nouvelles nations peinent à se relever.",
      },
    ],
  },
]

const nations = [
  {
    name: "Asdorath",
    accent: "#FF6B6B",
    text: "Dernière nation de l'alliance encore debout, l'Empire d'Asdorath essaie de se reconstruire. La perte de l'Empereur fut une tragédie. C'est désormais l'Impératrice qui dirige, celle qu'on surnomme la Dame de Pierre d'Asdorath. Consciente de la menace qui les guette, elle cherche des alliés de toutes parts.",
  },
  {
    name: "Arcabios",
    accent: "#9e2828",
    text: "Fondé par un maître épéiste sur les anciennes terres de Toundra, le royaume d'Arcabios fut entièrement reconstruit après la guerre. Le monarque et ses sept conseillers veillent à ce que les plaines soient exemptes de bandits. L'ennemi de mon ennemi est mon ami; Asdorath trouva en Arcabios son premier allié.",
  },
  {
    name: "Alakasham",
    accent: "#FFB84A",
    text: "Née des cendres de Saltir après la Guerre de 2 ans, Alakasham fut fondée par les Zetsubo avant de tomber sous la férule des sultans Azad. Aujourd'hui, la Sultane Esraa Azad, fille illégitime d'un tyran et d'une mère vampire, règne sur cette nation commerciale du désert. Forgée par la trahison et la vengeance, elle gouverne d'une main de fer, ses origines vampiriques devenant une légende parmi son peuple.",
  },
  {
    name: "Ipulos Tacderen",
    accent: "#74716d",
    text: "Les pillards fuyards d'Arcabios ont fui vers l'ouest. Cette nation a été érigée par la Dame de Fer, ancienne proche du roi de Saltir, qui a réussi à rallier tous les pillards à sa cause et créer une nation sans loi. Une alliance entre les deux dames les plus fortes du sud serait-elle judicieuse?",
  },
  {
    name: "Hokkaido",
    accent: "#9430ad",
    text: "Grand vainqueur de la Guerre de 2 ans, Hokkaido fut officiellement dirigé par les Kemuri. Mais Nomu Kemuri fut assassiné quelques mois plus tard, et son héritier Hono 2 ans après. La nation tomba dans les ténèbres. Les Kasukana arrivèrent au pouvoir d'une nation implosée. Hokkaido n'est plus une menace, c'est un rongeur qu'Asdorath rêverait de dévorer.",
  },
  {
    name: "Dakurodo",
    accent: "#34253a",
    text: "L'Impératrice de Narset décida de mener une exploration au nord, traversant la Zone d'Ombre. Cette expédition les mena à Dakurodo, un royaume lugubre où on sacrifie les gens pour le plaisir. Sans le savoir, Asdorath se créa son problème numéro 1. Dakurodo se prépare à la guerre et soulève une armée en ce moment même.",
  },
  {
    name: "Mitsurin",
    accent: "#27AE60",
    text: "À l'ouest de Dakurodo se trouve la jungle du Mitsurin. L'expédition d'Asdorath y découvrit de multiples tribus et systèmes démocratiques révolutionnaires. Mais ce peuple est beaucoup trop arriéré techniquement pour être un allié de taille face à Dakurodo.",
  },
  {
    name: "Solarsen",
    accent: "#4AC8FF",
    text: "Ce petit royaume de l'Est, ancienne province d'Asdorath devenue indépendante, a une économie remarquable. Basée sur la pêche et le transport maritime, c'est une force commerciale importante. Solarsen possède des ports prospères et a accès aussi bien à la mer Osipis qu'aux océans oriental et austral.",
  },
  {
    name: "Tengoku",
    accent: "#9c9a9e",
    text: "Au milieu de Dakurodo existe un peuple mystérieux qui vit sur des îles flottantes. Ce havre de la magie du vent s'appelle Tengoku. Il fut bâti par une race disparue mais sa géographie lui permet de résister face aux démons de Dakurodo. Asdorath vit en Tengoku un allié certain pour repousser les troupes hors de la Tour de Clemar.",
  },
  {
    name: "Thogdur",
    accent: "#44a053",
    text: "L'ancien royaume de Saltir s'est retrouvé sans dirigeant du jour au lendemain. C'était sans compter sur un gobelin nommé Thogdur. Le roi penseur créa de presque rien une nation interdite aux humains et elfes. Entre esclavage, pillage et massacre, le nouveau roi ne chôme pas.",
  }
]

export default function Histoire() {
  return (
    <ScrollRevealProvider>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #0D1B2A 0%, #1a2a3a 40%, #0D1B2A 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse at 30% 60%, rgba(201,151,74,0.3) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(139,111,71,0.2) 0%, transparent 45%)`,
          }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EFF4FB] to-transparent" />

        <div className="relative z-10 text-center px-4 pt-24 pb-16">
          <p className="eyebrow text-[#C9974A] mb-4">Chroniques d&apos;Izaria</p>
          <h1 className="font-cinzel font-bold text-[#F0EDE8] mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}>
            Histoire du Monde
          </h1>
          <p className="font-eb-garamond italic text-[#F0EDE8]/60 text-lg max-w-xl mx-auto">
            Des origines de la guerre jusqu&apos;à l&apos;an 9527 : les chroniques qui façonnèrent Izaria.
          </p>
        </div>
      </section>

      {/* Timeline nav */}
      <div className="bg-[#EFF4FB] border-b border-[#D4C5A9] sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 flex gap-0 overflow-x-auto">
          {chapters.map((ch) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="font-jost text-sm font-medium px-5 py-4 text-[#4A5568] hover:text-[#C9974A] border-b-2 border-transparent hover:border-[#C9974A] transition-all duration-150 whitespace-nowrap"
            >
              {ch.label}
            </a>
          ))}
        </div>
      </div>

      {/* Frise chronologique */}
      <div className="bg-[#EFF4FB] py-12 px-4 border-b border-[#D4C5A9]/50">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden bg-[#F8FAFD] border border-[#D4C5A9]" style={{ minHeight: "200px" }}>
            {/* Remplace le src par ton image */}
            <a
              href="https://drive.google.com/file/d/1xdPdRSHsnqJg_saL2sBNxT_8OqDIf_t1/view"
              rel="noopener noreferrer"
            >
            <img
              src="/frise-chronologique.jpg"
              alt="Frise chronologique d'Izaria"
              className="w-full h-auto object-contain"
            />
            </a>
            {/* Placeholder si pas encore d'image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#F8FAFD]" style={{ display: "none" }}>
              <p className="eyebrow text-[#C9974A] mb-2">Frise chronologique</p>
              <p className="font-eb-garamond italic text-[#4A5568]">An 9188 — An 9527</p>
            </div>
          </div>
          <p className="font-jost text-xs text-[#4A5568]/60 text-center mt-3">
            Un agrandissement de la frise est disponible en cliquant dessus.
          </p>
        </div>
      </div>

      <main className="bg-[#EFF4FB]">
        {/* Chapters */}
        {chapters.map((chapter, ci) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className={`py-24 px-4 relative ${ci % 2 === 1 ? "bg-[#F8FAFD]" : "bg-[#EFF4FB]"}`}
          >
            {/* Wave top for alternating sections */}
            {ci > 0 && (
              <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
                <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 block">
                  <path
                    d={ci % 2 === 1 ? "M0,20 C480,40 960,0 1440,20 L1440,0 L0,0 Z" : "M0,10 C360,40 1080,0 1440,20 L1440,0 L0,0 Z"}
                    fill={ci % 2 === 1 ? "#EFF4FB" : "#F8FAFD"}
                  />
                </svg>
              </div>
            )}

            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
                {/* Left — chapter header */}
                <div className="reveal lg:sticky lg:top-36">
                  {/* Chapter number */}
                  <div className="font-cinzel font-bold text-[8rem] leading-none select-none" style={{ color: `${chapter.accent}10` }}>
                    {String(ci + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-[-3rem]">
                    <p className="eyebrow mb-2" style={{ color: chapter.accent }}>
                      {chapter.label}
                    </p>
                    <h2 className="font-cinzel font-bold text-[#1A1A2E] mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.2 }}>
                      {chapter.title}
                    </h2>
                    {/* Year badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-jost"
                      style={{ borderColor: `${chapter.accent}40`, color: chapter.accent, background: `${chapter.accent}10` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: chapter.accent }} />
                      {chapter.year}
                    </div>
                  </div>
                  {/* Decorative vertical line */}
                  <div className="hidden lg:block mt-8 ml-1 w-px h-24 bg-gradient-to-b from-[#D4C5A9] to-transparent" />
                </div>

                {/* Right — content */}
                <div className="reveal reveal-delay-1 space-y-6">
                  {chapter.content.map((block, bi) =>
                    block.type === "quote" ? (
                      <blockquote
                        key={bi}
                        className="pl-5 border-l-[3px] py-1"
                        style={{ borderColor: chapter.accent }}
                      >
                        <p className="font-eb-garamond italic text-xl leading-relaxed" style={{ color: chapter.accent }}>
                          « {block.text} »
                        </p>
                      </blockquote>
                    ) : (
                      <p key={bi} className="font-jost text-[#4A5568] leading-relaxed text-base">
                        {block.text}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Nations section — inside "Aujourd'hui" */}
        <section className="bg-[#EFF4FB] pb-24 px-4">
          <div className="max-w-5xl mx-auto">

            <div className="grid md:grid-cols-2 gap-4">
              {nations.map((nation, i) => (
                <div
                  key={nation.name}
                  className={`reveal reveal-delay-${Math.min((i % 4) + 1, 6)} group relative bg-white rounded-lg p-6 border border-[#D4C5A9]/50 hover:border-[#C9974A]/30 hover:shadow-md transition-all duration-200`}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
                    style={{ background: nation.accent }}
                  />
                  <div className="pl-4">
                    <h3
                      className="font-cinzel font-bold text-base mb-2 group-hover:transition-colors"
                      style={{ color: nation.accent }}
                    >
                      {nation.name}
                    </h3>
                    <p className="font-jost text-sm text-[#4A5568] leading-relaxed">
                      {nation.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal mt-16 text-center">
              <a
                href="/nations"
                className="font-jost font-medium px-8 py-3.5 rounded bg-[#1A1A2E] text-[#F0EDE8] hover:bg-[#0D1B2A] transition-colors inline-block mr-4"
              >
                Explorer les nations
              </a>
              <a
                href="/creation-dune-fiche"
                className="font-jost font-medium px-8 py-3.5 rounded border border-[#C9974A] text-[#C9974A] hover:bg-[#C9974A] hover:text-white transition-all duration-200 inline-block"
              >
                Créer sa fiche
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </ScrollRevealProvider>
  )
}
