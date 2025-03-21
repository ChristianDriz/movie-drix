import MediaResultPage from "@/app/components/layout/MediaResultsPage";
import MediaDetailsPage from "@/app/components/layout/MediaDetailsPage";
import { fetchMediaList  } from "@/lib/tmdb";

type Props = {
    params: Promise<{ type: string, slug: string }>;
    searchParams: Promise<{ page: number }>;
}

export default async function page({ params, searchParams } : Props ) {

    const { type, slug } = await params;
    const { page } = await searchParams;
    const currentPage  = page ? page : 1; 

    const isId = /^\d+$/.test(slug);

    if (isId) {
        return <MediaDetailsPage type={type} id={slug}/>
    } else {
        const { results, pages } = await fetchMediaList(type, slug);

        const startIndex = (currentPage - 1) * 21;
        const endIndex = startIndex + 21;
        const paginatedResults = results.slice(startIndex, endIndex);

        return <MediaResultPage results={paginatedResults} totalPages={pages} currentPage={currentPage} category={slug} type={type}/>
    }
    
}
