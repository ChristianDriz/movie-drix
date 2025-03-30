import { Suspense } from "react";
import { Metadata } from "next";
import { MEDIA_TYPES } from "../_components/constants/constants";

import MediaCategoryList from "../_components/media/category/MediaCategoryList";
import MediaSkeleton from "../_components/media/common/MediaSkeleton";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ type: string }>
};

// Generate static paths for the media types (movie, tv)
export async function generateStaticParams() {
    return MEDIA_TYPES.map(({ name }) => ({ type: name }));
}

export default async function Page({ params }: Props) {
    // Extract the type parameter from the route
    const { type } = await params;
    
    // Check if the type is a valid media type (movie or tv)
    const isValidType = MEDIA_TYPES.find((media_type) => media_type.name === type)?.name;
    const categories = MEDIA_TYPES.find((media_type) => media_type.name === type)?.categories;
    
    // Show a 404 page if the type is not valid
    if (!isValidType) return notFound();

    return (
        <>
            {/* Render categories with suspense for loading fallback */}
            {categories?.map((category) => (
                <Suspense key={category} fallback={<MediaSkeleton />}>
                    <MediaCategoryList type={type} category={category} />
                </Suspense>
            ))}
        </>
    );        
}

// Generate metadata dynamically based on the media type
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { type } = await params;    
    return {
        title: `MovieDrix | ${type.toUpperCase()} `, 
        description: `Browse ${type === "movie" ? "Movie" : "TV"} categories on MovieDrix.`,
    };
}
