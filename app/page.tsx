import { HeroSection } from "@/components/hero-section"
import { WorkshopCards } from "@/components/workshop-cards"
import { Testimonials } from "@/components/testimonials"
import { LearnFromMe } from "@/components/learn-from-me"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <WorkshopCards />
      <LearnFromMe />
      <Testimonials />
      <Footer />
    </div>
  )
}
