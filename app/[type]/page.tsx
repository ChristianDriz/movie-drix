import { notFound } from "next/navigation";
import { searchMedia } from "@/lib/tmdb";
import { Suspense } from "react";
import { Metadata } from "next";
import { MOVIE_CATEGORIES, TV_CATEGORIES } from "../constants/constants";

import MediaResultPage from "../components/media/results/MediaResultsPage";
import MediaCategoryList from "../components/media/category/MediaCategoryList";
import MediaSkeleton from "../components/media/common/MediaSkeleton";


type Props = {
    params: Promise<{ type: string }>;
    searchParams: Promise<{ query: string, page?: number }>;
}

export default async function Page({ params, searchParams }: Props) {

    const { type } = await params;
    const { query, page } = await searchParams; 
    const currentPage  = page ? page : 1; 

    if (type === "search") { 
        if (!query) return notFound();

        const { results, pages } = await searchMedia(query);

        const startIndex = (currentPage - 1) * 21;
        const endIndex = startIndex + 21;
        const paginatedResults = results.slice(startIndex, endIndex);
        
        return <MediaResultPage results={paginatedResults} totalPages={pages} query={query} currentPage={currentPage} type={type} />
    }

    if (type === "movie" || type === "tv") {
        const categories = type === "movie" ? MOVIE_CATEGORIES : TV_CATEGORIES;
        return (
            <>
            {categories.map((category) => (
                <Suspense key={category} fallback={<MediaSkeleton />}>
                    <MediaCategoryList type={type} category={category}/>
                </Suspense>
            ))}
            </>
        )        
    }

    return notFound();
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { type } = await params;
    const { query } = await searchParams; 

    if (type === "search") {
        return {
            title: `MovieDrix | Search - ${query || "Results"}`, 
            description: `Search results for "${query || "your favorite movies and TV shows"}"`,
        }
    } 
    
    if (type === "movie" || type === "tv") {
        return {
            title: `MovieDrix | ${type.toUpperCase()} `, 
            description: `Browse ${type === "movie" ? "Movie" : "TV"} categories on MovieDrix.`,
        }
    }

    return { title: `MovieDrix`, description: `Explore Movies and TV shows on MovieDrix` }
}