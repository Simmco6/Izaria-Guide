const guilds = [
  {
    name: "Les Lames d'Argent",
    type: "Guilde de mercenaires",
    description: "Les épéistes d'élite disponibles au plus offrant. Neutres, redoutables, discrets.",
    icon: "⚔️",
    color: "#C0C0C0",
  },
  {
    name: "L'Ordre du Parchemin",
    type: "Guilde de mages & érudits",
    description: "Gardiens du savoir d'Izaria. Bibliothèques secrètes, recherches interdites.",
    icon: "📜",
    color: "#C9974A",
  },
  {
    name: "La Confrérie des Ombres",
    type: "Guilde d'espions",
    description: "Ni alliés, ni ennemis — seulement des contrats. L'information est leur monnaie.",
    icon: "🌑",
    color: "#9B59B6",
  },
  {
    name: "Les Bâtisseurs",
    type: "Guilde d'artisans",
    description: "Forgerons, architectes et maîtres artisans. Les mains qui façonnent les nations.",
    icon: "🔨",
    color: "#E67E22",
  },
]

export default function Guilds() {
  return (
    <section className="bg-[#F8FAFD] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="eyebrow text-[#C9974A] mb-4">S&apos;organiser ou s&apos;unir</p>
          <h2 className="font-cinzel font-bold text-section-title text-[#1A1A2E] mb-4">
            Les Guildes d&apos;Izaria
          </h2>
          <p className="font-jost text-[#4A5568] max-w-xl mx-auto">
            Au-delà des nations, les guildes transcendent les frontières. Rejoins l&apos;une d&apos;elles ou fonde la tienne.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {guilds.map((guild, i) => (
            <div
              key={guild.name}
              className={`reveal reveal-delay-${i + 1} flex gap-5 bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-250 group cursor-pointer`}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${guild.color}20` }}
              >
                {guild.icon}
              </div>
              <div>
                <p className="font-jost text-xs uppercase tracking-widest mb-1" style={{ color: guild.color }}>
                  {guild.type}
                </p>
                <h3 className="font-cinzel font-bold text-base text-[#1A1A2E] mb-2 group-hover:text-[#C9974A] transition-colors">
                  {guild.name}
                </h3>
                <p className="font-jost text-sm text-[#4A5568] leading-relaxed">
                  {guild.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <a
            href="/guildes"
            className="font-jost font-medium text-sm text-[#C9974A] hover:text-[#B8853A] transition-colors inline-flex items-center gap-2"
          >
            Voir toutes les guildes →
          </a>
        </div>
      </div>
    </section>
  )
}
