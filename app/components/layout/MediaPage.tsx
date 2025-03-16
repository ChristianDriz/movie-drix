import Link from "next/link";
import MediaGrid from "../ui/MediaGrid";
import { fetchMediaList } from "@/lib/tmdb"
import { FiChevronRight } from "react-icons/fi";

type Props = {
    type: string;
}

export default async function MediaPage({ type } : Props) {
    const categories = type === "movie" ? ["now_playing", "popular", "top_rated", "upcoming"] : ["airing_today", "on_the_air", "popular", "top_rated"];

    const fetchedData = await Promise.all(
        categories.map(category => fetchMediaList(type, category))
    );    

    console.log(type);

    return (     
        <section className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full flex flex-col">
            {categories.map((category, index) => {
            const slicedResults = fetchedData[index].results.slice(0, 14);
                return (
                    <div key={index} className="grow mb-6 border-b border-midnight last:border-none">   
                        <header className="flex justify-between items-center">
                            <h2 className="font-bold text-xl capitalize">{category.replace(/_/g, " ")}</h2>
                            <Link 
                                href={`/${type}/${category}`} 
                                className="hover:underline flex items-center gap-1 text-sm/[16px] text-white/70"
                            >
                                View all 
                                <FiChevronRight />
                            </Link>
                        </header> 
                        <MediaGrid lists={slicedResults} type={type} />
                    </div>
                )
            })}  
        </section>
    )
}
