import { products } from '@/data/products';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function FeaturedProducts() {
  const featured = products.filter(p => p.badge).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-500 mt-1">Handpicked deals just for you</p>
        </div>
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
        >
          View All
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
