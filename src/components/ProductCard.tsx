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
  const cardSpecs = product.specs.slice(0, 3);

  return (
    <>
      <div
        onClick={() => viewProduct(product.id)}
        className="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
        <div className="relative aspect-[4/3] bg-[#F1F5F9] overflow-hidden shrink-0">
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            onError={() => {
              if (imgSrc !== PLACEHOLDER_IMG) setImgSrc(PLACEHOLDER_IMG);
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#F5C518] text-[#0B1D3A] text-xs font-bold px-2.5 py-1 rounded-full max-w-[70%] truncate">
              {product.badge}
            </span>
          )}
          {product.condition && (
            <span className="absolute top-3 right-3 bg-[#0B1D3A] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Grade {product.condition}
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-1 h-4 truncate">
            {product.brand ?? '\u00A0'}
          </p>
          <h3 className="font-semibold text-[#0B1D3A] text-base mb-2 leading-snug line-clamp-2 min-h-[2.75rem]">
            {product.name}
          </h3>

          <p className="text-sm text-[#64748B] leading-relaxed mb-3 line-clamp-2 min-h-[2.625rem]">
            {product.description ?? '\u00A0'}
          </p>

          <div className="space-y-1.5 mb-3">
            {cardSpecs.map((spec, i) => (
              <div key={i} className="flex justify-between items-center gap-3 text-sm h-5">
                <span className="text-[#64748B] shrink-0">{spec.label}</span>
                <span className="text-[#0B1D3A] font-medium text-right truncate min-w-0 flex-1">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="min-h-[3rem] mb-3 flex items-start">
            {product.bestFor ? (
              <p className="inline-block bg-[#FFFBEA] border border-yellow-200 text-[#0B1D3A] text-xs font-medium px-2.5 py-1 rounded-full line-clamp-2">
                {product.bestFor}
              </p>
            ) : (
              <span aria-hidden="true" className="invisible text-xs px-2.5 py-1">
                {'\u00A0'}
              </span>
            )}
          </div>

          <div className="border-t border-[#F1F5F9] pt-4 mt-auto flex items-center gap-2">
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
