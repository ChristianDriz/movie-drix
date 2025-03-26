"use client"

import { background_url, Result } from "@/lib/tmdb";
import Image from "next/image";
import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
    trendingMedias: Result[];
}

export default function HeroCarouselSection({ trendingMedias } : Props) {

    const [activeMedia, setActiveMedia] = useState<Result>(
        trendingMedias.length > 0 ? trendingMedias[0] : {} as Result);

    return (
        <section className="max-w-7xl mx-auto w-full p-3 md:p-4">
            <Swiper 
                centeredSlides={true}
                // allowTouchMove={false}
                loop={true}
                speed={1000}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                    const activeIndex = swiper.realIndex; // Gets the current active index
                    setActiveMedia(trendingMedias[activeIndex] || {}); // Update center div
                }}
                className="rounded-3xl flex h-60 xl:h-80 2xl:h-100 4xl:h-120 7xl:h-140 overflow-hidden ">
                {trendingMedias.map((trending, index) => (
                    <SwiperSlide key={index} className="min-h-full min-w-full">
                        <Image 
                            src={`${background_url}${trending.backdrop_path}`}
                            alt={trending.name || trending.title || 'movie poster'}
                            width={1920}
                            height={800}
                            className="animate-fade-in rounded-3xl w-full h-full object-cover "
                        />
                    </SwiperSlide>  
                ))}
            </Swiper>
            <div className="-mt-10 xl:-mt-12 relative w-full flex justify-start xl:justify-center ">
                <div className="bg-black pt-2 pr-2 xl:p-3 rounded-tr-2xl xl:rounded-3xl w-42 xl:w-60 relative">    
                    <div className="text-center p-2 xl:px-2 xl:py-3 bg-midnight rounded-xl xl:rounded-2xl ">
                        <h2 className="text-md xl:text-lg font-medium line-clamp-1">{activeMedia.title || activeMedia.name}</h2>
                        <div className="mt-0.5 flex gap-1 justify-center capitalize text-xs xl:text-sm text-white/60 font-light ">
                            <time className="">
                                {activeMedia.first_air_date?.split("-")[0] || activeMedia.release_date?.split("-")[0] }
                            </time>
                            <span>•</span>
                            <span className={`${activeMedia.media_type === 'movie' ? 'capitalize' : 'uppercase'}`}>
                                {activeMedia.media_type}
                            </span>
                        </div>
                    </div>
                    <span className="absolute -top-[12px] -left-[8px] w-5 h-5 bg-transparent rounded-bl-4xl border-l-8 border-b-8 
                        border-black xl:border-l-0 xl:border-r-8 xl:rounded-br-4xl xl:rounded-bl-none xl:w-6 xl:h-6 xl:-left-[16px] xl:top-[32px]"></span>
                    <span className="absolute top-[28px] -right-[12px] w-5 h-5 bg-transparent rounded-bl-4xl border-l-8 border-b-8 
                        border-black xl:w-6 xl:h-6 xl:top-[32px] xl:-right-[16px]"></span>
                </div>
            </div>
        </section>
    )
}
