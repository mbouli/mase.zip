import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="fixed px-3 py-2 top-0 left-0 right-0 z-20 w-full flex justify-between items-center text-lg font-bold">
            <div className="flex items-center gap-4">
                <Image src="/logo/full_2.png" alt="ROOM125" width={150} height={50} />
                <p className="text-xs md:text-sm">Mason Boulier's Photo Archive</p>
            </div>

            <div className="space-x-8 text-xs md:text-sm">
                <Link href="mailto:mbouli@gmail.com" className="link hover:underline">CONTACT</Link>
            </div>
        </nav>
    )
}

export default Navbar