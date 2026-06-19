import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
};

type CartState = {
  items: CartItem[];

  addToCart: (product: CartItem) => void;

  removeFromCart: (id: number) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const exist = state.items.find(
            (item) => item.id === product.id
          );

          if (exist) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity:
                        item.quantity + product.quantity,
                    }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, product],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== id
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);