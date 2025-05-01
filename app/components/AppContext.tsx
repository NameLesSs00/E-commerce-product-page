"use client";
import { createContext, useState, ReactNode, useContext } from "react";

type CartItem = {
  slug: string;
  quantity: number;
  price: number;
  findItem: () => string | undefined;
};

type AppContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  findItem: (slug: string) => string | undefined;
  isCartVisible: boolean;
  toggleCartVisibility: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  function findItem(slug: string) {
    const item = cartItems.find((item) => item.slug === slug);
    return item ? item.slug : undefined;
  }

  function toggleCartVisibility() {
    setIsCartVisible((prev) => !prev);
  }

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        findItem,
        isCartVisible,
        toggleCartVisibility,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

export default AppContext;