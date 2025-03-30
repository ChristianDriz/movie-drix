"use client"

import Link from "next/link";
import Searchbar from "./Searchbar/Searchbar";
import MobileNav from "./NavigationLinks/MobileNavLinks";
import DesktopNav from "./NavigationLinks/DesktopNavLinks";

import { useSearch, useNavbar } from "@/hooks/customHook";
import { NAV_LINKS } from "@/app/_components/constants/constants";
import { usePathname } from "next/navigation";

export default function Navbar() {

    const { searchResults, 
            handleInput, 
            handleKeyDown,
            inputValue, 
            isDropdownActive, 
            handleBlur, 
            handleFocus, 
            handleReset, 
            isLoading, 
            debouncedValue, 
            hasFetched 
        } = useSearch();

    const { handleToggle, isMenuOpen } = useNavbar();
    const pathname = usePathname();

    return (
        <nav className="bg-midnight shadow-lg">
            <div className="max-w-7xl mx-auto px-2 py-3 flex flex-wrap justify-between items-center gap-2 md:px-4 2xl:gap-4">
                <Link href={'/'} className="font-semibold">
                    Movie<span className="text-blue">Drix</span>
                </Link>
                <div className="2xl:order-3">
                    <MobileNav links={NAV_LINKS} pathname={pathname} handleToggle={handleToggle} isMenuOpen={isMenuOpen} />
                    <DesktopNav links={NAV_LINKS} pathname={pathname}/>
                </div>
                <Searchbar 
                    handleInput={handleInput}
                    handleKeyDown={handleKeyDown}
                    inputValue={inputValue}
                    searchResults={searchResults}
                    handleBlur={handleBlur}
                    handleFocus={handleFocus}
                    isDropdownActive={isDropdownActive}
                    handleReset={handleReset}
                    isLoading={isLoading}
                    debouncedValue={debouncedValue}
                    hasFetched={hasFetched}
                />
            </div>
        </nav>
    )
}
