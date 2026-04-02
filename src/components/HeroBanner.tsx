import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-3 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span>🎉</span>
              <span>New arrivals every week</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Discover
              <span className="block text-blue-200">Amazing</span>
              Products
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Shop the latest trends in electronics, fashion, home goods, and more.
              Unbeatable prices with premium quality guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-white text-blue-700 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/products?category=electronics"
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-blue-700 transition-colors"
              >
                View Electronics
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-10">
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-blue-200 text-sm">Products</div>
              </div>
              <div className="w-px h-10 bg-white opacity-30"></div>
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-blue-200 text-sm">Happy Customers</div>
              </div>
              <div className="w-px h-10 bg-white opacity-30"></div>
              <div>
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-blue-200 text-sm">Rating</div>
              </div>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { emoji: '⚡', label: 'Electronics', color: 'from-yellow-400 to-orange-400' },
              { emoji: '👗', label: 'Fashion', color: 'from-pink-400 to-rose-400' },
              { emoji: '🏠', label: 'Home & Living', color: 'from-green-400 to-teal-400' },
              { emoji: '🏃', label: 'Sports', color: 'from-purple-400 to-indigo-400' },
            ].map(cat => (
              <Link
                key={cat.label}
                href={`/products?category=${cat.label.toLowerCase().replace(' & living', '')}`}
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="font-semibold text-white text-sm">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
