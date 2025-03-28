
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        
        if (existingItem) {
          return set((state) => ({
            items: state.items.map((item) => {
              if (item.id === data.id) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
              }
              return item;
            }),
          }));
        }

        set((state) => ({
          items: [...state.items, { ...data, quantity: 1 }],
        }));
      },
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      clearCart: () => set({ items: [] }),
      increaseQuantity: (id: string) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        }));
      },
      decreaseQuantity: (id: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        
        if (existingItem && existingItem.quantity === 1) {
          return get().removeItem(id);
        }
        
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }),
        }));
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
