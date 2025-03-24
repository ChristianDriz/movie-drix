import MediaResultPage from "@/app/components/media/results/MediaResultsPage";
import MediaDetailsPage from "@/app/components/media/details/MediaDetailsPage";
import MediaSkeleton from "@/app/components/media/common/MediaSkeleton";

import { MOVIE_CATEGORIES, TV_CATEGORIES } from "@/app/constants/constants";
import { fetchMediaList, getMediaDetails, poster_url  } from "@/lib/tmdb";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ type: string, slug: string }>;
    searchParams: Promise<{ page: number }>;
}

export default async function page({ params, searchParams } : Props ) {

    const { type, slug } = await params;
    const { page } = await searchParams;
    const currentPage  = page ? page : 1; 

    const isId = /^\d+$/.test(slug);
    const isCategory = [...MOVIE_CATEGORIES, ...TV_CATEGORIES].includes(slug);

    if (isId) return <MediaDetailsPage type={type} id={slug}/>
    if (isCategory) {
        return (
            <Suspense fallback={<MediaSkeleton/>}>
                <MediaResultWrapper type={type} slug={slug} currentPage={currentPage} />
            </Suspense>
        )
    }
    return notFound();
}

type CategoryProps = {
    type: string;
    slug: string;
    currentPage: number;
}

async function MediaResultWrapper({ type, slug, currentPage } : CategoryProps) {

    const { results, pages } = await fetchMediaList(type, slug);

    const startIndex = (currentPage - 1) * 21;
    const endIndex = startIndex + 21;
    const paginatedResults = results.slice(startIndex, endIndex);

    return <MediaResultPage results={paginatedResults} totalPages={pages} currentPage={currentPage} category={slug} type={type}/>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { type, slug } = await params;
    const isId = /^\d+$/.test(slug);
    const isCategory = [...MOVIE_CATEGORIES, ...TV_CATEGORIES].includes(slug);

    if (isId) {
        // Fetch movie/TV details to get the title
        const media = await getMediaDetails(type, slug);

        const title = media?.title || media?.name;
        const description = media?.overview;
        const posterImage = `${poster_url}${media?.poster_path}`;

        return {
            title:  `MovieDrix | ${type.toUpperCase()} - ${title}` ,
            description,
            openGraph: {
                title: `MovieDrix | ${type.toUpperCase()} - ${title}` ,
                description,
                url: `https://movie-drix.vercel.app/${type}/${slug}`,
                type: "website",
                images: [
                    {
                        url: posterImage,
                        width: 250,
                        height: 500,
                        alt: "Movie Poster",
                    },
                ],
            },
        }
    }

    if (isCategory) {
        return {
            title:  `MovieDrix | ${type.toUpperCase()} - ${slug.replace(/_/g, " ").toUpperCase()}` ,
            description: `Browse ${type}'s in the ${slug.replace(/_/g, " ")} category`
        }
    }

    return { title: "MovieDrix", description: `Explore Movies and TV shows on MovieDrix` }
}