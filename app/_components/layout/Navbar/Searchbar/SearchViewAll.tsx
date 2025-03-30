import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

type Props = {
    query: string;
    handleReset: () => void;
}

export default function SearchViewAll({ query, handleReset } : Props ) {
    return (
        <div className="pt-2 pb-1">
            <Link 
                href={`/search?query=${encodeURIComponent(query)}`} 
                onClick={handleReset} 
                className="text-white text-sm hover:underline flex items-center justify-center gap-1"
            >
                View All Results
                <FiChevronRight size={16}/>
            </Link>
        </div>
    )
}
