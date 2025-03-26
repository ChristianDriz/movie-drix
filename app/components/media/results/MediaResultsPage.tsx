"use client"

import { Result } from "@/lib/tmdb"
import { useRouter } from "next/navigation";

import MediaGrid from "../common/MediaGrid";
import Pagination from "../../ui/PaginationButton";
import BreadCrumbs from "../../ui/BreadCrumbs";

type Props = {
    results: Result[]; 
    category?: string;
    type: string;
    query?: string;
    totalPages: number;
    currentPage: number;    
}

export default function MediaResultPage({ results, query, totalPages, category, type, currentPage }: Props ) {

    const router = useRouter();
    const handlePageClick = (e: { selected: number }) => {
        const nextPageNumber = e.selected + 1;
        router.push(type === 'search' ? `/search?query=${query}&page=${nextPageNumber}` : `/${type}/${category}?page=${nextPageNumber}`);
    };

    return (
        <section className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full flex-1 flex flex-col ">          
            <header className={`flex ${type !== 'search' ? "justify-center items-center" : ""} `}>
                <h2 className="font-semibold text-xl capitalize mb-3">
                    {type === 'search' ? <>Search Results for: <span className="italic text-blue normal-case">{query}</span></> : category?.replace(/_/g, " ")}
                </h2>  
            </header> 
            {category && <BreadCrumbs/> }
            {type === 'search' && results.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">No luck! Maybe try a different keyword?</div>
            ) : (
                <>
                    <MediaGrid  lists={results} type={type} />      
                    <Pagination totalPages={totalPages} handlePageClick={handlePageClick} currentPage={currentPage}/>
                </>
            )}
        </section>
    )
}

