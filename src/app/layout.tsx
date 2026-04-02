import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopNext - Your Premium Online Store',
  description: 'Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods, and more.',
  keywords: 'ecommerce, online shopping, electronics, fashion, home goods',
  openGraph: {
    title: 'ShopNext - Your Premium Online Store',
    description: 'Discover amazing products at unbeatable prices.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">ShopNext</h3>
                  <p className="text-gray-400 text-sm">Your premium destination for quality products at amazing prices.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
                    <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                    <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Categories</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li><a href="/products?category=electronics" className="hover:text-white transition-colors">Electronics</a></li>
                    <li><a href="/products?category=fashion" className="hover:text-white transition-colors">Fashion</a></li>
                    <li><a href="/products?category=home" className="hover:text-white transition-colors">Home & Living</a></li>
                    <li><a href="/products?category=sports" className="hover:text-white transition-colors">Sports</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} ShopNext. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
