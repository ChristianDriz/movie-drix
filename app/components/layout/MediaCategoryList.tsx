import Link from "next/link";
import MediaGrid from "../ui/MediaGrid";
import { fetchMediaList } from "@/lib/tmdb"
import { FiChevronRight } from "react-icons/fi";

type Props = {
    type: string;
}

export default async function MediaCategoryList({ type } : Props) {
    const categories = type === "movie" ? ["now_playing", "popular", "top_rated", "upcoming"] : ["airing_today", "on_the_air", "popular", "top_rated"];

    try {
        const fetchedData = await Promise.all(
            categories.map(category => fetchMediaList(type, category))
        );    

        return (     
            <>
                {categories.map((category, index) => {
                const slicedResults = fetchedData[index].results.slice(0, 14);
                    return (
                        <section key={index} className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full">   
                            <header className="flex justify-between items-center grow">
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
                        </section>
                    )
                })}  
            </>
        )        
    } catch {
        return <div>Failed to load media list</div>
    }
}
