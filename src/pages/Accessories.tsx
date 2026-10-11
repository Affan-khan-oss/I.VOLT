import { useNav } from '../context/NavigationContext';
import { ProductCard } from '../components/ProductCard';
import { getByCategory } from '../data/products';

export function Accessories() {
  const { navigate } = useNav();
  const accessories = getByCategory('accessories');

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-[#0B1D3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}
            <button onClick={() => navigate('products')} className="hover:text-[#F5C518] transition-colors">Products</button>
            {' '}/{'  '}Accessories
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Accessories
          </h1>
          <p className="text-[#94A3B8] max-w-xl">
            Complete your power setup with our range of trolleys, stabilizers, cables, and smart power accessories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {accessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
