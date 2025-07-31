'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from '@/components/Loader';
import ProgressBar from '@/components/ProgressBar'
import Navbar from '@/components/Navbar'
import { images } from '@/components/ProgressBar';

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    // Function to recalculate scroll amount
    const recalculateScroll = () => {
      const containerWidth = container.offsetWidth
      const trackWidth = track.scrollWidth
      const scrollAmount = trackWidth - containerWidth

      return Math.max(0, scrollAmount)
    }

    // Wait for layout to be ready and images to load
    const initScroll = () => {
      const scrollAmount = recalculateScroll()

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollAmount}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.fromTo(track,
        { x: 0 },
        {
          x: -scrollAmount,
          ease: 'none',
        }
      )
    }

    // Wait for images to load before calculating scroll
    const imagePromises = images.map(src => {
      return new Promise((resolve) => {
        const img = new window.Image()
        img.onload = resolve
        img.onerror = resolve
        img.src = src
      })
    })

    Promise.all(imagePromises).then(() => {
      requestAnimationFrame(initScroll)
    })


    // Handle resize eventsno
    const handleResize = () => {
      ScrollTrigger.killAll()
      requestAnimationFrame(initScroll)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      ScrollTrigger.killAll()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Loader />
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center text-black"
      >

        <Navbar />

        <div className="flex flex-col items-center justify-center flex-1 w-full overflow-hidden">
          <div className="w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-4 px-10 items-center"
              style={{
                width: 'max-content',
                transform: 'translateX(0)',
              }}
            >
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Travel photo ${i + 1}`}
                  className="h-[60vh] w-auto object-cover"
                  draggable={false}
                />
              ))}
            </div>
          </div>

          <ProgressBar />
        </div>

        <footer className="fixed bottom-10 left-0 right-0 z-5 w-full text-black text-center">
          <p className="text-sm text-black link">© mason boulier</p>
        </footer>
      </section >
    </>
  )
}
