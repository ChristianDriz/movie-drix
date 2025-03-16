import Image from "next/image";
import Link from "next/link";

import { poster_url } from "@/lib/tmdb";
import { formatDate } from "@/lib/helper";

type Props = {
    handleReset: () => void;
    id: number;
    media_type: string;
    poster_path: string;
    title: string;
    release_date: string;
}

export default function SearchItem(
    { 
        id, 
        media_type, 
        poster_path, 
        title,
        release_date,
        handleReset 
    }
     : Props) {
    return (
        <li className="border-b border-black last:border-none">
            <Link 
                href={`/${media_type}/${id}`} 
                className="flex space-x-3 p-2 hover:bg-black rounded-md"
                onClick={handleReset}
            >
                <div className="w-10 2xl:w-14">
                    <Image 
                        src={poster_url + poster_path} 
                        alt="poster" 
                        width={46} 
                        height={46} 
                        className="w-full h-full object-cover "
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-sm 2xl:text-base text-white">
                        {title}
                    </h2>
                    <div className="flex space-x-1 mt-1 text-xs 2xl:text-sm text-white/60">
                        <span>{formatDate(release_date ?? "")}</span>
                        <span>•</span>
                        <span className="capitalize">{media_type}</span>
                    </div>
                </div>
            </Link>
        </li>
    )
}
