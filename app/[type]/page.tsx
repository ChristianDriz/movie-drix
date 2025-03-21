import { notFound } from "next/navigation";
import { searchMedia } from "@/lib/tmdb";

import MediaResultPage from "../components/layout/MediaResultsPage";
import MediaCategoryList from "../components/layout/MediaCategoryList";

type Props = {
    params: Promise<{ type: string }>;
    searchParams: Promise<{ query: string, page?: number }>;
}

export default async function Page({ params, searchParams }: Props) {

    const { type } = await params;
    const { query, page } = await searchParams; 
    const currentPage  = page ? page : 1; 

    if (type === "search") { 
        const { results, pages } = await searchMedia(query);

        const startIndex = (currentPage - 1) * 21;
        const endIndex = startIndex + 21;
        const paginatedResults = results.slice(startIndex, endIndex);
        
        return <MediaResultPage results={paginatedResults} totalPages={pages} query={query} currentPage={currentPage} type={type} />
    }

    if (type === "movie" || type === "tv") {
        return <MediaCategoryList type={type}/>         
    }

    return notFound();
}
