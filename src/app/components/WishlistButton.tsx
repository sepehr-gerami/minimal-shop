"use client";

import useWishlistStore from "../store/WishlistStore";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export type Props = {
  product: Product;
};

export default function WishlistButton({ product }: Props) {
  const likedIds = useWishlistStore((state) => state.likedIds);
  const toggleLiked = useWishlistStore((state) => state.toggleLike);

  const isLiked = likedIds.includes(product.id);

  return (
    <button
      onClick={() => toggleLiked(product.id)}
      className="
        flex items-center justify-center
        w-9 h-9
        rounded-full
        bg-white
        shadow-md
        hover:shadow-lg
        transition-all
        duration-200
        hover:scale-110
        cursor-pointer
      "
    >
      {isLiked ? (
        <i className="bi bi-heart-fill text-red-500 text-lg"></i>
      ) : (
        <i className="bi bi-heart text-gray-500 text-lg"></i>
      )}
    </button>
  );
}