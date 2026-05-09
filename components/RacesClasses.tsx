const races = [
  { name: "Humain", emoji: "⚔️", description: "Polyvalent, ambitieux, le pilier des grandes nations." },
  { name: "Elfe", emoji: "🌿", description: "Raffinés, héritiers d'une sagesse millénaire." },
  { name: "Fae", emoji: "✨", description: "Petis êtres de magie, imprévisibles et puissants." },
  { name: "Thérianthrope", emoji: "🐱", description: "Mi-homme, mi-animal, art même de la polyvalance." },
  { name: "Démon", emoji: "🔥", description: "Nés des abysses de Dakurodo, maîtres des arts sombres." },
  { name: "Ange", emoji: "🕊️", description: "Humains ailés, protecteurs des nations de lumière." },
  { name: "Gobelin", emoji: "🌑", description: "Petits mais rusés, artisans et marchands redoutables." },
  { name: "Mort-vivant", emoji: "💀", description: "Mortels ayant vendu leur âme à l'art de la mort." },
]

export default function RacesClasses() {
  return (
    <section className="bg-[#0D1B2A] py-24 px-4 relative overflow-hidden">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 block">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#EFF4FB" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <p className="eyebrow text-[#C9974A] mb-4">Choisissez votre essence</p>
          <h2 className="font-cinzel font-bold text-section-title text-[#F0EDE8] mb-4">
            Races &amp; Classes
          </h2>
          <p className="font-jost text-[#F0EDE8]/60 max-w-xl mx-auto">
            Huit races jouables, chacune avec son héritage, ses capacités uniques et sa place dans l&apos;histoire d&apos;Izaria.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {races.map((race, i) => (
            <a
              key={race.name}
              href="/races-et-classes"
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} group bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 hover:border-[#C9974A]/40 transition-all duration-250 cursor-pointer block`}
            >
              <div className="text-3xl mb-3">{race.emoji}</div>
              <h3 className="font-cinzel font-bold text-[#F0EDE8] text-base mb-2 group-hover:text-[#C9974A] transition-colors">
                {race.name}
              </h3>
              <p className="font-jost text-xs text-[#F0EDE8]/50 leading-relaxed">
                {race.description}
              </p>
            </a>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <a
            href="/races-et-classes"
            className="font-jost font-medium text-sm px-8 py-3 rounded border border-[#C9974A] text-[#C9974A] hover:bg-[#C9974A] hover:text-white transition-all duration-200 inline-block"
          >
            Voir toutes les races &amp; classes
          </a>
        </div>
      </div>

      {/* Wave divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 block rotate-180">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#F8FAFD" />
        </svg>
      </div>
    </section>
  )
}
