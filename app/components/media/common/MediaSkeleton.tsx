

export default function MediaSkeleton({ }) {
    return (
        <section className="px-2 py-4 md:px-4 max-w-7xl mx-auto w-full">   
            <div className="flex justify-between items-center grow animate-pulse">
                <div className='h-7 w-40 bg-midnight'></div>
                <div className='h-4 w-16 bg-midnight'></div>
            </div> 
            <ul className="flex-1 grid grid-cols-3 gap-2 mt-4 lg:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6 7xl:grid-cols-7">   
                {[...Array(14)].map((_, index) => (
                    <li key={index} className="animate-pulse">
                        <div className='w-full pb-[138%] bg-midnight '></div>
                        <div className='py-3'>
                            <div className='w-[70%] h-3 xl:h-4 bg-midnight '></div>
                            <div className='mt-2 h-3.5 xl:h-6 bg-midnight '></div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
