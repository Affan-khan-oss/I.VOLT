import { useState, useMemo } from 'react';
import { useNav, type PageId } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import type { ProductCategory } from '../data/products';

const categoryFilters: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All Products', value: 'all' },
  { label: 'UPS Systems', value: 'ups' },
  { label: 'Inverters', value: 'inverter' },
  { label: 'Batteries', value: 'batteries' },
  { label: 'Solar', value: 'solar' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Refurbished', value: 'refurbished' },
];

const sortOptions = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

const categoryPageMap: Partial<Record<ProductCategory, PageId>> = {
  ups: 'ups',
  inverter: 'inverter',
  batteries: 'batteries',
  accessories: 'accessories',
  refurbished: 'refurbished',
  solar: 'solar',
};

export function Products() {
  const { navigate } = useNav();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [sort, setSort] = useState('popular');

  const mainProducts = products.filter((p) => p.category !== 'refurbished');

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? mainProducts : mainProducts.filter((p) => p.category === activeCategory);

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999));
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else {
      list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return list;
  }, [activeCategory, sort]);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-[#0B1D3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}Products
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            All Products
          </h1>
          <p className="text-[#94A3B8]">
            {filtered.length} products — find the right power solution for your needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Quick category jump */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categoryPageMap).map(([cat, page]) => (
            <button
              key={cat}
              onClick={() => navigate(page as PageId)}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-[#E2E8F0] text-[#0B1D3A] hover:border-[#0B1D3A] hover:bg-[#0B1D3A] hover:text-white transition-all duration-200"
            >
              Browse {categoryFilters.find((c) => c.value === cat)?.label ?? cat}
            </button>
          ))}
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveCategory(f.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeCategory === f.value ? 'bg-[#0B1D3A] text-white' : 'bg-[#F7F9FC] text-[#64748B] hover:text-[#0B1D3A] border border-[#E2E8F0]'}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm text-[#0B1D3A] focus:outline-none focus:border-[#0B1D3A] bg-white self-start sm:self-auto"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#64748B]">No products found in this category.</div>
        )}
      </div>
    </div>
  );
}
