import { getMediaDetails, background_url, poster_url, getMediaCasts } from "@/lib/tmdb";
import { formatDate } from "@/lib/helper";
import Image from "next/image";
import MediaDetailsCast from "./MediaDetailsCast";
import { notFound } from "next/navigation";

type Props = {
    type: string;
    id: string;
}


export default async function MediaDetailsPage({ type, id } : Props ) {
    
    const [details, casts] = await Promise.all([
        getMediaDetails(type, id),
        getMediaCasts(type, id)
    ]); 

    //will return 404 if media details is not found
    if (!details) {
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto p-3 w-full">
            <div className="relative -z-10">
                <Image 
                    src={background_url + details.backdrop_path} 
                    alt="backdrop-poster"
                    width={1920}
                    height={800}
                    className="rounded-2xl object-cover h-80 4xl:h-120"
                    priority
                />
                <div className="flex items-end absolute bottom-0 left-0">             
                    <div className="w-36 relative pt-3 pr-3 rounded-tr-3xl bg-black 4xl:w-50">             
                        <Image 
                            src={poster_url + details.poster_path} 
                            alt="poster"
                            width={250}
                            height={500}
                            className="w-full h-full object-cover rounded-3xl"
                            priority
                        />
                        <div className="absolute top-3 right-3 pl-3 pb-3 bg-black rounded-bl-3xl">
                            <p className=" bg-blue rounded-xl w-8 h-8 flex items-center justify-center text-xs ">
                                {Math.round(details.vote_average * 10) / 10}
                            </p>
                        </div>
                        <span className="absolute -top-[26px] -left-[10px] w-9 h-9 bg-transparent rounded-bl-4xl border-l-10 border-b-10 border-black"></span>
                        <span className="absolute top-[2px] right-[46px] w-8 h-8 bg-transparent rounded-tr-3xl border-t-10 border-r-10 border-black"></span>
                        <span className="absolute top-[46px] right-0.5 w-8 h-8 bg-transparent rounded-tr-3xl border-t-10 border-r-10 border-black"></span>
                    </div>
                    <div className="relative flex-1 pt-3 pr-3 rounded-tr-3xl bg-black">
                        <div className="bg-midnight p-3 rounded-2xl text-center ">
                            <h2 className="line-clamp-2 font-bold text-white text-lg 4xl:text-xl">{details.title || details.name}</h2>
                            <p className="text-xs text-white/70">
                                <span>
                                    {type === "movie" ? "Release Date: " : "First Air Date: "}
                                </span>
                                {formatDate(details.release_date ?? "") || formatDate(details.first_air_date ?? "")}
                            </p>
                        </div>
                        <span className="absolute -top-[22.5px] -left-[10px] w-8 h-8 bg-transparent rounded-bl-4xl border-b-10 border-l-10 border-black"></span>
                        <span className="absolute -bottom-[10px] -right-5.5 w-8 h-8 bg-transparent rounded-bl-4xl border-b-10 border-l-10 border-black"></span>
                    </div>
                </div>
            </div>
            <div className="mt-3 rounded-3xl flex flex-col gap-3 xl:block xl:bg-midnight xl:p-2">
                <div className="bg-midnight px-4 py-3 rounded-3xl">
                    <h4 className="font-bold">Overview</h4>
                    <p className="mt-1 text-white/70 text-sm 4xl:text-base/5">{details.overview}</p>
                </div>
                <div className="bg-midnight px-4 py-3 rounded-3xl grid gap-3 xl:grid-cols-2">                     
                    <div id="genre">                             
                        <h4 className="font-bold">Genre</h4>
                        <ul className="flex flex-wrap text-white/70 text-sm 4xl:text-base/5 ">
                            {details.genres.map((genre, idx) => (
                                <li key={idx} >
                                    {genre.name}
                                    {idx !== details.genres.length - 1 ? ',\u00A0' : ''}
                                </li> 
                            ))}
                        </ul> 
                    </div>    
                    {details.tagline && (
                    <div id="tagline">
                        <h4 className="font-bold">Tagline</h4>
                        <p className=" text-white/70 text-sm 4xl:text-base/5">{details.tagline}</p> 
                    </div>
                    )} 
                    <div id="status">    
                        <h4 className="font-bold">Status</h4>
                        <p className=" text-white/70 text-sm 4xl:text-base/5">{details.status}</p> 
                    </div>
                    <div id="production">
                        <h4 className="font-bold">Production</h4>
                        <ul className="flex flex-wrap text-white/70 text-sm 4xl:text-base/5 ">
                            {details.production_companies.map((production, idx) => (
                                <li key={idx} >
                                    {production.name}
                                    {idx !== details.production_companies.length - 1 ? ',\u00A0' : ''}
                                </li> 
                            ))}
                        </ul> 
                    </div>  
                        
                </div>                
            </div>   
            {casts.length !== 0 ? <MediaDetailsCast castList={casts}/> : null}          
        </div>
    )
}
