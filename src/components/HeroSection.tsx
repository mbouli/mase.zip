'use client';
import React from 'react'
import ProgressBar from '@/components/ProgressBar'
import { useRef, useEffect, useState } from 'react'
import { images } from '@/util/images';
import { gsap } from 'gsap';
import Image from 'next/image';

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const trackRef = useRef<HTMLDivElement | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const [currentPosition, setCurrentPosition] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    // Calculate max scroll amount
    const calculateMaxScroll = () => {
        if (!trackRef.current || !containerRef.current) return

        const container = containerRef.current
        const track = trackRef.current
        const containerWidth = container.offsetWidth
        const trackWidth = track.scrollWidth

        const maxScrollAmount = Math.max(0, trackWidth - containerWidth)
        setMaxScroll(maxScrollAmount)
        console.log('Max scroll calculated:', {
            containerWidth,
            trackWidth,
            maxScrollAmount,
            currentPosition,
            isMobile
        })
    }

    useEffect(() => {
        calculateMaxScroll()
    }, [isMobile])

    // Recalculate when images load
    useEffect(() => {
        if (!trackRef.current) return

        const images = trackRef.current.querySelectorAll('img')
        const imagePromises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve(true)
                } else {
                    img.onload = () => resolve(true)
                    img.onerror = () => resolve(true)
                }
            })
        })

        Promise.all(imagePromises).then(() => {
            setTimeout(calculateMaxScroll, 100)
        })
    }, [])

    useEffect(() => {
        if (isMobile) return

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()

            const scrollSensitivity = 0.5
            const scrollDelta = e.deltaY * scrollSensitivity
            const newPosition = Math.max(0, Math.min(maxScroll, currentPosition + scrollDelta))

            setCurrentPosition(newPosition)

            if (trackRef.current) {
                gsap.to(trackRef.current, {
                    x: -newPosition,
                    duration: 0.1,
                    ease: 'power2.out',
                    force3D: true
                })
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false })
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel)
            }
        }
    }, [isMobile, currentPosition, maxScroll])

    const handleStart = (clientX: number) => {
        setTouchStart(clientX)
        setTouchEnd(null)
        setIsDragging(true)
    }

    const handleMove = (clientX: number) => {
        if (!isDragging || touchStart === null) return
        setTouchEnd(clientX)

        const dragDistance = touchStart - clientX
        const newPosition = Math.max(0, Math.min(maxScroll, currentPosition + dragDistance))

        console.log('Drag move:', {
            dragDistance,
            currentPosition,
            newPosition,
            maxScroll,
            isConstrained: newPosition === maxScroll
        })

        if (trackRef.current) {
            gsap.set(trackRef.current, {
                x: -newPosition,
                force3D: true
            })
        }
    }

    const handleEnd = () => {
        if (!isDragging || !touchStart || !touchEnd) {
            setIsDragging(false)
            setTouchStart(null)
            setTouchEnd(null)
            return
        }

        const swipeDistance = touchStart - touchEnd
        const minSwipeDistance = 50

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            const swipeSensitivity = 1.5
            const movement = swipeDistance * swipeSensitivity
            let newPosition = currentPosition + movement

            newPosition = Math.max(0, Math.min(maxScroll, newPosition))
            setCurrentPosition(newPosition)

            if (trackRef.current) {
                gsap.to(trackRef.current, {
                    x: -newPosition,
                    duration: 0.3,
                    ease: 'power2.out',
                    force3D: true
                })
            }
        } else {
            // Snap back to current position
            if (trackRef.current) {
                gsap.to(trackRef.current, {
                    x: -currentPosition,
                    duration: 0.2,
                    ease: 'power2.out',
                    force3D: true
                })
            }
        }

        setIsDragging(false)
        setTouchStart(null)
        setTouchEnd(null)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault()
        handleStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        e.preventDefault()
        handleMove(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        handleEnd()
    }

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        handleStart(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        handleMove(e.clientX)
    }

    const handleMouseUp = () => {
        handleEnd()
    }


    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center text-black"
        >
            <div className="flex flex-col items-center justify-center flex-1 w-full overflow-hidden">
                <div className="w-full overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex items-center gap-4 px-10 cursor-grab active:cursor-grabbing select-none"
                        style={{
                            width: 'max-content',
                            transform: 'translateX(0)',
                            willChange: 'transform',
                            touchAction: 'pan-y',
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {images.map((src, i) => (
                            <div
                                key={i}
                                className="relative flex-shrink-0"
                                style={{
                                    width: '300px',
                                    height: '60vh',
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`Travel photo ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={i < 3}
                                    quality={85}
                                    sizes="300px"
                                />
                            </div>
                        ))}
                        <div className="w-1 h-[60vh] pr-2 flex-shrink-0" />
                    </div>
                </div>
                {/* <ProgressBar /> */}
                <div className="mt-4 text-center text-gray-500 text-sm">
                    <div className="flex items-center justify-center gap-2">
                        <span>←</span>
                        <span>{isMobile ? 'Swipe' : 'Scroll or drag'} to explore</span>
                        <span>→</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection