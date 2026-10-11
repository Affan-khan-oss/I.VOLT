import { useState, useRef, useEffect } from 'react';
import { useNav, type PageId } from '../context/NavigationContext';

const productLinks: { label: string; page: PageId }[] = [
  { label: 'UPS Systems', page: 'ups' },
  { label: 'Inverters', page: 'inverter' },
  { label: 'Batteries', page: 'batteries' },
  { label: 'Accessories', page: 'accessories' },
];

const mainLinks: { label: string; page: PageId }[] = [
  { label: 'Refurbished', page: 'refurbished' },
  { label: 'Solar', page: 'solar' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export function Navbar() {
  const { currentPage, navigate } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 160);
  };

  const handleNav = (page: PageId) => {
    navigate(page);
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const isProductPage = ['products', 'ups', 'inverter', 'batteries', 'accessories'].includes(
    currentPage,
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-[#E2E8F0]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center shrink-0"
          >
            <span className="font-black text-2xl text-[#0B1D3A]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              I.
            </span>
            <span className="font-black text-2xl text-[#F5C518]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              VOLT
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === 'home' ? 'text-[#0B1D3A] font-semibold' : 'text-[#64748B] hover:text-[#0B1D3A]'}`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => handleNav('products')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${isProductPage ? 'text-[#0B1D3A] font-semibold' : 'text-[#64748B] hover:text-[#0B1D3A]'}`}
              >
                Products
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] py-2 z-50"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  {productLinks.map((link) => (
                    <button
                      key={link.page}
                      onClick={() => handleNav(link.page)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${currentPage === link.page ? 'text-[#0B1D3A] bg-[#F7F9FC]' : 'text-[#374151] hover:bg-[#F7F9FC] hover:text-[#0B1D3A]'}`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="border-t border-[#F1F5F9] my-1.5" />
                  <button
                    onClick={() => handleNav('products')}
                    className="w-full text-left px-4 py-2 text-sm text-[#64748B] hover:text-[#0B1D3A] hover:bg-[#F7F9FC] transition-colors duration-150 font-medium"
                  >
                    All Products →
                  </button>
                </div>
              )}
            </div>

            {mainLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === link.page ? 'text-[#0B1D3A] font-semibold' : 'text-[#64748B] hover:text-[#0B1D3A]'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigate('contact', { subject: 'Get a Quote' });
                setDropdownOpen(false);
              }}
              className="hidden md:block px-5 py-2.5 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#F5C518]/30"
            >
              Get Quote
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#0B1D3A] hover:bg-[#F7F9FC] transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#F1F5F9] py-3 space-y-0.5 pb-4">
            {[
              { label: 'Home', page: 'home' as PageId },
              { label: 'All Products', page: 'products' as PageId },
              { label: 'UPS Systems', page: 'ups' as PageId },
              { label: 'Inverters', page: 'inverter' as PageId },
              { label: 'Batteries', page: 'batteries' as PageId },
              { label: 'Accessories', page: 'accessories' as PageId },
              { label: 'Refurbished', page: 'refurbished' as PageId },
              { label: 'Solar', page: 'solar' as PageId },
              { label: 'About', page: 'about' as PageId },
              { label: 'Contact', page: 'contact' as PageId },
            ].map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === link.page ? 'bg-[#F7F9FC] text-[#0B1D3A] font-semibold' : 'text-[#64748B] hover:text-[#0B1D3A] hover:bg-[#F7F9FC]'}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 px-0">
              <button
                onClick={() => {
                  navigate('contact', { subject: 'Get a Quote' });
                  setMobileOpen(false);
                  setDropdownOpen(false);
                }}
                className="w-full px-5 py-3 bg-[#F5C518] text-[#0B1D3A] text-sm font-bold rounded-xl"
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
