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

export interface ContactPrefill {
  subject?: string;
  message?: string;
}

interface NavContextType {
  currentPage: PageId;
  navigate: (page: PageId, prefill?: ContactPrefill) => void;
  selectedProductId: string | null;
  viewProduct: (id: string) => void;
  contactPrefill: ContactPrefill | null;
  clearContactPrefill: () => void;
}

export const NavigationContext = createContext<NavContextType>({
  currentPage: 'home',
  navigate: () => {},
  selectedProductId: null,
  viewProduct: () => {},
  contactPrefill: null,
  clearContactPrefill: () => {},
});

export const useNav = () => useContext(NavigationContext);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(null);

  const navigate = (page: PageId, prefill?: ContactPrefill) => {
    if (page === 'contact') {
      // Set prefill when provided, otherwise clear any stale prefill.
      setContactPrefill(prefill ?? null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const clearContactPrefill = () => setContactPrefill(null);

  const viewProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, selectedProductId, viewProduct, contactPrefill, clearContactPrefill }}>
      {children}
    </NavigationContext.Provider>
  );
}
