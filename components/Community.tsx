const testimonials = [
  {
    quote: "En tant qu'ancienne débutante totale en roleplay, je peux affirmer qu'Izaria est THE place to be pour se lancer ! Jamais vu des tutoriels aussi clairs et complets. Les guides couvrent tout : création de fiche, bases du RP, lore du monde... Impossible d'être perdu ! En 2-3 jours, j'avais toutes les clés en main pour bien commencer.",
    author: "Hynomasha",
    role: "Dirigeante — Alakasham",
    initial: "H",
  },
  {
    quote: "Joueur passionné de RP depuis des années, j'ai rarement été aussi impressionné par un serveur Discord que par Izaria. Fini les systèmes de combat rigides et frustrauts ! Sur Izaria, la liberté d'action en combat est remarquable. Vous pouvez développer vos propres techniques, créer des combos uniques et adapter votre style de jeu selon votre imagination. Les MJ encouragent la créativité tactique et chaque affrontement devient une véritable œuvre d'art narrative.",
    author: "Moarkov",
    role: "Joueur — Arcabios",
    initial: "M",
  },
  {
    quote: "Un super site a été ouvert pour rendre le RP et le lore accessible à tous. Le staff est ouvert aux suggestions et c'est grâce à cette formule que le serveur est encore actif après 4 ans d'existence ! En plus de ça, on peut prendre des rôles importants comme dirigeant, chef d'armée ou richissime marchand. Bref, c'est vraiment une super trouvaille !",
    author: "Ocydo",
    role: "Validatrice de fiche, Dirigeante — Tengoku",
    initial: "O",
  },
]

export default function Community() {
  return (
    <section className="bg-[#EFF4FB] py-24 px-4 relative overflow-hidden">
      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 block">
          <path d="M0,20 C480,60 960,0 1440,30 L1440,0 L0,0 Z" fill="#F8FAFD" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="eyebrow text-[#C9974A] mb-4">Ils jouent déjà</p>
          <h2 className="font-cinzel font-bold text-section-title text-[#1A1A2E] mb-4">
            La Communauté
          </h2>
          <p className="font-jost text-[#4A5568] max-w-xl mx-auto">
            Des centaines de joueurs actifs, des histoires qui durent depuis des années.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} bg-white rounded-lg p-6 shadow-sm relative`}
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-4 font-cinzel text-6xl text-[#C9974A]/10 leading-none select-none">
                "
              </div>
              <p className="font-eb-garamond italic text-[#4A5568] leading-relaxed mb-6 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9974A]/20 flex items-center justify-center">
                  <span className="font-cinzel font-bold text-[#C9974A] text-sm">{t.initial}</span>
                </div>
                <div>
                  <p className="font-jost font-medium text-sm text-[#1A1A2E]">{t.author}</p>
                  <p className="font-jost text-xs text-[#8B6F47]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discord CTA block */}
        <div className="reveal bg-[#0D1B2A] rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(201,151,74,0.5) 0%, transparent 70%)`,
            }}
          />
          <div className="relative z-10">
            <div className="text-5xl mb-4">⚔️</div>
            <h3 className="font-cinzel font-bold text-2xl md:text-3xl text-[#F0EDE8] mb-4">
              Prêt à forger ton destin ?
            </h3>
            <p className="font-jost text-[#F0EDE8]/60 max-w-md mx-auto mb-8">
              Rejoins des centaines de joueurs sur notre serveur Discord. Ta fiche n&apos;attend que toi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/creation-dune-fiche"
                className="font-jost font-medium px-8 py-3 rounded bg-[#C9974A] text-white hover:bg-[#B8853A] transition-all duration-200 hover:shadow-[0_0_20px_rgba(201,151,74,0.3)]"
              >
                Créer sa fiche
              </a>
              <a
                href="https://discord.gg/yDhFtnm2NR"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost font-medium px-8 py-3 rounded bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors"
              >
                Rejoindre Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
