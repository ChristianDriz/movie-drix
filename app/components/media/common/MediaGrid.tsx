import MediaCard from "./MediaCard";
import { Result } from "@/lib/tmdb";

type Props = {
    lists: Result[];
    type: string;
}

export default function MediaGrid({ lists, type } : Props ) {

    return (
        <ul className="flex-1 grid grid-cols-3 gap-2 mt-4 lg:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6 7xl:grid-cols-7">   
        {lists.map((list, idx) => (
            <li key={idx} >
                <MediaCard 
                    id={list.id}
                    poster_path={list.poster_path}
                    title={list.title || list.name}
                    media_type={type === 'search' ? list.media_type : type }
                    release_date={list.first_air_date || list.release_date}
                />
            </li>
        ))}
        </ul>
    )
}
