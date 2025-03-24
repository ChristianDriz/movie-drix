import { MediaCasts, profile_url } from "@/lib/tmdb"
import Image from "next/image";

type Props = {
    castList: MediaCasts[];
}

export default function MediaDetailsCast({ castList } : Props ) {

    return (
        <div className="mt-3 w-full">
            <h3 className="font-bold text-xl">Casts</h3> 
            <ul className='mt-2 flex gap-2 overflow-x-scroll scroll-smooth snap-x scrollbar-thin'>
                {castList.map((cast, index) => (
                    <li key={index} className="snap-start w-22 xl:w-28 ">
                        <div className="min-w-22 xl:min-w-28 pb-[120%] relative rounded-xl overflow-hidden ">
                            <Image 
                                src={cast.profile_path ? profile_url + cast.profile_path : cast.gender === 1? "/default_profile_women.svg" : "/default_profile_men.svg"} 
                                alt={cast.name} 
                                width={138} 
                                height={175}
                                className="absolute inset-0 w-full h-full object-cover bg-white/50 rounded-xl hover:scale-105 transition-all ease-in"
                            />
                            <div className="pointer-events-none absolute inset-0 top-[40%] bg-gradient-to-t from-black from-0% via-black/0 via-40% to-transparent to-40%"></div>
                        </div>
                        <div className="py-2">
                            <h4 className="text-xs font-bold">{cast.name}</h4>
                            <p className="text-xs text-white/80">{cast.character}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
