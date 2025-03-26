import Link from "next/link";
import MediaGrid from "../common/MediaGrid";
import { fetchMediaList } from "@/lib/tmdb"
import { FiChevronRight } from "react-icons/fi";

type Props = {
    type: string;
    category: string;
}

export default async function MediaCategoryList({ type, category } : Props) {
    
    try {
        const { results } = await fetchMediaList(type, category);

        return (         
            <section className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full">   
                <header className="flex justify-between items-center grow">
                    <h2 className="font-semibold text-xl capitalize">{category.replace(/_/g, " ")}</h2>
                    <Link 
                        href={`/${type}/${category}`} 
                        className="hover:underline flex items-center gap-1 text-sm/[16px] text-white/70 font-light"
                    >
                        View all 
                        <FiChevronRight />
                    </Link>
                </header> 
                <MediaGrid lists={results.slice(0, 14)} type={type} />
            </section>
        )        
    } catch {
        return <div className="max-w-7xl mx-auto flex items-center justify-center h-full">Failed to load media list</div>
    }
}
