"useclietn"
import React from 'react'
export default function TopHeader() {
    return (
        <>
       <section className="relative flex flex-col md:flex-row items-center justify-between bg-[#FE8A00] text-white px-4 py-2 md:h-12 w-full">
                
            
                <button className="flex items-center gap-2 font-semibold cursor-pointer text-sm md:text-base whitespace-nowrap order-2 md:order-1 mt-2 md:mt-0">
                    <i className="bi bi-telephone"></i>
                    <span>+91 (720) 090 1896</span>
                </button>

               
                <h2 className="text-center text-xs sm:text-sm md:text-base font-semibold order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2 whitespace-nowrap">
                    Get 50% Off on Selected Items | <span className="underline cursor-pointer">Shop Now</span>
                </h2>

            </section>
        </>
    )
}
