import Link from 'next/link';
import { categories } from '@/data/products';

export default function CategorySection() {
  const displayCategories = categories.filter(c => c.id !== 'all');

  const gradients: Record<string, string> = {
    electronics: 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200',
    fashion: 'from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200',
    home: 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200',
    sports: 'from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200',
  };

  const textColors: Record<string, string> = {
    electronics: 'text-blue-700',
    fashion: 'text-pink-700',
    home: 'text-green-700',
    sports: 'text-orange-700',
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        <p className="text-gray-500 mt-2">Find exactly what you&apos;re looking for</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayCategories.map(category => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className={`bg-gradient-to-br ${gradients[category.id] || 'from-gray-50 to-gray-100'} rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105 hover:shadow-md`}
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className={`font-bold text-lg ${textColors[category.id] || 'text-gray-700'}`}>
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{category.count} products</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
