import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type PageId =
  | 'home'
  | 'products'
  | 'ups'
  | 'inverter'
  | 'batteries'
  | 'accessories'
  | 'refurbished'
  | 'solar'
  | 'about'
  | 'contact'
  | 'product-detail';

interface NavContextType {
  currentPage: PageId;
  navigate: (page: PageId) => void;
  selectedProductId: string | null;
  viewProduct: (id: string) => void;
}

export const NavigationContext = createContext<NavContextType>({
  currentPage: 'home',
  navigate: () => {},
  selectedProductId: null,
  viewProduct: () => {},
});

export const useNav = () => useContext(NavigationContext);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const navigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const viewProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, selectedProductId, viewProduct }}>
      {children}
    </NavigationContext.Provider>
  );
}
