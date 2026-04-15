"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  if (inCart) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full cursor-default"
      >
        <Check size={20} />
        In Your Bag
      </button>
    );
  }

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors shadow-lg shadow-pink-500/25 active:scale-[0.98]"
    >
      <ShoppingBag size={20} />
      Add to Bag — {`$${(product.price / 100).toFixed(2)}`}
    </button>
  );
}
