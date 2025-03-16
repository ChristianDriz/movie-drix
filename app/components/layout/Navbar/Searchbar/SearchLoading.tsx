import { AiOutlineLoading } from "react-icons/ai";

export default function SearchLoading() {
    return (
        <div className="flex justify-center items-center gap-2 p-4">
            <AiOutlineLoading className="animate-spin text-blue"/>
            <p>Loading...</p>
        </div>
    )
}
