"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type RatingProps = {
  initialValue?: number;
};

export default function Rating({ initialValue = 0 }: RatingProps) {
  const stars = 5;
  const [value, setValue] = useState(initialValue);
  const [shake, setShake] = useState(false);

  const handleClick = (index: number) => {
    const newValue = index + 1;
    setValue(newValue);

    if (newValue === stars) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="bg-gray-100 pl-2  hover:bg-gray-300 hover:scale-105 transition-all duration-300 ease-out w-full rounded-2xl">
    <motion.div
      animate={
        shake
          ? {
              x: [0, -4, 4, -4, 4, 0],
              rotate: [0, -2, 2, -2, 2, 0],
            }
          : {}
      }
      transition={{ duration: 0.4 }}
      className="flex gap-1 cursor-pointer"
    >
      {Array.from({ length: stars }).map((_, i) => (
        <i
          key={i}
          onClick={() => handleClick(i)}
          className={
            i < value
              ? "bi bi-star-fill text-[#FE8A00] text-xl transition-all duration-200"
              : "bi bi-star text-gray-600 text-xl transition-all duration-200"
          }
        />
      ))}
    </motion.div>

    </div>
  );
}