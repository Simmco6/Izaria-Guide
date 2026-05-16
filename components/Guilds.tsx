const guilds = [
  {
    name: "Guilde des Marchands",
    type: "Asdorath",
    description: "Commerçants, négociants et aventuriers. Leur influence s’étend à travers les continents.",
    icon: "💰",
    color: "#C9974A",
  },
  {
    name: "Guilde du Taper",
    type: "Asdorath",
    description: "le marteau est au centre de toute chose. Guerriers, fracsseurs et marteniers, ils façonnent le monde à l'image du marteau.",
    icon: "🔨",
    color: "#7e7c7a",
  },
  {
    name: "Ordre de la Rose Noire",
    type: "Tengoku",
    description: "Mercenaires spécialisés dans l'éradication des démons et des créatures maléfiques. Leur loyauté est aussi noire que leur emblème.",
    icon: "🌹",
    color: "#751e1e",
  },
  {
    name: "Bande des Epines",
    type: "Ipulos Tacderen",
    description: "Voleurs, assassins et espions. Ils prospèrent dans l'ombre, utilisant la ruse et la discrétion pour voler les plus grands trésors.",
    icon: "🗡️",
    color: "#9c4faf",
  },
  {
    name: "Croc des Abysses",
    type: "",
    description: "Pirates et corsaires des mers inexplorées. Ils rôdent dans les eaux troubles, pillant les navires et terrorisant les côtes.",
    icon: "🏴‍☠️",
    color: "#0d0d0e",
  },
  {
    name: "Orbis Arcanum",
    type: "Arcabios",
    description: "Explorateurs, chercheurs et érudits. Ils parcourent le monde à la recherche de reliques anciennes et de connaissances perdues.",
    icon: "🔍",
    color: "#4ecbdb",
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
