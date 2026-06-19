import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
type WishlistState = {
  likedIds: number[];
  toggleLike: (id: number) => void;
};

const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      likedIds: [],

      toggleLike: (id) =>
        set((state) => ({
          likedIds: state.likedIds.includes(id)
            ? state.likedIds.filter((i) => i !== id)
            : [...state.likedIds, id],
        })),
    }),
    {
      name: "wishlist",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useWishlistStore;