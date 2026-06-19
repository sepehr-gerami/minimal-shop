"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Rating from "./Rating";
import { useCartStore } from "../store/cartStore";


type Product = {
    id: number;
    title: string;
    image: string;
    price?: number;
    description: string;
};


function CartOverlay({
    size = "sm",
    inCart,
    showAddedEffect,
    onRemove,
}: {
    size?: "sm" | "lg";
    inCart: boolean;
    showAddedEffect: boolean;
    onRemove: (e: React.MouseEvent) => void;
}) {
    if (!inCart) return null;

    const checkBox = size === "sm" ? "w-12 h-12" : "w-14 h-14";
    const checkIcon = size === "sm" ? "text-base" : "text-2xl";
    const trashBox = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-base";

    return (
        <>
            {/* green tint + checkmark, auto-fades */}
            <AnimatePresence>
                {showAddedEffect && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-green-600/40 flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 40 }}
                            className={`${checkBox} rounded-full bg-white/90 flex items-center justify-center shadow-lg`}
                        >
                            <i className={`bi bi-check2-circle ${checkIcon} text-green-600`}></i>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* trash button to remove from cart, stays as long as item is in cart */}
            <button
                onClick={onRemove}
                className={`absolute top-2 right-2 ${trashBox} rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-pink-700 transition-colors z-10`}
                aria-label="Remove from cart"
            >
                <i className="bi bi-trash3"></i>
            </button>
        </>
    );
}

export default function ProductCard({
    product,
}: {
    product: Product;
}) {
    const [hovered, setHovered] = useState(false);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState("M");
    const [count, setCount] = useState(1);
    const [showAddedEffect, setShowAddedEffect] = useState(false);

    const items = useCartStore((state) => state.items);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const inCart = items.some(
        (item) => item.id === product.id
    );

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price ?? 0,
            quantity: count,
            size,
        });

        setShowAddedEffect(true);
        setOpen(false);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product.id);
        setShowAddedEffect(false);
    };

    useEffect(() => {
        if (!showAddedEffect) return;

        const timer = setTimeout(() => {
            setShowAddedEffect(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [showAddedEffect]);


    return (
        <>
            <div
                className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 hover:scale-[1.03]"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="relative h-48 w-full"
                    onClick={() => setOpen(true)}
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className={`object-contain p-3 transition-all duration-300 ${hovered ? "blur-[2px] scale-110" : "blur-0 scale-100"
                            }`}
                    />

                    <div
                        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    <CartOverlay
                        size="sm"
                        inCart={inCart}
                        showAddedEffect={showAddedEffect}
                        onRemove={(e) => {
                            e.stopPropagation();
                            handleRemoveFromCart();
                        }}
                    />

                    <button
                        onClick={() => setOpen(true)}
                        className={`absolute cursor-pointer rounded-full bottom-20  left-1/2 -translate-x-1/2 flex items-center gap-2 
                        bg-gray-300 text-black font-bold px-3 py-3
                        transition-all duration-300 shadow-lg
                        ${hovered
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            }`}
                    >
                        <i className="bi bi-cart2"></i>
                    </button>
                </div>

                <div className="p-3">
                    <h3 className="text-white text-sm font-semibold truncate">
                        {product.title}
                    </h3>
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm cursor-default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                   
                        <div
                            className="absolute inset-0"
                            onClick={() => setOpen(false)}
                        />

                    
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed bottom-0 sm:bottom-auto sm:right-4 sm:top-4
                             sm:h-auto w-full sm:w-105 max-h-[85vh] sm:max-h-[90vh]
                              bg-white shadow-2xl overflow-auto rounded-t-2xl sm:rounded-2xl p-5 z-50">

                            {/* close */}
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>

                            {/* image */}
                            <div className="relative w-full h-52 mb-4 rounded-xl overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain"
                                />

                                <CartOverlay
                                    size="lg"
                                    inCart={inCart}
                                    showAddedEffect={showAddedEffect}
                                    onRemove={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFromCart();
                                    }}
                                />
                            </div>

                            {/* title */}
                            <h2 className="font-bold text-lg">{product.title}</h2>

                            {/* description */}
                            <p className="text-sm text-gray-600 mt-1">
                                {product.description || "100% Cotton"}
                            </p>
                            <Rating />
                            <div className="flex items-center gap-3 mt-4 p-0 rounded-lg border border-gray-200  w-fit">

                                <button
                                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                                    className="px-3 py-1 bg-gray-200  cursor-pointer  rounded-lg"
                                >
                                    -
                                </button>

                                <span className="font-bold border border-gray-200 rounded-md px-2 h-full">{count}</span>

                                <button
                                    onClick={() => setCount((c) => c + 1)}
                                    className="px-3 py-1 bg-gray-200  cursor-pointer  rounded-lg"
                                >
                                    +
                                </button>
                            </div>


                            {/* price */}
                            <div className="mt-3 text-xl font-bold text-orange-500">
                                ${((product.price ?? 0) * count).toFixed(2)}
                            </div>

                            {/* SIZE */}
                            <div className="mt-4">
                                <h4 className="text-sm font-bold mb-2">Size</h4>

                                <div className="flex gap-2">
                                    {["S", "M", "L", "XL"].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`px-3 py-1 rounded-lg border  cursor-pointer transition ${size === s
                                                ? "bg-[#FE8A00] text-white border-orange-500"
                                                : "border-[#FE8A00]  text-[#FE8A00] hover:bg-gray-300 hover:scale-113 transition-all duration-100 ease-out "
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* DELIVERY */}
                            <div className="mt-4 flex flex-row items-center  gap-2.5">
                                <i className="bi bi-truck "></i>
                                <div className="felx flex-col">
                                    <h4 className="font-semibold text-sm text-black/75">Delivery</h4>
                                    <p className="text-xs text-gray-500">
                                        Free delivery within 50 kms
                                    </p>
                                </div>
                            </div>

                            {/* RETURN */}
                            <div className="mt-3 flex flex-row items-center  gap-2.5">
                                <i className="bi bi-shield-slash"></i>
                                <div className="felx flex-col">
                                    <h4 className="font-semibold text-sm text-black/75">Return Policy</h4>
                                    <p className="text-xs text-gray-500">
                                        Within 5 days of product delivery
                                    </p>

                                </div>
                            </div>

                            {/* BUTTON */}
                            <div className="flex flex-row items-center mt-5 gap-5">

                                {inCart ? (
                                    <button
                                        onClick={handleRemoveFromCart}
                                        className="border border-pink-600 rounded-2xl text-pink-600 font-medium py-1 px-2 cursor-pointer hover:bg-pink-50 hover:scale-105 transition-all duration-100 ease-out"
                                    >
                                        Remove from cart
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleAddToCart}
                                        className="border border-[#FE8A00] rounded-2xl text-[#FE8A00] font-medium py-1 px-2 cursor-pointer hover:bg-gray-300 hover:scale-105 transition-all duration-100 ease-out"
                                    >
                                        Add to cart
                                    </button>
                                )}

                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-black/50 h-fit w-fit cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <div className="ml-auto text-black/80 font-medium flex gap-1 items-center">
                                    <i className="bi bi-cart2"></i>
                                    ${((product.price ?? 0) * count).toFixed(2)}
                                </div>

                            </div>


                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>


    );
}