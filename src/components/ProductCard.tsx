'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.badge && (
              <span className={`badge text-xs ${
                product.badge === 'Sale' ? 'bg-red-500 text-white' :
                product.badge === 'New' ? 'bg-green-500 text-white' :
                product.badge === 'Best Seller' ? 'bg-yellow-500 text-white' :
                'bg-blue-500 text-white'
              }`}>
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="badge bg-red-100 text-red-700 text-xs">-{discount}%</span>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm mb-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                added
                  ? 'bg-green-500 text-white'
                  : product.inStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {added ? '✓ Added' : '+ Cart'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
