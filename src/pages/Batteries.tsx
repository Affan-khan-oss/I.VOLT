import { useState } from 'react';
import { useNav } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { getByCategory } from '../data/products';

type BatTab = 'all' | 'tubular' | 'flat-plate';

const tabs: { label: string; value: BatTab }[] = [
  { label: 'All Batteries', value: 'all' },
  { label: 'Tubular', value: 'tubular' },
  { label: 'Flat Plate', value: 'flat-plate' },
];

export function Batteries() {
  const { navigate } = useNav();
  const [activeTab, setActiveTab] = useState<BatTab>('all');

  const all = getByCategory('batteries');
  const filtered = activeTab === 'all' ? all : all.filter((p) => p.subcategory === activeTab);

  return (
    <div className="pt-14 sm:pt-16 min-h-screen">
      <div className="bg-[#0B1D3A] py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}
            <button onClick={() => navigate('products')} className="hover:text-[#F5C518] transition-colors">Products</button>
            {' '}/{'  '}Batteries
          </p>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-2 sm:mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Batteries
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl">
            Long-life tubular and flat plate batteries engineered for India's power conditions deep discharge tolerant, with multi-year warranties.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 border-b border-[#E2E8F0]">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-sm font-semibold rounded-t-xl transition-all duration-200 -mb-px border-b-2 ${activeTab === tab.value ? 'text-[#0B1D3A] border-[#F5C518] bg-[#FFFBEA]' : 'text-[#64748B] border-transparent hover:text-[#0B1D3A]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Type comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div className="bg-[#F0F7FF] border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-5">
            <div className="font-semibold text-[#0B1D3A] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Tubular Battery</div>
            <p className="text-[#64748B] text-sm">Longer lifespan (5–8 years), better deep discharge performance. Ideal for areas with frequent, long power cuts. Requires water top-up every 6 months.</p>
          </div>
          <div className="bg-[#FFFBEA] border border-yellow-200 rounded-xl sm:rounded-2xl p-3 sm:p-5">
            <div className="font-semibold text-[#0B1D3A] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Flat Plate Battery</div>
            <p className="text-[#64748B] text-sm">Lower cost, faster charging, compact size. Suitable for areas with short power cuts (1–2 hours/day). Lifespan of 3–5 years.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 items-stretch">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
