import { useEffect, useRef, useState } from 'react';
import { useNav } from '../context/NavigationContext';

const SUBJECT_OPTIONS = [
  'Product Enquiry',
  'Get a Quote',
  'Bulk / Dealer Enquiry',
  'Service & Support',
  'Refurbished Products',
  'Solar Solutions',
  'Other',
];

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const INITIAL_FORM: ContactForm = { name: '', email: '', phone: '', subject: '', message: '' };

function isValidIndianPhone(value: string): boolean {
  const cleaned = value.replace(/[\s-]/g, '').trim();
  return /^(\+91)?[6-9]\d{9}$/.test(cleaned);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function Contact() {
  const { navigate, contactPrefill, clearContactPrefill } = useNav();
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState(false);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Apply prefill from ProductDetail / Navbar, then clear it so it doesn't stick.
  useEffect(() => {
    if (contactPrefill) {
      setForm((prev) => ({
        ...prev,
        subject: contactPrefill.subject ?? prev.subject,
        message: contactPrefill.message ?? prev.message,
      }));
      clearContactPrefill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactPrefill]);

  // Auto-hide the success banner after ~6 seconds.
  useEffect(() => {
    if (status === 'success') {
      successTimer.current = setTimeout(() => setStatus('idle'), 6000);
    }
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, [status]);

  const set = (key: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) {
      next.name = 'Full Name is required.';
    } else if (form.name.trim().length < 2) {
      next.name = 'Please enter your full name.';
    }
    if (!form.phone.trim()) {
      next.phone = 'Phone Number is required.';
    } else if (!isValidIndianPhone(form.phone)) {
      next.phone = 'Enter a valid 10-digit Indian mobile number (optional +91).';
    }
    if (form.email.trim() && !isValidEmail(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) {
      next.message = 'Message is required.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: silently ignore spam bots.
    if (honeypot) return;
    if (status === 'sending') return;
    if (!validate()) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
    if (!accessKey) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const selectedSubject = form.subject || 'General Enquiry';
      const payload = {
        access_key: accessKey,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        enquiry_subject: selectedSubject,
        subject: `New Enquiry from I.VOLT Website: ${selectedSubject} - ${form.name.trim()}`,
        from_name: 'I.VOLT Website',
        botcheck: false,
      };
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm(INITIAL_FORM);
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
      value: 'Q74P+MGF, Loni Dehat\nUttar Pradesh, India',
    },
    {
      label: 'Phone',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      value: '+91 9212676908, +91 9313918171 (Sales)',
      href: 'tel:+919212676908',
    },
    {
      label: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      value: 'i.volt92@gmail.com',
      href: 'mailto:i.volt92@gmail.com',
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

  const isSending = status === 'sending';

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

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-5 flex items-start gap-3" role="status" aria-live="polite">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-800 text-sm font-medium leading-relaxed pt-2">
                  Thank you! Your enquiry has been sent. Our team will contact you shortly.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-5 flex items-start gap-3" role="alert">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-800 text-sm font-medium leading-relaxed pt-2">
                  Something went wrong. Please try again or call us directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot for spam protection */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                style={{ display: 'none' }}
                checked={honeypot}
                onChange={(e) => setHoneypot(e.target.checked)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={set('name')}
                    aria-invalid={!!errors.name}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1D3A]/10 transition-all ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-[#E2E8F0] focus:border-[#0B1D3A]'}`}
                    placeholder="Ramesh Kumar"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Phone Number *</label>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    aria-invalid={!!errors.phone}
                    inputMode="tel"
                    autoComplete="tel"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1D3A]/10 transition-all ${errors.phone ? 'border-red-400 focus:border-red-400' : 'border-[#E2E8F0] focus:border-[#0B1D3A]'}`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  aria-invalid={!!errors.email}
                  autoComplete="email"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1D3A]/10 transition-all ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-[#E2E8F0] focus:border-[#0B1D3A]'}`}
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Subject</label>
                <select
                  value={form.subject}
                  onChange={set('subject')}
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] bg-white transition-all"
                >
                  <option value="">Select a subject…</option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1D3A] mb-1.5">Message *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1D3A]/10 transition-all resize-none ${errors.message ? 'border-red-400 focus:border-red-400' : 'border-[#E2E8F0] focus:border-[#0B1D3A]'}`}
                  placeholder="Tell us about your power requirements, location, or any specific questions…"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#F5C518]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
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

            {/* Map */}
            <div className="bg-[#F1F5F9] rounded-2xl overflow-hidden border border-[#E2E8F0] aspect-video relative">
              <iframe
                title="I.VOLT location in Loni Dehat, Uttar Pradesh"
                src="https://www.google.com/maps?q=28.756676,77.286290&z=17&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-lg bg-white/95 px-3 py-2 shadow-sm">
                <div>
                  <p className="font-semibold text-[#0B1D3A] text-xs">Loni Dehat</p>
                  <p className="text-[#64748B] text-[11px]">Uttar Pradesh · 28.756676, 77.286290</p>
                </div>
                <a
                  href="https://maps.app.goo.gl/TA8ZkhfyMA5EAdgc6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-2 bg-[#0B1D3A] text-white text-xs font-semibold rounded-lg hover:bg-[#162B4D] transition-colors"
                >
                  Open Map
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
