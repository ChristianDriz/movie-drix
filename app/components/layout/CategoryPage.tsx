"use client"

import { Result } from "@/lib/tmdb"
import { useRouter } from "next/navigation";

import MediaGrid from "../ui/MediaGrid";
import Pagination from "../ui/Pagination";
import BreadCrumbs from "../ui/BreadCrumbs";

type Props = {
    results: Result[]; 
    category: string;
    type: string;
    totalPages: number;
    currentPage: number;
}

export default function CategoryPage({ results, totalPages, category, type, currentPage }: Props ) {

    const router = useRouter();
    const handlePageClick = (e: { selected: number }) => {
        const nextPageNumber = e.selected + 1;
        router.push(`/${type}/${category}?page=${nextPageNumber}`);
    };

    return (
        <section className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full flex flex-col">          
            <header className="flex justify-center items-center">
                <h2 className="font-bold text-xl capitalize">{category.replace(/_/g, " ")}</h2>  
            </header> 
            <BreadCrumbs/>
            <MediaGrid  lists={results} type={type} />      
            <Pagination totalPages={totalPages} handlePageClick={handlePageClick} currentPage={currentPage}/>
        </section>
    )
}
