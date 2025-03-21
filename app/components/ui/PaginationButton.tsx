"use client"

import ReactPaginate from "react-paginate";

type Props = {
    totalPages: number;
    currentPage: number;
    handlePageClick: (e: { selected: number }) => void;
}

export default function Pagination({ totalPages, handlePageClick, currentPage } : Props ) {

    return (
        <nav className="flex flex-col items-center xl:items-end gap-4 my-10 ">
            <ReactPaginate
                previousLabel="Prev"
                nextLabel="Next"
                breakLabel="..."
                pageCount={totalPages}
                marginPagesDisplayed={1} 
                pageRangeDisplayed={3} 
                onPageChange={handlePageClick}
                forcePage={currentPage - 1}
                containerClassName="flex gap-1"
                pageLinkClassName=" px-2 py-1 cursor-pointer"
                previousLinkClassName=" px-2 py-1 "
                nextLinkClassName=" px-2 py-1 "
                activeLinkClassName="bg-blue rounded-sm"
                previousClassName={currentPage == 1 ? "opacity-50 " : "cursor-pointer"}
                nextClassName={currentPage == totalPages ? "opacity-50 " : "cursor-pointer"}
            />
        </nav>
    )
}
