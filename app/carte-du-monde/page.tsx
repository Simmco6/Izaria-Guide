import type { Metadata } from "next"
import CarteClient from "./CarteClient"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollRevealProvider from "@/components/ScrollRevealProvider"

export const metadata: Metadata = {
  title: "Carte du Monde",
  description: "Carte interactive du monde d'Izaria — explorez les nations, leurs territoires et leur histoire.",
}

export default function CarteDuMondePage() {
  return (
    <ScrollRevealProvider>
      <Navbar />
      <CarteClient />
      <Footer />
    </ScrollRevealProvider>
  )
}
