"use client"

import { Result } from "@/lib/tmdb";
import { useRouter } from "next/navigation";

import MediaCard from "../ui/MediaCard"
import Pagination from "../ui/Pagination";

type Props = {
    results: Result[];
    totalPages: number;
    query: string;
    currentPage: number;
}

export default function SearchPage({ results, totalPages, query, currentPage } : Props ) {

    const router = useRouter();

    const handlePageClick = (e: { selected: number }) => {
        const nextPageNumber = e.selected + 1;
        router.push(`/search?query=${query}&page=${nextPageNumber}`);
    };

    return (
        <div className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full flex flex-col ">
            <header>
                <h2 className="font-bold text-xl">Search Results for: <span className="italic text-blue">{query}</span></h2>
            </header>
            {results.length > 0 ? (   
            <div className="mt-4 ">
                <article className="grid grid-cols-3 gap-2 lg:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6 7xl:grid-cols-7">           
                {results.map((result, idx) => (
                    <MediaCard 
                        key={idx} 
                        id={result.id}
                        poster_path={result.poster_path}
                        title={result.title || result.name}
                        media_type={result.media_type}
                        release_date={result.first_air_date || result.release_date}
                    />
                ))}
                </article>
                <Pagination totalPages={totalPages} handlePageClick={handlePageClick} currentPage={currentPage}/>
            </div>
            ) : (
            <div className="grow flex items-center justify-center">No luck! Maybe try a different keyword?</div>
            )}
        </div>
    )

}
