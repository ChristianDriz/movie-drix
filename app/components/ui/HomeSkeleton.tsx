import React from 'react'

export default function HomeSkeleton() {

    const count = 10; 

    return (
        <>
            <div className='w-56 h-7 bg-midnight animate-pulse'></div>
            <ul className="my-4 flex gap-2 overflow-hidden">
                {Array.from({ length: count }).map((_, index) => (
                    <li key={index} className="min-w-28 md:min-w-32 xl:min-w-36 4xl:min-w-40 animate-pulse">
                        <div className='w-full h-[155px] md:h-[176px] xl:h-[199px] 4xl:h-[220px] bg-midnight '></div>
                        <div className='py-3'>
                            <div className='w-[70%] h-3 xl:h-4 bg-midnight '></div>
                            <div className='mt-2 h-3.5 xl:h-6 bg-midnight '></div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
