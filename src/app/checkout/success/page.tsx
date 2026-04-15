import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <CheckCircle size={64} className="mx-auto text-emerald-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Order Confirmed! 🎉
      </h1>
      <p className="text-gray-600 mb-2">
        Thank you for shopping with Chom Chom Store!
      </p>
      <p className="text-gray-500 text-sm mb-8">
        You&apos;ll receive a confirmation email shortly with your order details.
        Your items will ship within 1-3 business days.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors"
      >
        Continue Shopping
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
