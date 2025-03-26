import { Result, poster_url } from "@/lib/tmdb"
import Image from "next/image"
import Link from "next/link"

export default function MediaCard({ id, poster_path, title, media_type, release_date } : Result ) {
    return (
        <Link href={`/${media_type}/${id}`}> 
            <figure className="w-full pb-[138%] relative overflow-hidden rounded-xl">  
                <Image 
                    src={poster_url + poster_path}
                    alt={`${title} || movie poster`}
                    width={175}
                    height={220}
                    priority
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all ease-in rounded-xl"  
                />
                <div className="pointer-events-none absolute inset-0 top-[40%] bg-gradient-to-t from-black from-0% via-black/0 via-40% to-transparent to-40%"></div>
            </figure>
            <div className="py-3">
                <div className="flex space-x-1 text-[10px] leading-3 md:text-xs xl:text-sm xl:leading-4 capitalize text-white/60 font-light">
                    <time className="">
                        {release_date?.split("-")[0]}
                    </time>
                    <span>•</span>
                    <span className="">
                        {media_type}
                    </span>
                </div>
                <div className="mt-2">
                    <h3 className="font-light text-white/90 text-xs md:text-sm leading-3.5 md:leading-4 xl:text-base xl:leading-5 line-clamp-2 pr-2">
                        {title}
                    </h3>
                </div>
            </div>
        </Link>
    )
}
