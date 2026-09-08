import { useState } from 'react';
import { useNav } from '../context/NavigationContext';

export function Contact() {
  const { navigate } = useNav();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactDetails = [
    {
      label: 'Head Office',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      value: 'Plot 42, Industrial Area Phase II\nChandigarh – 160002, India',
    },
    {
      label: 'Phone',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      value: '+91 98765 43210\n+91 98765 43211 (Sales)',
      href: 'tel:+919876543210',
    },
    {
      label: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      value: 'info@ivolt.in\nsupport@ivolt.in',
      href: 'mailto:info@ivolt.in',
    },
    {
      label: 'Business Hours',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: 'Mon – Sat: 9:00 AM – 7:00 PM\nSun: Closed (Support 10am–5pm)',
    },
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-[#0B1D3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}Contact
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Get in Touch
          </h1>
          <p className="text-[#94A3B8] max-w-xl">
            Have questions about our products, need a custom quote, or want to find your nearest service centre? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#0B1D3A] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0B1D3A] text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Message Sent!</h3>
                <p className="text-[#64748B] text-sm mb-5">Thank you for reaching out. Our team will contact you within 2 business hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#0B1D3A] text-white text-sm font-semibold rounded-xl hover:bg-[#162B4D] transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] focus:ring-2 focus:ring-[#0B1D3A]/10 transition-all"
                      placeholder="Ramesh Kumar"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Phone Number *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] focus:ring-2 focus:ring-[#0B1D3A]/10 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] focus:ring-2 focus:ring-[#0B1D3A]/10 transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] bg-white transition-all"
                  >
                    <option value="">Select a subject…</option>
                    <option>Product Enquiry – UPS</option>
                    <option>Product Enquiry – Inverter</option>
                    <option>Product Enquiry – Battery</option>
                    <option>Product Enquiry – Solar</option>
                    <option>Bulk / Dealer Order</option>
                    <option>Service & Support</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] focus:ring-2 focus:ring-[#0B1D3A]/10 transition-all resize-none"
                    placeholder="Tell us about your power requirements, location, or any specific questions…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#F5C518]/30"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#0B1D3A] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Contact Information
            </h2>

            <div className="space-y-5 mb-8">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4 p-5 bg-[#F7F9FC] rounded-2xl border border-[#E2E8F0]">
                  <div className="w-10 h-10 bg-[#0B1D3A] rounded-xl flex items-center justify-center text-[#F5C518] shrink-0">
                    {detail.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1D3A] text-sm mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {detail.label}
                    </div>
                    {detail.href ? (
                      <a href={detail.href} className="text-[#64748B] text-sm hover:text-[#0B1D3A] whitespace-pre-line transition-colors">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-[#64748B] text-sm whitespace-pre-line">{detail.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#F1F5F9] rounded-2xl overflow-hidden border border-[#E2E8F0] aspect-video relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-[#0B1D3A] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#0B1D3A] text-sm">Industrial Area Phase II</p>
                  <p className="text-[#64748B] text-xs">Chandigarh – 160002</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0B1D3A] text-white text-xs font-semibold rounded-lg hover:bg-[#162B4D] transition-colors"
                >
                  View on Google Maps →
                </a>
              </div>
              {/* Decorative grid lines */}
              <svg className="w-full h-full opacity-20" viewBox="0 0 400 250">
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 35} x2="400" y2={i * 35} stroke="#94A3B8" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 35} y1="0" x2={i * 35} y2="250" stroke="#94A3B8" strokeWidth="0.5" />
                ))}
              </svg>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-sm font-medium text-[#0B1D3A] mb-3">Follow Us</p>
              <div className="flex gap-3">
                {['LinkedIn', 'Facebook', 'Instagram', 'YouTube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm text-[#64748B] hover:border-[#0B1D3A] hover:text-[#0B1D3A] hover:bg-[#F7F9FC] transition-all duration-200"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
