import { useState } from 'react';
import type { Product } from '../data/products';
import { useNav } from '../context/NavigationContext';
import { EnquiryModal } from './EnquiryModal';

const PLACEHOLDER_IMG = '/images/products/placeholder.svg';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { viewProduct } = useNav();
  const [imgSrc, setImgSrc] = useState(product.image);
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <>
      <div
        onClick={() => viewProduct(product.id)}
        className="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <div className="relative aspect-[4/3] bg-[#F1F5F9] overflow-hidden">
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            onError={() => {
              if (imgSrc !== PLACEHOLDER_IMG) setImgSrc(PLACEHOLDER_IMG);
            }}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#F5C518] text-[#0B1D3A] text-xs font-bold px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {product.condition && (
            <span className="absolute top-3 right-3 bg-[#0B1D3A] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Grade {product.condition}
            </span>
          )}
        </div>

        <div className="p-5">
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-1">
              {product.brand}
            </p>
          )}
          <h3 className="font-semibold text-[#0B1D3A] text-base mb-2 leading-snug line-clamp-2">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm text-[#64748B] leading-relaxed mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="space-y-1.5 mb-3">
            {product.specs.slice(0, 4).map((spec, i) => (
              <div key={i} className="flex justify-between items-center gap-3 text-sm">
                <span className="text-[#64748B] shrink-0">{spec.label}</span>
                <span className="text-[#0B1D3A] font-medium text-right line-clamp-1">{spec.value}</span>
              </div>
            ))}
          </div>

          {product.bestFor && (
            <p className="inline-block bg-[#FFFBEA] border border-yellow-200 text-[#0B1D3A] text-xs font-medium px-2.5 py-1 rounded-full mb-3">
              {product.bestFor}
            </p>
          )}

          {typeof product.price === 'number' && (
            <div className="mb-3">
              {product.originalPrice && (
                <div className="text-sm text-[#94A3B8] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </div>
              )}
              <div
                className="text-xl font-black text-[#0B1D3A]"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </div>
            </div>
          )}

          <div className="border-t border-[#F1F5F9] pt-4 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                viewProduct(product.id);
              }}
              className="flex-1 px-4 py-2 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-md whitespace-nowrap"
            >
              Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEnquiry(true);
              }}
              aria-label={`Enquire about ${product.name}`}
              className="flex-1 px-4 py-2 border border-[#0B1D3A] text-[#0B1D3A] hover:bg-[#0B1D3A] hover:text-white text-sm font-bold rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              Enquiry
            </button>
          </div>
        </div>
      </div>

      {showEnquiry && (
        <EnquiryModal product={product} onClose={() => setShowEnquiry(false)} />
      )}
    </>
  );
}
