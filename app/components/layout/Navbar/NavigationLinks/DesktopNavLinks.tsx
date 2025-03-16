import Link from "next/link"

type Props = {
    links: {name: string, href: string}[];
    pathname: string;
}

export default function DesktopNav({ links, pathname } : Props ) {

    return (
        <ul className="hidden xl:flex ">
            {links.map((link, index) => (
            <li key={index}>
                <Link 
                    href={link.href} 
                    className={`p-2 rounded-sm cursor-pointer hover:bg-black ${pathname === link.href ? 'text-blue' : 'text-white'}`}
                >
                    {link.name}
                </Link>
            </li>
            ))}        
        </ul>
    )
}
