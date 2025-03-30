"use client";

import { Result } from "@/lib/tmdb";
import { useRouter, useSearchParams } from "next/navigation";

import MediaGrid from "../common/MediaGrid";
import Pagination from "../../ui/PaginationButton";
import BreadCrumbs from "../../ui/BreadCrumbs";

type Props = {
    results: Result[];
    category?: string;
    type: string;
    query?: string;
    totalPages: number;
};

export default function MediaResultPage({ results, query, totalPages, category, type }: Props) {
    const page = useSearchParams();
    
    // Get the 'page' query parameter and convert it to a number. Defaults to 1 if not present.
    const currentPage = Number(page.get("page")) || 1;

    // Calculate start and end index for pagination (21 items per page).
    const startIndex = (currentPage - 1) * 21;
    const endIndex = startIndex + 21;
    
    // Slice the results array to get only the items for the current page.
    const paginatedResults = results.slice(startIndex, endIndex);
    
    const router = useRouter();
    
    // Handle pagination click event and update the URL with the new page number.
    const handlePageClick = (e: { selected: number }) => {
        const nextPageNumber = e.selected + 1;
        router.push(type === 'search' 
            ? `/search?query=${query}&page=${nextPageNumber}` 
            : `/${type}/${category}?page=${nextPageNumber}`);
    };

    return (
        <section className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full flex-1 flex flex-col">      
            <header className={`flex ${type !== 'search' ? "justify-center items-center" : ""}`}>
                <h2 className="font-semibold text-xl capitalize mb-3">
                    {type === 'search' 
                        ? <>Search Results for: <span className="italic text-blue normal-case">{query}</span></> 
                        : category?.replace(/_/g, " ")}
                </h2>  
            </header> 
            
            {/* Render breadcrumbs if category exists */}
            {category && <BreadCrumbs />} 
            
            {/* Show message if no results found for search */}
            {type === 'search' && results.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">No luck! Maybe try a different keyword?</div>
            ) : (
                <>
                    {/* Display paginated media results */}
                    <MediaGrid lists={paginatedResults} type={type} />      
                    
                    {/* Pagination controls */}
                    <Pagination totalPages={totalPages} handlePageClick={handlePageClick} currentPage={currentPage} />
                </>
            )}
        </section>
    );
}
