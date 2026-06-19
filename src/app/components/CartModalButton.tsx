// components/CartModalButton.tsx
"use client";
import { useState } from "react";
import CardBasket from "./CardBasket";
import Portal from "./Portal";

export default function CartModalButton() {
  const [openCart, setOpenCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  const handleOpen = () => {
    setActive(true)
    setMounted(true);
    requestAnimationFrame(() => setOpenCart(true));
  };

  const handleClose = () => {
    setActive(false)
    setOpenCart(false);
    setTimeout(() => setMounted(false), 250);
  };

  return (
    <>
      <button
        onClick={handleOpen}
              className={`flex items-center gap-1 sm:text-sm p-2 md:font-medium rounded-2xl transition-all duration-300 ease-out
    ${active
                    ? "bg-gray-200 scale-105"
                    : "hover:bg-gray-200 hover:scale-105"
                }`}
      >
        <i className="bi bi-bag text-lg sm:text-xl"></i>
        Cart
      </button>

      {mounted && (
        <Portal>
          <div className="sm:hidden fixed inset-0 z-999 flex items-stretch justify-start">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={handleClose}
            />
            <div
              className={`relative h-full w-[85%] max-w-xs overflow-auto bg-white shadow-2xl p-4 transition-transform duration-250 ease-out ${
                openCart ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <CardBasket />
            </div>
          </div>

          <div className="hidden sm:flex fixed inset-0 z-999 items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={handleClose}
            />
            {/* modal */}
            <div className="relative w-full max-w-3xl max-h-[85vh] overflow-auto bg-white rounded-2xl shadow-2xl p-6">
              <button
                onClick={handleClose}
                className="absolute top-2 right-3 w-8 h-8 flex items-center justify-center cursor-pointer bg-gray-200 text-red-500 rounded-full hover:bg-gray-300 hover:scale-110 transition-all duration-200 ease-out"
              >
                ✕
              </button>
              <CardBasket />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}