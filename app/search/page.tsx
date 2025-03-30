import { notFound } from "next/navigation";
import { searchMedia } from "@/lib/tmdb";
import { Metadata } from "next";
import MediaResultPage from "../_components/media/results/MediaResultsPage";

type Props = {
    searchParams: Promise<{ query?: string, page?: number }>
}

export default async function Page({ searchParams }: Props) {
    const { query, page } = await searchParams; 
    const currentPage  = page ? page : 1; 

    if (!query) return notFound();

    const { results, pages } = await searchMedia(query);

    const startIndex = (currentPage - 1) * 21;
    const endIndex = startIndex + 21;
    const paginatedResults = results.slice(startIndex, endIndex);
    
    return (
        <MediaResultPage 
            results={paginatedResults} 
            totalPages={pages} 
            query={query} 
            type={'search'} 
        />
    )
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { query } = await searchParams; 

    return {
        title: `MovieDrix | Search - ${query || "Results"}`, 
        description: `Search results for "${query || "your favorite movies and TV shows"}"`,
    }

}

