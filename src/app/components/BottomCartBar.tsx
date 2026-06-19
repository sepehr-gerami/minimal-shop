"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import useWishlistStore from "../store/WishlistStore";

const BottomCartBar = () => {
  const cartCount = useCartStore((state) => state.items.length);
  const wishlistCount = useWishlistStore(
    (state) => state.likedIds.length
  );

  if (wishlistCount === 0 && cartCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex items-center gap-6 bg-orange-500 px-4 py-5 rounded-t-2xl text-sm font-medium text-white">
      
      <span className="flex items-center gap-2">
        <ShoppingBag size={16} />
        {cartCount}
        {''}
        Items added to Cart
      </span>

      <span className="flex items-center gap-2">
        <Heart size={16} />
        {wishlistCount}
          {''}
        Wish list
      </span>

    </div>
  );
};

export default BottomCartBar;