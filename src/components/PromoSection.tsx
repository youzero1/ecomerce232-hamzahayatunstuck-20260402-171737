import Link from 'next/link';

export default function PromoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Promo 1 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="relative z-10">
            <span className="inline-block bg-white bg-opacity-20 text-sm font-medium px-3 py-1 rounded-full mb-4">Limited Time</span>
            <h3 className="text-2xl font-bold mb-2">Electronics Sale</h3>
            <p className="text-blue-200 mb-6">Up to 40% off on premium electronics. Don&apos;t miss out!</p>
            <Link
              href="/products?category=electronics"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Shop Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Promo 2 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="relative z-10">
            <span className="inline-block bg-white bg-opacity-20 text-sm font-medium px-3 py-1 rounded-full mb-4">New Arrivals</span>
            <h3 className="text-2xl font-bold mb-2">Fashion & Style</h3>
            <p className="text-purple-200 mb-6">Explore the latest fashion trends and accessories.</p>
            <Link
              href="/products?category=fashion"
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-purple-50 transition-colors"
            >
              Explore
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
          { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
          { icon: '🔒', title: 'Secure Payment', desc: '100% secure checkout' },
          { icon: '💬', title: '24/7 Support', desc: 'Always here to help' },
        ].map(feature => (
          <div key={feature.title} className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
            <p className="text-gray-500 text-xs mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
