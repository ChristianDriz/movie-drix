import MediaResultPage from "@/app/_components/media/results/MediaResultsPage";
import MediaDetailsPage from "@/app/_components/media/details/MediaDetailsPage";
import MediaSkeleton from "@/app/_components/media/common/MediaSkeleton";

import { MEDIA_TYPES } from "@/app/_components/constants/constants";
import { fetchMediaList, getMediaDetails, getTrendingMedia, poster_url, Result } from "@/lib/tmdb";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ type: string, slug: string }>;
};

type CategoryProps = {
    type: string;
    slug: string;
};

// Generate static paths for trending media and categories
export async function generateStaticParams() {
    // Fetch trending media for each type (movie, tv)
    const trendingResults = await Promise.all(
        MEDIA_TYPES.map(({ name }) => getTrendingMedia(name, 'day'))
    );

    // Extract top trending media IDs for static generation
    const mediaIDParams = trendingResults.flatMap((results, index) =>
        results.slice(0, 1).map((media: Result) => ({
            type: MEDIA_TYPES[index].name, 
            slug: media.id.toString()
        }))
    );

    // Generate category-based static paths
    const categoryParams = MEDIA_TYPES.flatMap(({ name, categories }) => 
        categories.map((category) => ({
            type: name,
            slug: category,
        }))
    );

    return [...categoryParams, ...mediaIDParams];
}

// Extract all categories from MEDIA_TYPES
const ALL_CATEGORIES = MEDIA_TYPES.flatMap((type) => type.categories);

export default async function Page({ params } : Props ) {
    const { type, slug } = await params;
   
    // Check if the slug is an ID (numeric) or a category name
    const isId = /^\d+$/.test(slug);
    const isCategory = ALL_CATEGORIES.includes(slug);

    if (isId) {
        // Render media details page if slug is an ID
        return <MediaDetailsPage type={type} id={slug}/>;
    }
    if (isCategory) {
        // Render media results page with suspense fallback for loading
        return (
            <Suspense fallback={<MediaSkeleton/>}>
                <MediaResultWrapper type={type} slug={slug}  />
            </Suspense>     
        );
    }
    return notFound();
}

// Fetch media list and render MediaResultPage
async function MediaResultWrapper({ type, slug } : CategoryProps) {
    const { results, pages } = await fetchMediaList(type, slug);
    return <MediaResultPage results={results} totalPages={pages} category={slug} type={type}/>;
}

// Generate metadata dynamically based on the media type and slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { type, slug } = await params;
    const isId = /^\d+$/.test(slug);
    const isCategory = ALL_CATEGORIES.includes(slug);

    if (isId) {
        // Fetch movie/TV details to get metadata information
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
        };
    }

    if (isCategory) {
        // Generate metadata for category pages
        return {
            title:  `MovieDrix | ${type.toUpperCase()} - ${slug.replace(/_/g, " ").toUpperCase()}` ,
            description: `Browse ${type}'s in the ${slug.replace(/_/g, " ")} category`
        };
    }

    return { title: "MovieDrix", description: `Explore Movies and TV shows on MovieDrix` };
}