
export const NAV_LINKS = [
    {
        name: 'Home', 
        href: '/'
    },
    {   name: 'Movies', 
        href: '/movie'
    },
    {   name: 'TV Shows', 
        href: '/tv'
    }
]

export const MEDIA_TYPES = [
    {
        name: 'movie',
        categories: [ "now_playing", "popular", "top_rated", "upcoming" ]
    },
    {
        name: 'tv',
        categories: [ "airing_today", "on_the_air", "popular", "top_rated" ]
    }
]

export const HOME_SECTIONS = [
    { 
        type: "movie", 
        title: "Trending Movies" 
    },
    { 
        type: "tv", 
        title: "Trending TV Shows" 
    }
]

export const TIME_RANGES = {
    DAY: "day",
    WEEK: "week"
}

