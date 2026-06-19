"use client"

import Link from 'next/link';
import { useState } from 'react';



export default function BackHome() {
    const [active, setActive] = useState(false);
    return (
        <Link
            href="/"
            onClick={() => setActive(true)}
            className={` inline-block px-2 mx-4 py-2 mt-4 rounded-2xl bg-gray-200 transition-all duration-300 ease-out
    ${active
                    ? "bg-gray-200 scale-94"
                    : "hover:bg-gray-200 hover:scale-105"
                }`}
        >
            <i className="bi bi-arrow-left"></i>
        </Link>

    )
}
