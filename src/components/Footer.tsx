import { useNav, type PageId } from '../context/NavigationContext';

export function Footer() {
  const { navigate } = useNav();

  interface ContactItem {
    icon: string;
    text?: string;
    href?: string;
    lines?: { text: string; href: string; suffix?: string }[];
  }

  const contactItems: ContactItem[] = [
    {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
      text: 'Q74P+MGF, Loni Dehat, Uttar Pradesh, India',
    },
    {
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      lines: [
        { text: '+91 9212676908', href: 'tel:+919212676908' },
        { text: '+91 9313918171', href: 'tel:+919313918171', suffix: ' (Sales)' },
      ],
    },
    {
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      text: 'i.volt1212@gmail.com',
      href: 'mailto:i.volt1212@gmail.com',
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      text: 'Mon–Sat: 9am – 7pm',
    },
  ];

  return (
    <footer className="bg-[#0B1D3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="font-black text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                I.
              </span>
              <span className="font-black text-2xl text-[#F5C518]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                VOLT
              </span>
            </div>
            <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              India's trusted power solutions brand delivering reliable UPS, inverters, batteries, and solar systems across the nation.
            </p>
            <div className="flex gap-2.5">
              {[
               
                {
                  label: 'Facebook',
                  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                },
                {
                  label: 'Instagram',
                  path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 bg-[#162B4D] hover:bg-[#F5C518] text-[#94A3B8] hover:text-[#0B1D3A] rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {(
                [
                  { label: 'Home', page: 'home' },
                  { label: 'Products', page: 'products' },
                  { label: 'Solar Solutions', page: 'solar' },
                  { label: 'Refurbished', page: 'refurbished' },
                  { label: 'About Us', page: 'about' },
                  { label: 'Contact', page: 'contact' },
                ] as { label: string; page: PageId }[]
              ).map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-[#94A3B8] hover:text-[#F5C518] text-xs sm:text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Products
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {(
                [
                  { label: 'Online UPS', page: 'ups' },
                  { label: 'Offline UPS', page: 'ups' },
                  { label: 'Inverters', page: 'inverter' },
                  { label: 'Batteries', page: 'batteries' },
                  { label: 'Solar Panels', page: 'solar' },
                  { label: 'Accessories', page: 'accessories' },
                ] as { label: string; page: PageId }[]
              ).map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-[#94A3B8] hover:text-[#F5C518] text-xs sm:text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Contact Info
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {contactItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.lines ? (
                    <div className="text-xs sm:text-sm">
                      {item.lines.map((line) => (
                        <div key={line.href}>
                          <a href={line.href} className="text-[#94A3B8] hover:text-[#F5C518] hover:underline cursor-pointer text-xs sm:text-sm transition-colors duration-200">
                            {line.text}
                          </a>
                          {line.suffix && (
                            <span className="text-[#94A3B8] text-xs sm:text-sm">{line.suffix}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : item.href ? (
                    <a href={item.href} className="text-[#94A3B8] hover:text-[#F5C518] hover:underline cursor-pointer text-xs sm:text-sm transition-colors duration-200">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-[#94A3B8] text-xs sm:text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#162B4D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#475569] text-xs">© 2026 I.VOLT Power Solutions. All rights reserved.</p>
          <p className="text-[#475569] text-xs">Keeping India powered, always.</p>
        </div>
      </div>
    </footer>
  );
}
