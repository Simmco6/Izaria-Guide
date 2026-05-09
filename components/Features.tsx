const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Un univers construit",
    description:
      "Des centaines de pages de lore sur les nations, races, pouvoirs, flore, faune pour créer un monde cohérent et en évolution constante.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
      </svg>
    ),
    title: "Des personnages vivants",
    description:
      "Crée ta fiche de personnage, choisis ta nation, ta race, ta classe et plonge dans des intrigues politiques et guerrières.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Une communauté accueillante",
    description:
      "Un serveur Discord francophone, des events réguliers, des MJs disponibles et une communauté qui t'accueille.",
  },
]

export default function Features() {
  return (
    <section className="bg-[#F8FAFD] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="eyebrow text-[#C9974A] mb-4">Pourquoi Izaria ?</p>
          <h2 className="font-cinzel font-bold text-section-title text-[#1A1A2E]">
            Ce qui nous distingue
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} bg-white rounded-lg p-8 shadow-sm border-t-[3px] border-[#C9974A] hover:shadow-md hover:-translate-y-1 transition-all duration-250 group`}
            >
              <div className="text-[#C9974A] mb-5 group-hover:scale-110 transition-transform duration-200 inline-block">
                {feature.icon}
              </div>
              <h3 className="font-jost font-600 text-lg text-[#1A1A2E] mb-3">
                {feature.title}
              </h3>
              <p className="font-jost text-sm text-[#4A5568] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
