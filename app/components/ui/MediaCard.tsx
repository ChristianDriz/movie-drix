import { Result, poster_url } from "@/lib/tmdb"
import Image from "next/image"
import Link from "next/link"

export default function MediaCard({ id, poster_path, title, media_type, release_date } : Result ) {
    return (
        <Link href={`/${media_type}/${id}`}> 
            <div className="w-full pb-[138%] relative overflow-hidden ">  
                <Image 
                    src={poster_url + poster_path}
                    alt={`${title} || movie poster`}
                    width={175}
                    height={220}
                    priority
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all ease-in"  
                />
                <div className="pointer-events-none absolute inset-0 top-[40%] bg-gradient-to-t from-black from-0% via-black/0 via-40% to-transparent to-40%"></div>
            </div>
            <div className="px-2 py-3 xl:px-3">
                <div className="flex space-x-1 text-[10px] leading-3 md:text-xs xl:text-sm xl:leading-4 capitalize text-white/50">
                    <span className="">
                        {release_date?.split("-")[0]}
                    </span>
                    <span>•</span>
                    <span className="">
                        {media_type}
                    </span>
                </div>
                <div className="mt-2">
                    <h2 className="text-xs md:text-sm leading-3.5 md:leading-4 xl:text-base xl:leading-5 line-clamp-2">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}
