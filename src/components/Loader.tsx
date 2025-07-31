'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
    const [done, setDone] = useState(false);
    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: '100%' }}
                    transition={{
                        delay: 1.75,
                        duration: 0.75,
                        ease: [0.895, 0.03, 0.685, 0.22], // EASE IN QUART
                    }}
                    onAnimationComplete={() => setDone(true)}
                    className="fixed inset-0 z-50 bg-[#FF3D49] text-white flex items-center justify-center"
                >
                    <div className="relative h-[1.75em] overflow-hidden">
                        <motion.h1
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            transition={{
                                delay: 0.05,
                                duration: 0.3,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            className="leading-[1.2em] text-2xl link tracking-wide"
                        >
                            opening ROOM125...
                        </motion.h1>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
