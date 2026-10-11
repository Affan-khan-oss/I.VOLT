import { useNav, type PageId } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { getFeatured } from '../data/products';

const categories = [
  {
    id: 'ups',
    page: 'ups' as PageId,
    name: 'UPS Systems',
    desc: 'Online & offline UPS for homes and enterprises',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    id: 'inverter',
    page: 'inverter' as PageId,
    name: 'Inverters',
    desc: 'Pure sine wave home & commercial inverters',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'batteries',
    page: 'batteries' as PageId,
    name: 'Batteries',
    desc: 'Tubular & flat plate batteries with long warranty',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16M9 7V5h6v2" />
      </svg>
    ),
  },
  {
    id: 'solar',
    page: 'solar' as PageId,
    name: 'Solar',
    desc: 'Panels, inverters & complete solar kits',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m8.66-12H20m-16 0H2.34M18.36 5.64l-.7.7M6.34 17.66l-.7.7M18.36 18.36l-.7-.7M6.34 6.34l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  {
    id: 'refurbished',
    page: 'refurbished' as PageId,
    name: 'Refurbished',
    desc: 'Certified used equipment at unbeatable prices',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'accessories',
    page: 'accessories' as PageId,
    name: 'Accessories',
    desc: 'Trolleys, cables, stabilizers & more',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const features = [
  {
    title: '3-Year Warranty',
    desc: 'All products carry an industry-leading 3-year warranty with doorstep service.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    desc: 'Round-the-clock customer care and on-site technical assistance across India.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Premium Quality',
    desc: 'ISO-certified manufacturing with rigorous testing at every production stage.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '50K+', label: 'Products Sold' },
  { value: '28', label: 'States Served' },
  { value: '500+', label: 'Service Centres' },
];

export function Home() {
  const { navigate } = useNav();
  const featured = getFeatured();

  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen bg-[#0B1D3A] flex items-center relative overflow-hidden pt-16">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#F5C518]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1E3A62]/60 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#162B4D] text-[#F5C518] text-sm font-semibold px-4 py-2 rounded-full mb-8 border border-[#F5C518]/20">
              <span className="w-2 h-2 bg-[#F5C518] rounded-full" />
              India's Trusted Power Brand
            </div>

            <h1
              className="font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6"
              style={{
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Power That <br />
              <span
                className="text-[#F5C518]"
              >
                Never
              </span>{' '}
              Stops
            </h1>

            <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-lg">
              Intelligent UPS systems, pure sine wave inverters, solar solutions, and long-life batteries keeping homes and enterprises across India powered through every outage.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('products')}
                className="px-8 py-4 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] font-bold text-base rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#F5C518]/25 hover:-translate-y-0.5"
              >
                Explore Products
              </button>
              <button
                onClick={() => navigate('contact')}
                className="px-8 py-4 border-2 border-white/20 hover:border-white/50 text-white font-semibold text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Get a Quote →
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-black text-[#F5C518]"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#64748B] text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Category cards grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.page)}
                className="group bg-[#162B4D] hover:bg-[#1E3A62] border border-white/5 hover:border-[#F5C518]/30 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-[#F5C518] mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3
                  className="font-bold text-white text-base mb-1.5"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {cat.name}
                </h3>
                <p className="text-[#64748B] text-xs leading-relaxed">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0B1D3A] mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Shop by Category
            </h2>
            <p className="text-[#64748B] text-base max-w-xl mx-auto">
              From home inverters to enterprise UPS systems — find the right power solution for every need.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.page)}
                className="group flex flex-col items-center text-center p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#F5C518] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F7F9FC] group-hover:bg-[#F5C518]/10 flex items-center justify-center text-[#0B1D3A] group-hover:text-[#D4A517] mb-3 transition-all duration-300">
                  {cat.icon}
                </div>
                <h3
                  className="font-semibold text-[#0B1D3A] text-sm"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {cat.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose I.VOLT */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#F5C518]/15 text-[#B8941A] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Why I.VOLT
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0B1D3A] mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Built on Trust. Powered by Quality.
            </h2>
            <p className="text-[#64748B] text-base max-w-xl mx-auto">
              Over 15 years of powering Indian homes and businesses with dependable, affordable energy solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-5xl mx-auto">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="w-full max-w-[290px] bg-white rounded-2xl p-7 border border-[#E2E8F0] hover:shadow-lg hover:border-[#F5C518]/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B1D3A] group-hover:bg-[#F5C518] flex items-center justify-center text-[#F5C518] group-hover:text-[#0B1D3A] mb-5 transition-all duration-300">
                  {feat.icon}
                </div>
                <h3
                  className="font-bold text-[#0B1D3A] text-lg mb-2"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {feat.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#0B1D3A] mb-2"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Featured Products
              </h2>
              <p className="text-[#64748B]">Our most trusted products, chosen by thousands of customers.</p>
            </div>
            <button
              onClick={() => navigate('products')}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#0B1D3A] hover:text-[#F5C518] transition-colors duration-200"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('products')}
              className="px-8 py-3.5 border-2 border-[#0B1D3A] hover:bg-[#0B1D3A] text-[#0B1D3A] hover:text-white font-semibold rounded-xl transition-all duration-200"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#0B1D3A] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#F5C518]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Need a Custom Power Solution?
          </h2>
          <p className="text-[#94A3B8] text-lg mb-10 max-w-xl mx-auto">
            Our power engineers will assess your requirements and recommend the perfect system for your home or business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-4 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] font-bold text-base rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#F5C518]/20 hover:-translate-y-0.5"
            >
              Get a Free Quote
            </button>
            <a
              href="tel:+919876543210"
              className="px-8 py-4 border-2 border-white/20 hover:border-white/50 text-white font-semibold text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
