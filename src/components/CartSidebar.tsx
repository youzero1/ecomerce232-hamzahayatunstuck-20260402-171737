'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
  const { state, removeItem, updateQuantity, totalPrice, totalItems, closeCart } = useCart();

  if (!state.isOpen) return null;

  const shipping = totalPrice >= 50 ? 0 : 9.99;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map(item => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-sm text-blue-600 font-semibold mt-1">${item.product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 text-sm transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-400 hover:text-red-600 transition-colors self-start mt-1"
                    aria-label="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-3">
            {shipping === 0 ? (
              <p className="text-xs text-green-600 text-center bg-green-50 py-2 rounded-lg">🎉 You qualify for free shipping!</p>
            ) : (
              <p className="text-xs text-gray-500 text-center">
                Add ${(50 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="w-full border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors block text-center text-sm"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors block text-center text-sm"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
