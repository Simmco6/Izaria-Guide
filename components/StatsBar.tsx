export default function StatsBar() {
  const stats = [
    { value: "10", label: "Nations" },
    { value: "14+", label: "Races jouables" },
    { value: "15", label: "Classes jouables" },
    { value: "2020", label: "Depuis" }
  ]

  return (
    <section className="bg-[#0D1B2A] py-8 px-4 relative overflow-hidden">
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="group">
              <div className="font-cinzel text-3xl font-bold text-[#C9974A] mb-1">
                {stat.value}
              </div>
              <div className="font-jost text-xs uppercase tracking-[0.15em] text-[#F0EDE8]/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="font-jost text-sm text-[#F0EDE8]/40 tracking-wide">
            Prends toi aussi un rôle important dans une des nations et prends activement part au lore d'Izaria afin de le façonner!
          </p>
        </div>
      </div>
    </section>
  )
}
