const steps = [
  {
    number: "01",
    title: "Rejoins Discord",
    description: "Présente-toi sur le serveur, soumets ta fiche et attends la validation. Bienvenue dans Izaria !",
    cta: { label: "Rejoindre Discord", href: "https://discord.gg/yDhFtnm2NR", external: true },
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Explore l'univers",
    description: "Lis l'histoire d'Izaria, découvre les nations disponibles, les races jouables et le système de pouvoirs.",
    cta: { label: "Découvrir le lore", href: "/histoire" },
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Crée ta fiche",
    description: "Suis le guide de création de personnage. Choisis ta nation, ta race, ta classe et donne vie à ton alter ego.",
    cta: { label: "Créer sa fiche", href: "/creation-dune-fiche" },
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  }
]

export default function HowToJoin() {
  return (
    <section className="bg-[#EFF4FB] py-24 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C9974A 0px, #C9974A 1px, transparent 1px, transparent 20px)`,
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <p className="eyebrow text-[#C9974A] mb-4">Comment commencer</p>
          <h2 className="font-cinzel font-bold text-section-title text-[#1A1A2E] mb-4">
            Rejoindre Izaria
          </h2>
          <p className="font-jost text-[#4A5568] max-w-xl mx-auto">
            Trois étapes simples pour devenir un joueur d&apos;Izaria et écrire ton histoire.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px border-t-2 border-dashed border-[#C9974A]/30" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center`}>
                {/* Step icon with number */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#0D1B2A] flex items-center justify-center text-[#C9974A] relative z-10">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 font-cinzel font-bold text-xs text-[#C9974A] bg-[#EFF4FB] px-1 border border-[#C9974A]/30 rounded">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-lg text-[#1A1A2E] mb-3">
                  {step.title}
                </h3>
                <p className="font-jost text-sm text-[#4A5568] leading-relaxed mb-6 max-w-xs">
                  {step.description}
                </p>

                <a
                  href={step.cta.href}
                  target={step.cta.external ? "_blank" : undefined}
                  rel={step.cta.external ? "noopener noreferrer" : undefined}
                  className={`font-jost text-sm font-medium px-6 py-2.5 rounded transition-all duration-200 ${
                    i === 1
                      ? "border border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-[#F0EDE8]"
                      : i === 2
                      ? "bg-[#C9974A] text-white hover:bg-[#B8853A] hover:shadow-[0_0_20px_rgba(201,151,74,0.3)]"
                      : "bg-[#5865F2] text-white hover:bg-[#4752C4]"
                  }`}
                >
                  {step.cta.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
