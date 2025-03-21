"use client"

import { useEffect, useState } from "react";
import { getTrendingMedia } from "@/lib/tmdb";
import { Result } from "@/lib/tmdb";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useScroll } from "@/app/hooks/customHook";

import MediaCard from "../ui/MediaCard";
import HomeSkeleton from "../ui/HomeSkeleton";


type Props = {
    type: string;
    title: string;
}

export default function HomeCarouselSection({ type, title } : Props ) {

    const [mediaList, setMediaList] = useState<Result[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [duration, setDuration] = useState<string>('day');
    
    const { containerRef, cardRef, showPrev, showNext, onScroll, handlePrev, handleNext } = useScroll(mediaList);

    useEffect(() => {
        async function fetchTrending() {
            const trendingMedia = await getTrendingMedia(type, duration);
            setMediaList(trendingMedia);
            setIsLoading(false);
        }

        fetchTrending();
    }, [type, duration]);

    const handleDateRangeSelection = (range: "day" | "week") => {
        if (range === "day") {
            setDuration('day');
        } else if (range === "week") {
            setDuration('week');
        }
    }

    return (
        <section className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full relative">
            {isLoading ? (
                <HomeSkeleton />
            ) : (
            <>
                <div className="flex items-center gap-4">
                    <h2 className="font-bold text-lg xl:text-xl capitalize">{title}</h2>
                    {/* Filter by date range */}
                    <div className="flex items-center justify-evenly outline outline-white/10 rounded-full bg-midnight text-white/80 text-xs xl:text-sm relative">
                        <button onClick={() => handleDateRangeSelection("day")} className="z-10 px-2.5 py-1 xl:px-3 rounded-full cursor-pointer ">
                            Today
                        </button>
                        <div className={`absolute h-full w-1/2 rounded-full bg-blue transition-all ${duration === 'day' ? '-translate-x-[25.5px] xl:-translate-x-[29.5px]' : 'translate-x-[26px] xl:translate-x-[31px]'}  `}></div>
                        <button onClick={() => handleDateRangeSelection("week")} className="z-10 px-2.5 py-1 xl:px-3 rounded-full cursor-pointer ">
                            Week
                        </button>
                    </div>
                </div>
                <ul ref={containerRef} onScroll={onScroll} className="scroll-smooth snap-x mt-4 flex gap-2 overflow-x-scroll scrollbar-hide ">       
                    {mediaList.map((list, index) => (
                    <li key={index} ref={index === 0 ? cardRef : null} className="snap-start min-w-28 md:min-w-32 xl:min-w-36 4xl:min-w-40">
                        <MediaCard          
                            id={list.id}
                            poster_path={list.poster_path}
                            title={list.title || list.name}
                            media_type={type === 'search' ? list.media_type : type }
                            release_date={list.first_air_date || list.release_date}
                        />
                    </li>
                    ))}
                    {/* Swiper button */}
                    <button 
                        onClick={handlePrev} 
                        className={`absolute bottom-38 md:bottom-42 left-4 md:left-6 xl:bottom-48 xl:left-8 4xl:bottom-48 p-1 cursor-pointer bg-white/70 rounded-full shadow-xl ${showPrev ? '' : 'hidden'}`}
                    >
                        <FiChevronLeft className="text-black/60 w-6 h-6 xl:w-8 xl:h-8"/>
                    </button>
                    <button 
                        onClick={handleNext} 
                        className={`absolute bottom-38 md:bottom-42 right-4 md:right-6 xl:bottom-48 xl:right-8 4xl:bottom-48 p-1 cursor-pointer bg-white/70 rounded-full shadow-xl ${showNext ? '' : 'hidden'}`}
                    >
                        <FiChevronRight className="text-black/60 w-6 h-6 xl:w-8 xl:h-8"/>
                    </button>                  
                </ul>
            </>
            )}
        </section>
    )
}
