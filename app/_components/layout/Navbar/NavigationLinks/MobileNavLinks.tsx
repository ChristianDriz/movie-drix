import Link from "next/link";
import { FiMenu, FiChevronRight } from "react-icons/fi";

type Props = {
    handleToggle: () => void;
    isMenuOpen: boolean;
    links: {name: string, href: string}[];
    pathname: string;
}

export default function MobileNav({ handleToggle, isMenuOpen, links, pathname }:  Props) {
    return (
        <div className="flex items-center justify-end 2xl:hidden">
            <button onClick={handleToggle} className="cursor-pointer ">
                <FiMenu className="w-6 h-6"/>
            </button>
            <div className={`p-4 fixed max-w-70 w-full top-0 right-0 z-30 bg-midnight/70 shadow-xl h-full transition-all ease-in-out duration-300
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} `}
            >        
                <div className="flex items-center justify-end">             
                    <button onClick={handleToggle} className="flex gap-2 cursor-pointer">
                        <p>Close menu</p>
                        <FiChevronRight className="w-6 h-6"/>
                    </button>
                </div>
                <ul className="my-4">
                    {links.map((link, index) => (
                    <li key={index}className="rounded-sm cursor-pointer hover:bg-black ">
                        <Link href={link.href} onClick={handleToggle} className={`block p-3 w-full ${pathname === link.href ? 'text-blue' : 'text-white'}`}>{link.name}</Link>
                    </li>
                    ))}        
                </ul>
            </div>
            <div 
                className={`fixed backdrop-blur-sm z-20 transition-opacity inset-0 w-full ${isMenuOpen ? 'opacity-100 visible ' : 'opacity-0 invisible'}`} 
                onClick={handleToggle}
            >
            </div>
        </div>
    )
}
