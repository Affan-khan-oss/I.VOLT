import { useState } from 'react';
import { useNav } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { getByCategory } from '../data/products';

type Tab = 'all' | 'online' | 'offline';

const tabs: { label: string; value: Tab }[] = [
  { label: 'All UPS', value: 'all' },
  { label: 'Online UPS', value: 'online' },
  { label: 'Offline UPS', value: 'offline' },
];

export function UPS() {
  const { navigate } = useNav();
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const all = getByCategory('ups');
  const filtered = activeTab === 'all' ? all : all.filter((p) => p.subcategory === activeTab);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-[#0B1D3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}
            <button onClick={() => navigate('products')} className="hover:text-[#F5C518] transition-colors">Products</button>
            {' '}/{'  '}UPS Systems
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            UPS Systems
          </h1>
          <p className="text-[#94A3B8] max-w-xl">
            Protect your critical equipment from power cuts, voltage fluctuations, and surges with our range of online and offline UPS systems.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#E2E8F0] pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-3 text-sm font-semibold rounded-t-xl transition-all duration-200 -mb-px border-b-2 ${activeTab === tab.value ? 'text-[#0B1D3A] border-[#F5C518] bg-[#FFFBEA]' : 'text-[#64748B] border-transparent hover:text-[#0B1D3A]'}`}
            >
              {tab.label}
              <span className="ml-2 text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded-full">
                {tab.value === 'all' ? all.length : all.filter((p) => p.subcategory === tab.value).length}
              </span>
            </button>
          ))}
        </div>

        {/* Comparison info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-[#F0F7FF] border border-blue-200 rounded-2xl p-5">
            <div className="font-semibold text-[#0B1D3A] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Online UPS</div>
            <p className="text-[#64748B] text-sm">Double-conversion technology. Continuous clean power — ideal for servers, medical equipment, and sensitive electronics. Zero transfer time.</p>
          </div>
          <div className="bg-[#FFFBEA] border border-yellow-200 rounded-2xl p-5">
            <div className="font-semibold text-[#0B1D3A] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Offline UPS</div>
            <p className="text-[#64748B] text-sm">Standby mode with fast switching. Cost-effective backup for home computers, routers, and non-critical equipment. ~8ms transfer time.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
