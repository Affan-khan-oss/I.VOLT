import { useState } from 'react';
import { useNav } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { getByCategory } from '../data/products';

type SolarTab = 'all' | 'panel' | 'inverter' | 'battery' | 'combo';

const tabs: { label: string; value: SolarTab }[] = [
  { label: 'All', value: 'all' },
  { label: 'Solar Panels', value: 'panel' },
  { label: 'Solar Inverters', value: 'inverter' },
  { label: 'Solar Batteries', value: 'battery' },
  { label: 'Combo Kits', value: 'combo' },
];

const howItWorks = [
  {
    step: '01',
    title: 'Sunlight Captured',
    desc: 'Solar panels on your rooftop convert sunlight into DC electricity all through the day.',
  },
  {
    step: '02',
    title: 'Power Converted',
    desc: 'The solar inverter converts DC electricity to AC — the same power your appliances use.',
  },
  {
    step: '03',
    title: 'Home Powered',
    desc: 'Your home runs on clean solar energy. Surplus is stored in batteries or fed to the grid.',
  },
  {
    step: '04',
    title: 'Bills Drop',
    desc: 'With 5KW of solar, most homes save ₹6,000–₹10,000 every month on electricity bills.',
  },
];

export function Solar() {
  const { navigate } = useNav();
  const [activeTab, setActiveTab] = useState<SolarTab>('all');

  const all = getByCategory('solar');
  const filtered = activeTab === 'all' ? all : all.filter((p) => p.subcategory === activeTab);

  return (
    <div className="pt-14 sm:pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-[#0B1D3A] py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}Solar
          </p>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-2 sm:mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Solar Solutions
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl">
            Harness the power of the sun. I.VOLT solar panels, inverters, and complete rooftop kits for homes and businesses across India.
          </p>
        </div>
      </div>

      {/* How Solar Works */}
      <div className="bg-[#F7F9FC] py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-[#0B1D3A]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              How Solar Works
            </h2>
            <p className="text-[#64748B] text-xs sm:text-sm mt-2">From sunlight to savings in four simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-gradient-to-r from-[#E2E8F0] to-transparent z-0" />
                )}
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-[#E2E8F0] relative z-10">
                  <div className="text-2xl sm:text-4xl font-black text-[#F5C518]/30 mb-2 sm:mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-[#0B1D3A] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ROI Banner */}
          <div className="mt-6 sm:mt-8 bg-[#0B1D3A] rounded-xl sm:rounded-2xl p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center">
            {[
              { value: '25 yrs', label: 'Panel Warranty' },
              { value: '3–4 yrs', label: 'Payback Period' },
              { value: '₹8K+', label: 'Monthly Savings (5KW)' },
              { value: '0', label: 'Maintenance Cost' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl font-black text-[#F5C518]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-[#64748B] text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 border-b border-[#E2E8F0] pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 sm:px-5 py-2 sm:py-3 text-sm font-semibold rounded-t-xl transition-all duration-200 -mb-px border-b-2 ${activeTab === tab.value ? 'text-[#0B1D3A] border-[#F5C518] bg-[#FFFBEA]' : 'text-[#64748B] border-transparent hover:text-[#0B1D3A]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 items-stretch">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-br from-[#0B1D3A] to-[#162B4D] rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center">
          <h3 className="font-black text-xl sm:text-2xl text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Free Solar Site Assessment
          </h3>
          <p className="text-[#94A3B8] text-xs sm:text-sm mb-4 sm:mb-6 max-w-md mx-auto">
            Our solar engineers will visit your site, assess your roof area and power consumption, and provide a custom proposal free of charge.
          </p>
          <button
            onClick={() => navigate('contact')}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3.5 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] font-bold text-sm sm:text-base rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#F5C518]/20"
          >
            Book Free Assessment
          </button>
        </div>
      </div>

    </div>
  );
}
