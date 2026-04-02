'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import StarRating from '@/components/StarRating';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, toggleCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
        <button onClick={() => router.push('/products')} className="btn-primary">
          Browse Products
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    toggleCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span>/</span>
        <a href="/products" className="hover:text-blue-600">Products</a>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className={`badge text-sm px-3 py-1 ${
                product.badge === 'Sale' ? 'bg-red-100 text-red-700' :
                product.badge === 'New' ? 'bg-green-100 text-green-700' :
                product.badge === 'Best Seller' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {product.badge}
              </span>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center">
              <span className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{product.category}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <StarRating rating={product.rating} />
            <span className="text-gray-600 text-sm">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                <span className="badge bg-red-100 text-red-700 text-sm px-3 py-1">{discount}% OFF</span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity */}
          {product.inStock && (
            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : product.inStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold border-2 transition-colors ${
                product.inStock
                  ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🚚</span> Free shipping over $50
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>↩️</span> 30-day returns
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🔒</span> Secure payment
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>⭐</span> Quality guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex border-b border-gray-200 mb-6">
          {['description', 'reviews', 'shipping'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="prose max-w-none">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Premium quality materials</li>
                    <li>• Durable construction</li>
                    <li>• Ergonomic design</li>
                    <li>• Easy to use</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">In the Box</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1x {product.name}</li>
                    <li>• User Manual</li>
                    <li>• Warranty Card</li>
                    <li>• Accessories</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                  <StarRating rating={product.rating} />
                  <div className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-4">{star}</span>
                      <span className="text-yellow-400 text-xs">★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${star === Math.round(product.rating) ? 60 : star > product.rating ? 10 : 30}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {String.fromCharCode(64 + i)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Customer {i}</div>
                        <StarRating rating={5 - (i - 1) * 0.5} size="sm" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Great product! Exactly as described. Fast shipping and excellent quality. Would definitely recommend to others.</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                <span className="text-2xl">🚚</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Standard Shipping</h4>
                  <p className="text-gray-600 text-sm">5-7 business days. Free on orders over $50.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Express Shipping</h4>
                  <p className="text-gray-600 text-sm">2-3 business days. $12.99 flat rate.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                <span className="text-2xl">↩️</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Returns</h4>
                  <p className="text-gray-600 text-sm">30-day hassle-free returns. Items must be in original condition.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
