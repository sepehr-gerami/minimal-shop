"use client"
import Link from 'next/link'
import { useState } from 'react'


function LoginAccount() {
    const [active, setActive] = useState(false);
    return (


        <Link
            href="/auth"
            onClick={() => setActive(true)}
            className={`flex items-center gap-1 sm:text-sm p-2 md:font-medium rounded-2xl transition-all duration-300 ease-out
    ${active
                    ? "bg-gray-200 scale-105"
                    : "hover:bg-gray-200 hover:scale-105"
                }`}
        >
            <i className="bi bi-person text-xl md:text-2xl sm:text-xl"></i>
            Account
        </Link>
    )
}

export default LoginAccount