import { useState, useEffect, useRef } from 'react'
import { images } from '@/util/images';

const ProgressBar = () => {
    const [isDesktop, setIsDesktop] = useState(false)
    const progressBarRef = useRef<HTMLDivElement | null>(null)

    // Desktop detection
    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 768)
        }

        checkDesktop()
        window.addEventListener('resize', checkDesktop)

        return () => window.removeEventListener('resize', checkDesktop)
    }, [])

    // Progress bar update function
    const updateProgressBar = (progress: number) => {
        if (!isDesktop || !progressBarRef.current) return

        const floatingBorder = progressBarRef.current.querySelector('.floating-progress-border') as HTMLElement
        if (!floatingBorder) {
            console.log('Floating border not found')
            return
        }

        // Calculate the total scrollable width (all thumbnails + gaps)
        const thumbnailWidth = 24 // w-6 = 24px
        const gapWidth = 4 // gap-1 = 4px
        const totalScrollableWidth = (images.length - 1) * (thumbnailWidth + gapWidth)

        // Calculate current position based on progress
        const currentPosition = progress * totalScrollableWidth

        console.log('Progress:', progress, 'Position:', currentPosition)
        floatingBorder.style.transform = `translateX(${currentPosition}px)`
    }


    return (
        <>
            {isDesktop && (
                <div className="mt-8">
                    <div
                        ref={progressBarRef}
                        className="flex gap-1 relative"
                    >
                        {images.map((src, i) => (
                            <div
                                key={i}
                                className="w-6 h-6 overflow-hidden flex-shrink-0"
                                data-index={i}
                            >
                                <img
                                    src={src}
                                    alt={`Thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </>
    )
}

export default ProgressBar