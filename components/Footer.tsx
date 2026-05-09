const footerLinks = {
  univers: [
    { label: "Histoire", href: "/histoire" },
    { label: "Carte du Monde", href: "/carte-du-monde" },
    { label: "Nations", href: "/nations" },
    { label: "Races et Classes", href: "/races-et-classes" },
    { label: "Pouvoirs", href: "/pouvoirs" },
  ],
  communaute: [
    { label: "Création d'une fiche", href: "/creation-dune-fiche" },
    { label: "Comment RP ?", href: "/comment-rp" },
    { label: "Guildes", href: "/guildes" },
    { label: "Rôles importants", href: "/roles-importants" },
    { label: "Donnez votre avis", href: "https://forms.gle/XN1b2WzeYzEMAzbx9", external: true },
  ],
  encyclopedies: [
    { label: "Flore", href: "/encyclopedie-de-la-flore" },
    { label: "Faune", href: "/encyclopedie-de-la-faune" },
    { label: "Encyclopédie aquatique", href: "/encyclopedie-aquatique" },
    { label: "Astronomie", href: "/astronomie" },
    { label: "Boss", href: "/boss" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] relative overflow-hidden">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Watermark IZARIA */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-cinzel font-bold text-[20vw] text-white/[0.015] leading-none"
          style={{ userSelect: "none" }}
        >
          IZARIA
        </span>
      </div>

      {/* Wave divider top */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 block">
          <path d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z" fill="#EFF4FB" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <a href="/" className="font-cinzel font-bold text-2xl tracking-widest text-[#F0EDE8] block mb-3">
              IZARIA
            </a>
            <p className="font-jost text-sm text-[#9CA3AF] leading-relaxed mb-4">
              Roleplay médiéval-fantastique francophone depuis 2020. Un univers vivant, une communauté qui t&apos;attend.
            </p>
            <a
              href="https://discord.gg/yDhFtnm2NR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-jost text-sm text-[#F0EDE8]/60 hover:text-[#F0EDE8] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Discord Izaria
            </a>
            <div className="mt-6">
              <p className="font-jost text-xs text-[#9CA3AF]/40">© 2021–2026 Izaria. Tous droits réservés.</p>
            </div>
          </div>

          {/* Univers */}
          <div>
            <h4 className="font-cinzel font-bold text-sm text-[#C9974A] uppercase tracking-widest mb-4">
              Univers
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.univers.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-jost text-sm text-[#9CA3AF] hover:text-[#F0EDE8] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Communauté */}
          <div>
            <h4 className="font-cinzel font-bold text-sm text-[#C9974A] uppercase tracking-widest mb-4">
              Communauté
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.communaute.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={"external" in link && link.external ? "_blank" : undefined}
                    rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                    className="font-jost text-sm text-[#9CA3AF] hover:text-[#F0EDE8] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Encyclopédies */}
          <div>
            <h4 className="font-cinzel font-bold text-sm text-[#C9974A] uppercase tracking-widest mb-4">
              Encyclopédies
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.encyclopedies.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-jost text-sm text-[#9CA3AF] hover:text-[#F0EDE8] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-jost text-xs text-[#9CA3AF]/40">
            Izaria · Communauté RP depuis 2020 · Serveur en constante évolution
          </p>
          <a
            href="https://discord.gg/yDhFtnm2NR"
            target="_blank"
            rel="noopener noreferrer"
            className="font-jost text-sm font-medium px-5 py-2 rounded bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors"
          >
            Rejoindre Discord
          </a>
        </div>
      </div>
    </footer>
  )
}
