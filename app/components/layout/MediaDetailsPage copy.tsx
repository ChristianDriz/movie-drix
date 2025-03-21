import { getMediaDetails, background_url, poster_url } from "@/lib/tmdb";
import Image from "next/image";

type Props = {
    type: string;
    id: string;
}

export default async function MediaDetailsPage({ type, id } : Props ) {
    
    try {
        const details = await getMediaDetails(type, id);

        return (
            <div className="w-full ">
                <div className="w-full h-full relative ">
                    <Image
                        src={background_url + details.backdrop_path} 
                        alt="poster"
                        width={1920}
                        height={800}
                        className="-z-20 absolute inset-0 w-full h-full object-cover"
                        priority
                    />
                    <div className="-z-10 absolute bg-black/50 w-full h-full"></div>
                    <div className="max-w-5xl 7xl:max-w-7xl mx-auto flex justify-between space-x-10 py-54 ">
                        <div className="w-60  ">
                            <Image 
                                src={poster_url + details.poster_path} 
                                alt="poster"
                                width={500}
                                height={250}
                                className="full object-cover"
                                priority
                            />
                        </div>
                        <div className="text-white w-full">
                            <h1 className="text-4xl font-bold">{details.title || details.name}</h1>
                            <div className="mt-2">
                                <span>Overview:</span>
                                <p className="mt-1">{details.overview}</p>   
                            </div>
                            <div className="mt-2">
                                <p>
                                    <span>
                                        {type === "movie" ? "Release Date: " : "First Air Date: "}
                                    </span>
                                    {details.release_date || details.first_air_date}
                                </p>
                            </div>
                            <ul className="flex mt-2">
                                {details.genres.map((genre, idx) => (
                                    <li key={idx}>
                                        {genre.name}
                                        {idx !== details.genres.length - 1 ? ',\u00A0' : ''}
                                    </li> 
                                ))}
                            </ul>   
                            <p className="mt-4"><span>Tagline: </span>{details.tagline}</p>    
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl 7xl:max-w-7xl mx-auto ">

                </div>
                
            </div>
        )

    } catch(error) {
        console.error(error)
    }

}
