"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "./CartProvider";
import { useState } from "react";

export default function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 -ml-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center">
            <span
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: "#FF3E9A",
              }}
            >
              Chom Chom
            </span>
            <span
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: "#18B35D" }}
            >
              Store
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              Shop All
            </Link>
            <Link
              href="/shop?categories=Dresses"
              className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              Dresses
            </Link>
            <Link
              href="/shop?categories=Tops"
              className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              Tops
            </Link>
            <Link
              href="/shop?brands=Lilly+Pulitzer"
              className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              Lilly Pulitzer
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="p-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Search size={20} />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden pb-4 border-t border-gray-100">
            <nav className="flex flex-col gap-3 pt-4">
              <Link
                href="/shop"
                className="text-sm font-medium text-gray-700 hover:text-pink-500 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All
              </Link>
              <Link
                href="/shop?categories=Dresses"
                className="text-sm font-medium text-gray-700 hover:text-pink-500 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dresses
              </Link>
              <Link
                href="/shop?categories=Tops"
                className="text-sm font-medium text-gray-700 hover:text-pink-500 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tops
              </Link>
              <Link
                href="/shop?brands=Lilly+Pulitzer"
                className="text-sm font-medium text-gray-700 hover:text-pink-500 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Lilly Pulitzer
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
