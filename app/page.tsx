import { HOME_SECTIONS, TIME_RANGES } from "./constants/constants";
import { Suspense } from "react";
import { getTrendingMedia } from "@/lib/tmdb";

import HomeSkeleton from "./components/home/HomeSkeleton";
import HomeCarouselPage from "./components/home/HomeCarouselPage";

export default function Home() {

    return (
        <>
            {HOME_SECTIONS.map((section, index) => (     
                <Suspense key={index} fallback={<HomeSkeleton/>}>      
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

async function HomeCarouselWrapper({ type, title } : Props ) {
    try {
        const [day, week] = await Promise.all([
            getTrendingMedia(type, TIME_RANGES.DAY),
            getTrendingMedia(type, TIME_RANGES.WEEK)
        ]);
        
        const mediaLists = { day, week };

        return (
            <HomeCarouselPage type={type} title={title} initialMediaLists={mediaLists} />     
        )

    } catch(error) {
        console.error(error);
    }    
}

