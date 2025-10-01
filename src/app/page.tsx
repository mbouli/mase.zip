import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"



export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <HeroSection />
      <SpeedInsights />
      <Analytics />
      <Footer />
    </>
  )
}
