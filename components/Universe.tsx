export default function Universe() {
  return (
    <section className="bg-[#F8FAFD] py-24 px-4 relative overflow-hidden">
      {/* Decorative SVG divider top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 block">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="#0D1B2A" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <p className="eyebrow text-[#C9974A] mb-4">L&apos;Univers d&apos;Izaria</p>
            <h2 className="font-cinzel font-bold text-section-title text-[#1A1A2E] mb-6">
              Un monde forgé par la guerre
            </h2>
            <div className="space-y-4 text-lore text-[#4A5568]">
              <p>
                Il y a des siècles, les nations d&apos;Izaria vivaient séparées. Chaque race dans son royaume.
                Tout changea en l&apos;an 9188, quand l&apos;Empereur Fae <strong className="text-[#1A1A2E]">Zu&apos;Naat</strong> déclara la guerre au monde.
              </p>
              <p className="pl-4 border-l-[3px] border-[#C9974A] italic font-eb-garamond text-[#8B6F47]">
                « L&apos;Alliance naquit. Zu&apos;Naat tomba. Les nations s&apos;ouvrirent. »
              </p>
              <p>
                Trois cents ans de paix plus tard, la <strong className="text-[#1A1A2E]">Guerre de 2 ans</strong> brisa tout à nouveau.
                Asdorath tient encore. Dakurodo prépare ses armées. Et toi ?
              </p>
              <p>
                En l&apos;an <strong className="text-[#C9974A]">9527</strong>, l&apos;histoire d&apos;Izaria t&apos;appartient.
              </p>
            </div>
            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href="/histoire"
                className="font-jost font-medium text-sm px-6 py-3 bg-[#1A1A2E] text-[#F0EDE8] rounded hover:bg-[#0D1B2A] transition-colors"
              >
                Lire l&apos;histoire complète
              </a>
              <a
                href="/carte-du-monde"
                className="font-jost font-medium text-sm px-6 py-3 border border-[#C9974A] text-[#C9974A] rounded hover:bg-[#C9974A]/5 transition-colors"
              >
                Carte du monde
              </a>
            </div>
          </div>

          {/* Decorative block */}
          <div className="reveal reveal-delay-2">
            <div className="relative">
              {/* Main card */}
              <div className="bg-[#0D1B2A] rounded-lg p-8 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(201,151,74,0.4) 0%, transparent 60%)`,
                  }}
                />
                <p className="eyebrow text-[#C9974A] mb-4">Nations actives — An 9527</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                     "Alakasham","Asdorath", "Arcabios", "Dakurodo", "Hokkaido", "Ipulos Tacderen", "Mitsurin", "Solarsen", "Tengoku", "Thogdur"
                  ].map((nation) => (
                    <div
                      key={nation}
                      className="flex items-center gap-2 py-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9974A] flex-shrink-0" />
                      <span className="font-cinzel text-[#F0EDE8] text-sm">{nation}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="font-jost text-xs text-[#F0EDE8]/40 italic">
                    Nations disparues : Saltir, Toundra, Azandor (disponibles en backstory)
                  </p>
                </div>
              </div>
              {/* Decorative corner ornament */}
              <div className="absolute -top-3 -right-3 w-16 h-16 opacity-20">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0 L64 0 L64 64" stroke="#C9974A" strokeWidth="2" fill="none" />
                  <circle cx="48" cy="16" r="8" stroke="#C9974A" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
