
import HomeCarouselSection from "./components/layout/HomeCarouselSection";

export default function Home() {

    return (
        <>
            <HomeCarouselSection type="movie" title="Trending Movies" />
            <HomeCarouselSection type="tv" title="Trending TV Shows" />
        </>
    );
  
}
