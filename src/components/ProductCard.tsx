import type { Product } from '../data/products';
import { useNav } from '../context/NavigationContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { viewProduct } = useNav();

  return (
    <div
      onClick={() => viewProduct(product.id)}
      className="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-[4/3] bg-[#F1F5F9] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
        <h3 className="font-semibold text-[#0B1D3A] text-base mb-3 leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="space-y-1.5 mb-4">
          {product.specs.slice(0, 3).map((spec, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-[#64748B]">{spec.label}</span>
              <span className="text-[#0B1D3A] font-medium text-right">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#F1F5F9] pt-4 flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              viewProduct(product.id);
            }}
            className="px-4 py-2 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-md whitespace-nowrap"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
