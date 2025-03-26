export const BASE_URL = "https://api.themoviedb.org/3/"
export const poster_url = "https://image.tmdb.org/t/p/w500/"
export const profile_url = "https://media.themoviedb.org/t/p/w138_and_h175_face/"
export const background_url = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/"

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`
    }
};

// Type definitions
export type Result = {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    media_type: string;
    poster_path: string;
    backdrop_path?: string;
    first_air_date?: string;
    release_date?: string;
}

export type MediaDetails = {
    title?: string;
    name?: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    backdrop_path: string;
    poster_path: string;
    genres: { id: number; name: string }[];
    tagline?: string;
    vote_average: number;
    status: string;
    production_companies: { name: string }[];
}

export type MediaCasts = {
    gender: number;
    name: string;
    profile_path: string;
    character: string;
}

export const getTrendingMedia = async (type: string, duration: string) => {

    try {
        const response = await fetch(`${BASE_URL}trending/${type}/${duration}?language=en-US`, 
            { 
                ...options, 
                next: { revalidate: 60 }, // revalidate every 60 seconds
            }
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.error("Trending TV's Error", error);
        return []; 
    }
}


export async function searchMedia (query: string): Promise<{ results: Result[], pages: number }> {

    try {
        let page = 1;
        let filteredList: Result[] = [];
        // let totalResults  = 0;
        let maxFetchPages  = 10; // Default max fetch limit is 10
        let totalFilteredPages = 0;

        while (page <= maxFetchPages ) {
            const response = await fetch(`${BASE_URL}search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`, options);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            const validResults = data.results.filter((item: Result) => filterValidMedia(item, query, true));

            if (page === 1) { 
                // totalResults = data.total_results; // Assign total results only once
                maxFetchPages  = Math.min(10, data.total_pages); // Limit fetches to available pages
            }
            
            filteredList = [...filteredList, ...validResults];
            totalFilteredPages = Math.ceil(filteredList.length / 21); // 21 results per page
            page++
        }
        
        // console.log(`Total filtered results: ${filteredList.length} out of ${Math.min(totalResults, 200)}`);  
        return { results: filteredList, pages: totalFilteredPages };
            
    } catch (error) {
        console.error("Search Error:", error);
        return { results: [], pages: 0 }; 
    }
}

export async function fetchMediaList (type: string, category : string): Promise<{ results: Result[], pages: number }> {

    try {
        let page = 1;
        let filteredList: Result[] = [];
        // let totalResults  = 0;
        let maxFetchPages  = 10; // Default max fetch limit is 10
        let totalFilteredPages = 0;

        while (page <= maxFetchPages ) {
            const response = await fetch(`${BASE_URL}/${type}/${category}?language=en-US&page=${page}`, 
                { 
                ...options, 
                next: { revalidate: 600 }, // revalidate every 10 minutes 
            }
        );

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            const validResults = data.results.filter((item: Result) => filterValidMedia(item));

            if (page === 1) { 
                // totalResults = data.total_results; // Assign total results only once
                maxFetchPages  = Math.min(10, data.total_pages); // Limit fetches to available pages
            }
            
            filteredList = [...filteredList, ...validResults];
            totalFilteredPages = Math.ceil(filteredList.length / 21); // 21 results per page
            page++
        }
        // console.log(`Total filtered results: ${filteredList.length} out of ${Math.min(totalResults, 200)}`);  
        return { results: filteredList, pages: totalFilteredPages };
            
    } catch (error) {
        console.error("Error:", error); 
        return { results: [], pages: 0 }; 
    }
}

export const getMediaDetails = async (type: string, id: string) : Promise<MediaDetails | null> => {

    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}?language=en-US`, { 
            ...options, 
            next: { revalidate: 3600 }, // revalidate every 1 hour
        }
    );
        
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Item Details Error:", error); 
        return null;
    }
    
}

export const getMediaCasts = async (type: string, id: string) : Promise<MediaCasts[]> => {

    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}/credits?language=en-US`, { 
            ...options, 
            next: { revalidate: 3600 }, // revalidate every 1 hour
        }
    );
        if (response.status === 404) return [];
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.cast;

    } catch (error) {
        console.error("Item Details Error:", error); 
        return [];
    }
    
}


// Function to filter the fetched data for movie and tv onyl and if some of them has no image, or no title
export function filterValidMedia( item: Result, query?: string, checkMediaType: boolean = false ) {
    const hasValidType = !checkMediaType || item.media_type === "movie" || item.media_type === "tv";
    const hasImage = Boolean(item.poster_path) && Boolean(item.backdrop_path);
    const hasOverview = item.overview !== "";

    const matchQuery = query ? 
        item.title?.toLowerCase().includes(query.toLowerCase()) || 
        item.name?.toLowerCase().includes(query.toLowerCase()) : true;

    return hasValidType && hasImage && hasOverview && matchQuery;
}