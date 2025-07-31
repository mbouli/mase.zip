'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'

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
                    <motion.h1
                        className="link relative block overflow-hidden whitespace-nowrap uppercase">
                        <motion.div
                            initial={{ y: '100%', opacity: 1 }}
                            animate={{ y: '0%', opacity: 1 }}
                            transition={{
                                delay: 0.05,
                                duration: 0.25,
                                ease: easeInOut
                            }}
                            className="leading-[1.2em] text-2xl link tracking-wide"
                        >
                            opening ROOM125...
                        </motion.div>
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
