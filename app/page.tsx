import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import StatsBar from "@/components/StatsBar"
import Universe from "@/components/Universe"
import Nations from "@/components/Nations"
import Features from "@/components/Features"
import HowToJoin from "@/components/HowToJoin"
import RacesClasses from "@/components/RacesClasses"
import Guilds from "@/components/Guilds"
import Community from "@/components/Community"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"

export default function Home() {
  return (
    <ScrollRevealProvider>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Universe />
        <Nations />
        <Features />
        <HowToJoin />
        <RacesClasses />
        <Guilds />
        <Community />
      </main>
      <Footer />
    </ScrollRevealProvider>
  )
}
