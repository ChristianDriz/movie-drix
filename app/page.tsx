import { HOME_SECTIONS, TIME_RANGES } from "./_components/constants/constants";
import { Suspense } from "react";
import { getTrendingMedia, Result } from "@/lib/tmdb";

import TrendingSectionSkeleton from "./_components/home/TrendingSectionSkeleton";
import TrendingSection from "./_components/home/TrendingSection";
import HeroCarouselSection from "./_components/home/HeroCarouselSection";
import HeroCarouselSkeleton from "./_components/home/HeroCarouselSkeleton";

export default function Page() {
    return (
        <>  
            <Suspense fallback={<HeroCarouselSkeleton/>}>      
                <HeroCarouselWrapper />
            </Suspense>    

            {HOME_SECTIONS.map((section, index) => (     
                <Suspense key={index} fallback={<TrendingSectionSkeleton/>}>      
                    <TrendingSectionWrapper                     
                        type={section.type} 
                        title={section.title} 
                    />
                </Suspense>    
            ))}
        </>
    );
}

type Props = {
    type: string;
    title: string;
}

async function HeroCarouselWrapper() {
    const trendingMedias: Result[] = [];
    for (const section of HOME_SECTIONS) {
        const data = await getTrendingMedia(section.type, TIME_RANGES.DAY);
        trendingMedias.push(...data.slice(0, 5));
    }
    return <HeroCarouselSection trendingMedias={trendingMedias} />;
}

async function TrendingSectionWrapper({ type, title } : Props ) {
    try {
        const [day, week] = await Promise.all([
            getTrendingMedia(type, TIME_RANGES.DAY),
            getTrendingMedia(type, TIME_RANGES.WEEK)
        ]);
        
        const mediaLists = { day, week };

        return (
            <TrendingSection type={type} title={title} initialMediaLists={mediaLists} />     
        )

    } catch(error) {
        console.error(error);
    }    
}
 