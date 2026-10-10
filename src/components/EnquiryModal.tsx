import { useEffect, useRef, useState } from 'react';
import type { Product } from '../data/products';
import {
  buildWhatsAppLink,
  isValidIndianMobile,
  normalizeIndianMobile,
} from '../data/enquiry';

interface EnquiryModalProps {
  product: Product;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  city: string;
  message: string;
}

export function EnquiryModal({ product, onClose }: EnquiryModalProps) {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', city: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);
  const [waLink, setWaLink] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus the first field + lock body scroll.
  useEffect(() => {
    nameRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on Escape + trap focus inside the dialog.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute('disabled'));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [onClose]);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // Clear the field's error as the user types.
    if (key === 'name' || key === 'phone') {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: { name?: string; phone?: string } = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!form.phone.trim()) {
      next.phone = 'Phone number is required.';
    } else if (!isValidIndianMobile(form.phone)) {
      next.phone = 'Enter a valid 10-digit Indian mobile number.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const link = buildWhatsAppLink(product.name, {
      ...form,
      phone: normalizeIndianMobile(form.phone),
    });
    setWaLink(link);
    setSent(true);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={overlayRef}
      role="presentation"
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        aria-describedby="enquiry-product"
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry dialog"
          className="absolute top-4 right-4 p-2 rounded-lg text-[#64748B] hover:text-[#0B1D3A] hover:bg-[#F7F9FC] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!sent ? (
          <form onSubmit={handleSubmit} noValidate>
            <h3
              id="enquiry-title"
              className="font-bold text-xl text-[#0B1D3A] mb-1 pr-8"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Enquire Now
            </h3>
            <p id="enquiry-product" className="text-[#64748B] text-sm mb-5 font-medium">
              {product.brand ? `${product.brand} · ` : ''}
              {product.name}
            </p>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="enquiry-product-name"
                  className="block text-xs font-semibold text-[#0B1D3A] mb-1"
                >
                  Product
                </label>
                <input
                  id="enquiry-product-name"
                  value={product.name}
                  readOnly
                  aria-readonly="true"
                  tabIndex={-1}
                  className="w-full border border-[#E2E8F0] bg-[#F7F9FC] text-[#64748B] rounded-xl px-4 py-3 text-sm focus:outline-none cursor-default"
                />
              </div>

              <div>
                <label htmlFor="enquiry-name" className="block text-xs font-semibold text-[#0B1D3A] mb-1">
                  Your Name *
                </label>
                <input
                  id="enquiry-name"
                  ref={nameRef}
                  value={form.name}
                  onChange={set('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
                  placeholder="Ramesh Kumar"
                  autoComplete="name"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] transition-colors ${errors.name ? 'border-red-400' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && (
                  <p id="enquiry-name-error" role="alert" className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-[#0B1D3A] mb-1">
                  Phone Number *
                </label>
                <input
                  id="enquiry-phone"
                  value={form.phone}
                  onChange={set('phone')}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'enquiry-phone-error' : 'enquiry-phone-hint'}
                  placeholder="98765 43210"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] transition-colors ${errors.phone ? 'border-red-400' : 'border-[#E2E8F0]'}`}
                />
                {errors.phone ? (
                  <p id="enquiry-phone-error" role="alert" className="text-red-500 text-xs mt-1">
                    {errors.phone}
                  </p>
                ) : (
                  <p id="enquiry-phone-hint" className="text-[#94A3B8] text-xs mt-1">
                    10-digit Indian mobile number.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="enquiry-city" className="block text-xs font-semibold text-[#0B1D3A] mb-1">
                  City / Location
                </label>
                <input
                  id="enquiry-city"
                  value={form.city}
                  onChange={set('city')}
                  placeholder="Ghaziabad"
                  autoComplete="address-level2"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="enquiry-message" className="block text-xs font-semibold text-[#0B1D3A] mb-1">
                  Message
                </label>
                <textarea
                  id="enquiry-message"
                  value={form.message}
                  onChange={set('message')}
                  rows={3}
                  placeholder="Backup needed for 3 fans + 2 lights…"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B1D3A] resize-none transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#64748B] hover:border-[#0B1D3A] hover:text-[#0B1D3A] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] rounded-xl text-sm font-bold transition-colors"
              >
                Send via WhatsApp
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-2" role="status" aria-live="polite">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3
              className="font-bold text-[#0B1D3A] text-lg mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Enquiry Ready!
            </h3>
            <p className="text-[#64748B] text-sm mb-1">
              Thanks {form.name.trim() || 'there'}! WhatsApp opened with your enquiry
              for:
            </p>
            <p className="text-[#0B1D3A] text-sm font-semibold mb-5">{product.name}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#64748B] hover:border-[#0B1D3A] hover:text-[#0B1D3A] transition-colors"
              >
                Done
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] rounded-xl text-sm font-bold transition-colors inline-flex items-center justify-center"
              >
                Open WhatsApp Again
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
