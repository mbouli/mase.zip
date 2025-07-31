'use client'

import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  )
}
