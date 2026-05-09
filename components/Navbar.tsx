"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const navLinks = [
  {
    label: "Univers",
    submenu: true,
    items: [
      { href: "/histoire", label: "Histoire", description: "Les chroniques d'Izaria depuis l'an 9188." },
      { href: "/carte-du-monde", label: "Carte du Monde", description: "Explorez la géographie d'Izaria." },
      { href: "/pouvoirs", label: "Pouvoirs", description: "Magie, arts de combat et dons divins." },
      { href: "/astronomie", label: "Astronomie", description: "Les astres et constellations d'Izaria." },
    ],
  },
  {
    label: "Nations",
    href: "/nations",
  },
  {
    label: "Races & Classes",
    href: "/races-et-classes",
  },
  {
    label: "Lore",
    submenu: true,
    items: [
      { href: "/encyclopedie-de-la-flore", label: "Encyclopédie de la flore", description: "La botanique d'Izaria." },
      { href: "/encyclopedie-de-la-faune", label: "Encyclopédie de la faune", description: "Les créatures terrestres." },
      { href: "/encyclopedie-aquatique", label: "Encyclopédie aquatique", description: "Les profondeurs d'Izaria." },
      { href: "/boss", label: "Boss", description: "Les créatures légendaires." },
    ],
  },
  {
    label: "Communauté",
    submenu: true,
    items: [
      { href: "/guildes", label: "Guildes", description: "Les organisations actives." },
      { href: "/roles-importants", label: "Rôles importants", description: "MJ, Admin, Joueurs." },
      { href: "/comment-rp", label: "Comment RP ?", description: "Guide du roleplay." },
      { href: "/tribus-mitsuriennes", label: "Tribus Mitsuriennes", description: "Les tribus de Mitsurin." },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#F8FAFD]/90 backdrop-blur-md border-b border-[#D4C5A9] shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className={cn(
              "font-cinzel font-bold text-xl tracking-widest transition-colors duration-300",
              scrolled ? "text-[#1A1A2E]" : "text-[#F0EDE8]"
            )}
          >
            IZARIA
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link, i) =>
                  link.submenu ? (
                    <NavigationMenuItem key={i}>
                      <NavigationMenuTrigger
                        className={cn(
                          "font-jost font-medium text-sm transition-colors",
                          scrolled
                            ? "text-[#4A5568] hover:text-[#C9974A] data-[state=open]:text-[#C9974A]"
                            : "text-[#F0EDE8]/80 hover:text-[#F0EDE8] data-[state=open]:text-[#F0EDE8]"
                        )}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                          {link.items?.map((item, j) => (
                            <li key={j}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={item.href}
                                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#C9974A]/10 group"
                                >
                                  <div className="text-sm font-jost font-medium text-[#1A1A2E] group-hover:text-[#C9974A] transition-colors">
                                    {item.label}
                                  </div>
                                  <p className="mt-1 text-xs text-[#4A5568] line-clamp-2">
                                    {item.description}
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={i}>
                      <NavigationMenuLink asChild>
                        <a
                          href={link.href}
                          className={cn(
                            "font-jost font-medium text-sm px-4 py-2 rounded-md transition-colors inline-flex items-center",
                            scrolled
                              ? "text-[#4A5568] hover:text-[#C9974A]"
                              : "text-[#F0EDE8]/80 hover:text-[#F0EDE8]"
                          )}
                        >
                          {link.label}
                        </a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://discord.gg/yDhFtnm2NR"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-jost text-sm font-medium transition-colors",
                scrolled ? "text-[#4A5568] hover:text-[#C9974A]" : "text-[#F0EDE8]/70 hover:text-[#F0EDE8]"
              )}
            >
              Discord
            </a>
            <a
              href="/creation-dune-fiche"
              className="font-jost text-sm font-medium px-4 py-2 rounded bg-[#C9974A] text-white hover:bg-[#B8853A] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(201,151,74,0.3)]"
            >
              Créer sa fiche →
            </a>
          </div>

          {/* Mobile Hamburger */}
          <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "md:hidden p-2 rounded transition-colors",
                  scrolled ? "text-[#1A1A2E] hover:bg-[#D4C5A9]/30" : "text-[#F0EDE8] hover:bg-white/10"
                )}
                aria-label="Menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="17" x2="20" y2="17" />
                    </>
                  )}
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 p-4 mt-2">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) =>
                  link.submenu ? (
                    <div key={i}>
                      <p className="text-xs font-jost font-medium text-[#8B6F47] uppercase tracking-widest mb-1 mt-2">
                        {link.label}
                      </p>
                      {link.items?.map((item, j) => (
                        <a
                          key={j}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 px-2 text-sm font-jost text-[#4A5568] hover:text-[#C9974A] hover:bg-[#C9974A]/5 rounded transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      key={i}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-2 px-2 text-sm font-jost font-medium text-[#1A1A2E] hover:text-[#C9974A] transition-colors"
                    >
                      {link.label}
                    </a>
                  )
                )}
                <hr className="my-3 border-[#D4C5A9]" />
                <a
                  href="/creation-dune-fiche"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-2.5 px-4 rounded bg-[#C9974A] text-white font-jost font-medium text-sm hover:bg-[#B8853A] transition-colors"
                >
                  Créer sa fiche →
                </a>
                <a
                  href="https://discord.gg/yDhFtnm2NR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-2.5 px-4 rounded bg-[#5865F2] text-white font-jost font-medium text-sm hover:bg-[#4752C4] transition-colors mt-1"
                >
                  Rejoindre Discord
                </a>
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
