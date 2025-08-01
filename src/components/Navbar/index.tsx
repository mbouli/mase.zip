'use client';
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <nav className="fixed px-9 py-2 top-0 left-0 right-0 z-20 w-full flex justify-between items-center text-lg font-bold text-black">
            <div className="flex items-center gap-4">
                <Image src="/logo/full_2.png" alt="ROOM125" width={150} height={50} />
                <p className="text-xs md:text-sm">Mason Boulier's Photo Archive</p>
            </div>

            <div className="space-x-8 text-base md:text-sm hidden md:block text-black">
                {/* <StaggeredLink href="https://masonboulier.com">DEV&nbsp;WORK</StaggeredLink> */}
                <StaggeredLink href="https://github.com/mbouli">DEV&nbsp;WORK</StaggeredLink>
                <StaggeredLink href="mailto:mbouli@gmail.com">CONTACT</StaggeredLink>
            </div>
        </nav>
    )
}

const DURATION = 0.25;
const STAGGER = 0.025;

const StaggeredLink = ({ children, href, className }: { children: string; href: string; className?: string }) => {
    return (
        <motion.a
            initial="inital"
            whileHover="hovered"
            className="relative link inline-block overflow-hidden whitespace-nowrap lowercase"
            href={href}
            style={{
                lineHeight: 0.85,
                letterSpacing: '.03em'
            }}
        >
            <div>
                {children.split("").map((letter, i) => {
                    return <motion.span
                        variants={{
                            inital: { y: 0 },
                            hovered: { y: '-100%' }
                        }}
                        transition={{
                            duration: DURATION,
                            ease: 'easeInOut',
                            delay: STAGGER * i
                        }}
                        className="inline-block antialiased"
                        key={i}
                    >
                        {letter}
                    </motion.span>
                })}
            </div>
            <div className="absolute inset-0">
                {children.split("").map((letter, i) => {
                    return <motion.span
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
                        key={i}
                    >
                        {letter}
                    </motion.span>
                })}
            </div>
        </motion.a>
    )
}

export default Navbar