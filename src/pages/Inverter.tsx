import { useNav } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { getByCategory } from '../data/products';

export function Inverter() {
  const { navigate } = useNav();
  const inverters = getByCategory('inverter');

  const capacityGuide = [
    { range: '600–900VA', use: 'Lights, fans, phone charging (2-BHK basics)' },
    { range: '1500VA', use: 'Add 1 AC or a desktop PC (2–3 BHK)' },
    { range: '2000–2500VA', use: 'Multiple ACs, home office, CCTV, heavy loads' },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-[#0B1D3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}
            <button onClick={() => navigate('products')} className="hover:text-[#F5C518] transition-colors">Products</button>
            {' '}/{'  '}Inverters
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Inverters
          </h1>
          <p className="text-[#94A3B8] max-w-xl">
            Pure sine wave inverters delivering stable, clean power for every home and business load — from basics to heavy-duty.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Capacity Guide */}
        <div className="bg-[#F7F9FC] rounded-2xl p-6 mb-10 border border-[#E2E8F0]">
          <h3 className="font-semibold text-[#0B1D3A] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Capacity Selection Guide
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {capacityGuide.map((item) => (
              <div key={item.range} className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                <div className="font-bold text-[#F5C518] text-lg mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {item.range}
                </div>
                <div className="text-[#64748B] text-sm">{item.use}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inverters.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
