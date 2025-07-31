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
                        delay: 1.5,
                        duration: 0.6,
                        ease: [0.895, 0.03, 0.685, 0.22], // EASE IN QUART
                    }}
                    onAnimationComplete={() => setDone(true)}
                    className="fixed inset-0 z-50 bg-[#FF3D49] text-white flex items-center justify-center"
                >
                    <TextStagger>opening ROOM125...</TextStagger>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const DURATION = 0.3;
const STAGGER = 0.45;

const TextStagger = ({ children }: { children: string; }) => {
    return (
        <motion.a
            initial="inital"
            animate="hovered"
            transition={{
                delay: 0,
                duration: 0.25,
                ease: easeInOut
            }}
            className="relative link inline-block overflow-hidden uppercase text-2xl tracking-wide"
            style={{
                lineHeight: 1,
                letterSpacing: '.03em'
            }}
        >
            <div>
                {children.split(" ").map((word, i) => {
                    return (
                        <span key={i}>
                            <motion.span
                                variants={{
                                    inital: { y: 0 },
                                    hovered: { y: '-100%' }
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: 'easeInOut',
                                    delay: STAGGER * i
                                }}
                                className="inline-block antialiased invisible"
                            >
                                {word}
                            </motion.span>
                            {i < children.split(" ").length - 1 && " "}
                        </span>
                    )
                })}
            </div>
            <div className="absolute inset-0">
                {children.split(" ").map((word, i) => {
                    return (
                        <span key={i}>
                            <motion.span
                                variants={{
                                    inital: { y: '100%' },
                                    hovered: { y: 0 }
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: 'easeInOut',
                                    delay: STAGGER * i
                                }}
                                className="inline-block antialiased"
                            >
                                {word}
                            </motion.span>
                            {i < children.split(" ").length - 1 && " "}
                        </span>
                    )
                })}
            </div>
        </motion.a>
    )
}