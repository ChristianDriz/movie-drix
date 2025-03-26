import { HOME_SECTIONS, TIME_RANGES } from "./constants/constants";
import { Suspense } from "react";
import { getTrendingMedia, Result } from "@/lib/tmdb";

import TrendingSectionSkeleton from "./components/home/TrendingSectionSkeleton";
import TrendingSection from "./components/home/TrendingSection";
import HeroCarouselSection from "./components/home/HeroCarouselSection";
import HeroCarouselSkeleton from "./components/home/HeroCarouselSkeleton";

export default function Home() {

    return (
        <>  
            <Suspense fallback={<HeroCarouselSkeleton/>}>      
                <HeroCarouselWrapper />
            </Suspense>    

            {HOME_SECTIONS.map((section, index) => (     
                <Suspense key={index} fallback={<TrendingSectionSkeleton/>}>      
                    <HomeCarouselWrapper                     
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

async function HomeCarouselWrapper({ type, title } : Props ) {
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