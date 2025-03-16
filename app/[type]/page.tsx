import { notFound } from "next/navigation";
import { searchMedia } from "@/lib/tmdb";

import SearchPage from "../components/layout/SearchPage";
import MediaPage from "../components/layout/MediaPage";

type Props = {
    params: { type: string };
    searchParams: { query: string, page?: number };
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

        return <SearchPage results={paginatedResults} totalPages={pages} query={query} currentPage={currentPage}/>
    }

    if (type === "movie" || type === "tv") {
        return <MediaPage type={type}/>         
    }

    return notFound();
}
