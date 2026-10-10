import { useState } from 'react';
import { useNav, type PageId } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { EnquiryModal } from '../components/EnquiryModal';
import { getById, getRelated, categoryLabels } from '../data/products';
import type { Product, Spec } from '../data/products';

export function ProductDetail() {
  const { navigate, selectedProductId, viewProduct } = useNav();
  const [enquireProduct, setEnquireProduct] = useState<Product | null>(null);

  const product = selectedProductId ? getById(selectedProductId) : undefined;

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#64748B] mb-4">Product not found.</p>
          <button
            onClick={() => navigate('products')}
            className="px-6 py-3 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] font-bold rounded-xl transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const categoryLabel = categoryLabels[product.category];
  const related = getRelated(product, 4);

  // Build the full spec table: card specs + extended fields (with placeholders).
  const detailSpecs: Spec[] = [
    ...product.specs,
    { label: 'Input Voltage', value: product.inputVoltage ?? '160–260V AC' },
    { label: 'Output Voltage', value: product.outputVoltage ?? '220V AC ±2%' },
    { label: 'Warranty', value: product.warranty ?? '1 Year I.VOLT Warranty' },
    { label: 'Dimensions', value: product.dimensions ?? '400 × 300 × 200 mm' },
  ].filter(
    // de-duplicate in case a card spec already covers one of these labels
    (spec, i, arr) => arr.findIndex((s) => s.label === spec.label) === i,
  );

  return (
    <div className="pt-16 min-h-screen">
      {/* Header / Breadcrumb */}
      <div className="bg-[#0B1D3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-4">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}
            <button onClick={() => navigate('products')} className="hover:text-[#F5C518] transition-colors">Products</button>
            {' '}/{'  '}
            <button onClick={() => navigate(product.category as PageId)} className="hover:text-[#F5C518] transition-colors">{categoryLabel}</button>
            {' '}/{'  '}
            <span className="text-white">{product.name}</span>
          </p>
          <button
            onClick={() => navigate(product.category as PageId)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5C518] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product image */}
          <div className="relative aspect-[4/3] bg-[#F1F5F9] rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                const t = e.currentTarget;
                if (!t.src.endsWith('/images/products/placeholder.svg')) {
                  t.src = '/images/products/placeholder.svg';
                }
              }}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#F5C518] text-[#0B1D3A] text-xs font-bold px-2.5 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            {product.condition && (
              <span className="absolute top-4 right-4 bg-[#0B1D3A] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Grade {product.condition}
              </span>
            )}
          </div>

          {/* Product info */}
          <div>
            <span className="inline-block bg-[#FFFBEA] border border-yellow-200 text-[#0B1D3A] text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {categoryLabel}
            </span>
            {product.brand && (
              <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-1">
                {product.brand}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1D3A] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {product.name}
            </h1>

            {product.description && (
              <p className="text-[#64748B] leading-relaxed mb-4">{product.description}</p>
            )}

            {product.bestFor && (
              <p className="inline-block bg-[#FFFBEA] border border-yellow-200 text-[#0B1D3A] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
                {product.bestFor}
              </p>
            )}

            {/* Price / Enquiry */}
            <div className="bg-[#F7F9FC] border border-[#E2E8F0] rounded-2xl p-5 mb-6">
              {typeof product.price === 'number' ? (
                <>
                  {product.originalPrice && (
                    <div className="text-sm text-[#94A3B8] line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </div>
                  )}
                  <div className="text-3xl font-black text-[#0B1D3A]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-[#0B1D3A]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Price on Enquiry
                  </div>
                  <p className="text-[#64748B] text-sm mt-1">
                    Tell us your requirement — we reply on WhatsApp.
                  </p>
                </>
              )}
              <button
                onClick={() => setEnquireProduct(product)}
                className="mt-4 w-full py-3.5 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] font-bold rounded-xl transition-all duration-200 hover:shadow-md"
              >
                Enquire Now
              </button>
            </div>

            {/* Specs table */}
            <h2 className="font-semibold text-[#0B1D3A] mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Specifications
            </h2>
            <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {detailSpecs.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FC]'}>
                      <td className="px-4 py-3 text-[#64748B] w-1/2">{spec.label}</td>
                      <td className="px-4 py-3 text-[#0B1D3A] font-medium">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#0B1D3A] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enquire Modal */}
      {enquireProduct && (
        <EnquiryModal product={enquireProduct} onClose={() => setEnquireProduct(null)} />
      )}
    </div>
  );
}
