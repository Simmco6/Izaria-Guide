const nations = [
  {
    name: "Alakasham",
    type: "Sultanat",
    population: "55 000 habitants",
    description: "Désert, commerce équestre et mercenaires. La sultane a purgé le patriarcat. Le pouvoir et l'argent dictent la loi.",
    character: "Commercial · Matriarcal · Aride",
    gradient: "linear-gradient(135deg, #2e1f0a 0%, #5c3d14 50%, #2e1f0a 100%)",
    accent: "#FFB84A",
    href: "https://sites.google.com/view/alakasham/",
  },
  {
    name: "Asdorath",
    type: "Empire",
    population: "100 000 habitants",
    description: "La dernière grande nation de l'Alliance. L'Impératrice de Narset tient le monde entre ses mains de pierre.",
    character: "Puissant · Militaire · Politique",
    gradient: "linear-gradient(135deg, #1a1a3e 0%, #2d2d6b 50%, #1a1a3e 100%)",
    accent: "#4A4AFF",
    href: "/https://sites.google.com/view/asdorath",
  },
  {
    name: "Arcabios",
    type: "Royaume",
    population: "50 000 habitants",
    description: "Fondé par un maître épéiste sur les ruines de Toundra. Connu pour sa bibliothèque légendaire et son académie.",
    character: "Erudit · Guerrier · Ordonné",
    gradient: "linear-gradient(135deg, #1a2e1a 0%, #2d5a2d 50%, #1a2e1a 100%)",
    accent: "#4AFF6B",
    href: "/nations",
  },
  {
    name: "Hokkaido",
    type: "Royaume samourai",
    population: "30 000 habitants",
    description: "La croissance de cette île de l'ouest fut fulgurante, mais sa chute a été tout autant spectaculaire.",
    character: "Samourai · Mafieux · Menaçant",
    gradient: "linear-gradient(135deg, #0e1a2e 0%, #1e2a4a 50%, #2a1a3e 100%)",
    accent: "#B44AFF",
    href: "/nations",
  },
  {
    name: "Dakurodo",
    type: "Royaume sombre",
    population: "70 000 habitants",
    description: "Les pires démons et nécromanciens y règnent. La reine soulève une armée. Le monde retient son souffle.",
    character: "Sombre · Interdit · Menaçant",
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #3d1010 50%, #1a0a0a 100%)",
    accent: "#FF4A4A",
    href: "/nations",
  },
  {
    name: "Solarsen",
    type: "Royaume maritime",
    population: "42 000 habitants",
    description: "Ancienne province d'Asdorath devenue puissance commerciale. Ports prospères, magie reconnue, accès à trois océans.",
    character: "Maritime · Magique · Indépendant",
    gradient: "linear-gradient(135deg, #0a1a2e 0%, #14365c 50%, #0a1a2e 100%)",
    accent: "#4AC8FF",
    href: "/nations",
  },
  {
    name: "Tengoku",
    type: "Îles flottantes",
    population: "75 000 habitants",
    description: "Havre de la magie du vent. Des îles flottantes au cœur de Dakurodo. Un peuple mystérieux que rien ne peut atteindre.",
    character: "Mystique · Aérien · Isolé",
    gradient: "linear-gradient(135deg, #393a3b 0%, #202122 50%, #020103 100%)",
    accent: "#7f7d81",
    href: "/nations",
  },
  {
    name: "Thogdur",
    type: "Royaume orc",
    population: "80 000 habitants",
    description: "Dirigé par le gobelin Thogdur d'une main de fer, le Royaume de Thogdur est l'un des plus fermés, interdit aux humains ou encore aux elfes.",
    character: "Fermé · Autoritaire · Esclavagiste",
    gradient: "linear-gradient(135deg, #1a2e1a 0%, #2d5a2d 50%, #1a2e1a 100%)",
    accent: "#4AFF6B",
    href: "/nations",
  },
]

export default function Nations() {
  return (
    <section className="bg-[#EFF4FB] py-24 px-4 relative">
      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 block">
          <path d="M0,20 C480,60 960,0 1440,30 L1440,0 L0,0 Z" fill="#F8FAFD" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="eyebrow text-[#C9974A] mb-4">Choisissez votre allégeance</p>
          <h2 className="font-cinzel font-bold text-section-title text-[#1A1A2E] mb-4">
            Les Nations d&apos;Izaria
          </h2>
          <p className="font-jost text-[#4A5568] max-w-xl mx-auto">
            Dix nations forgées par des siècles de guerre et de diplomatie. Chacune avec ses lois, ses secrets et ses ambitions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nations.map((nation, i) => (
            <a
              key={nation.name}
              href={nation.href}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} group relative rounded-lg overflow-hidden cursor-pointer block`}
              style={{ minHeight: "220px" }}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 transition-all duration-250"
                style={{ background: nation.gradient }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-250" />
              {/* Accent border top */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: nation.accent }}
              />

              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-cinzel font-bold text-xl text-[#F0EDE8] group-hover:text-white transition-colors">
                        {nation.name}
                      </h3>
                      <p className="font-jost text-xs uppercase tracking-widest mt-0.5" style={{ color: nation.accent }}>
                        {nation.type}
                      </p>
                    </div>
                    <span className="font-jost text-xs text-[#F0EDE8]/40">
                      {nation.population}
                    </span>
                  </div>
                  <p className="font-eb-garamond italic text-[#F0EDE8]/70 text-sm leading-relaxed line-clamp-3">
                    {nation.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-jost text-xs text-[#F0EDE8]/40">
                    {nation.character}
                  </span>
                  <span
                    className="font-jost text-xs font-medium transition-colors group-hover:underline"
                    style={{ color: nation.accent }}
                  >
                    Explorer →
                  </span>
                </div>
              </div>

              {/* Scale effect */}
              <div className="absolute inset-0 transition-transform duration-250 group-hover:scale-[1.02] origin-center" />
            </a>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12 reveal">
          <a
            href="/nations"
            className="font-jost font-medium text-sm text-[#C9974A] hover:text-[#B8853A] transition-colors inline-flex items-center gap-2"
          >
            Voir toutes les nations
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
