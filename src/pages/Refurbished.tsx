import { useNav } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { getByCategory } from '../data/products';

export function Refurbished() {
  const { navigate } = useNav();
  const items = getByCategory('refurbished');

  const gradeInfo = [
    { grade: 'A', label: 'Grade A — Like New', desc: 'Fully tested, cosmetically excellent. 1-year I.VOLT warranty.' },
    { grade: 'B', label: 'Grade B — Good', desc: 'Fully functional, minor cosmetic marks. 6-month I.VOLT warranty.' },
    { grade: 'C', label: 'Grade C — Fair', desc: 'Works correctly, visible wear. 3-month I.VOLT warranty.' },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-[#0B1D3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}Refurbished
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Refurbished Products
          </h1>
          <p className="text-[#94A3B8] max-w-xl">
            Certified refurbished UPS, inverters, and batteries — factory-tested and backed by an I.VOLT warranty. Same reliability, smarter price.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Grade Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {gradeInfo.map((g) => (
            <div key={g.grade} className="bg-[#F7F9FC] rounded-2xl p-5 border border-[#E2E8F0] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0B1D3A] text-white flex items-center justify-center font-black text-sm shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {g.grade}
              </div>
              <div>
                <div className="font-semibold text-[#0B1D3A] text-sm mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{g.label}</div>
                <p className="text-[#64748B] text-xs leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust banner */}
        <div className="bg-[#F5C518]/10 border border-[#F5C518]/30 rounded-2xl p-5 mb-10 flex items-center gap-4">
          <svg className="w-6 h-6 text-[#D4A517] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-[#0B1D3A] text-sm font-medium">
            Every refurbished product is <strong>fully tested by I.VOLT engineers</strong>, deep-cleaned, and recertified before sale. You get a quality product at 30–50% below the new price.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
