import Link from "next/link";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
    return (
        <div className="w-full flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center xl:-mt-20">    
                <TbError404 size={160}/>
                <div className="mt-4 flex flex-col items-center gap-4">
                    <h2 className="text-2xl text-center">Oops! The page you are looking for does not exist.</h2>
                    <p className="flex gap-1 ">Go Back to  
                        <Link href="/" className="hover:underline text-blue">Homepage</Link>
                    </p>    
                </div>
            </div>
        </div>
    )
}
