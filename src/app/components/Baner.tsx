"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import baner from "../public/logos/ad.svg";
import image1 from "../public/logos/image 1.svg";
import image2 from "../public/logos/image 2.svg";

export default function Baner() {
  return (
    <div className="mt-20 w-full relative h-75 overflow-hidden rounded-xl">

      <Image
        src={baner}
        alt="banner background"
        fill
        className="object-cover"
      />
<div className="relative z-10 flex h-full items-center justify-between">

  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7 }}
  >
    <Image
      src={image2}
      alt="promotional product image"
      width={200}
      height={250}
      className=" hidden md:block"
    />
  </motion.div>

  <div className="flex flex-col items-center gap-5 text-center">
    <h2 className="text-4xl font-bold text-white">
      Get 50% Off on <br />
      Selected categories
    </h2>

        <Link
      href="/product"
      className="relative inline-block overflow-hidden rounded-2xl px-5 py-2 font-semibold text-[#F61B5A] group"
    >
      <span className="absolute inset-0 bg-white" />

      <span
        className="
          absolute inset-0
          bg-[#F61B5A]
          scale-0
          origin-bottom-left
          transition-transform
          duration-700
          ease-in-out
          group-hover:scale-150
        "
      />

      {/* text */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        Shop now
      </span>
    </Link>
  </div>

  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <Image
      src={image1}
      alt="promotional product image"
      width={200}
      height={250}
      className=" hidden md:block"
    />
  </motion.div>

</div>

    </div>
  );
}