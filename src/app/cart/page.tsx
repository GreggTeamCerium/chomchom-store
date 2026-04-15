"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/data";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, total, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your bag is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything yet!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-500 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Bag ({itemCount} {itemCount === 1 ? "item" : "items"})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product }) => (
            <div
              key={product.id}
              className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg"
            >
              {/* Image */}
              <Link
                href={`/product/${product.slug}`}
                className="relative w-24 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden"
              >
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-2xl">
                    👗
                  </div>
                )}
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-pink-500 font-medium uppercase tracking-wide">
                  {product.brand}
                </p>
                <Link
                  href={`/product/${product.slug}`}
                  className="text-sm font-medium text-gray-900 hover:text-pink-500 transition-colors line-clamp-2"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  Size {product.size} · {product.condition}
                </p>
                <p className="text-base font-bold text-gray-900 mt-2">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(product.id)}
                className="self-start p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-lg text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            <form action="/api/checkout" method="POST">
              <input type="hidden" name="items" value={JSON.stringify(
                items.map(({ product }) => ({
                  productId: product.id,
                  name: product.name,
                  brand: product.brand,
                  size: product.size,
                  price: product.price,
                  image: product.images[0] || "",
                }))
              )} />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors shadow-lg shadow-pink-500/25"
              >
                Proceed to Checkout
              </button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
