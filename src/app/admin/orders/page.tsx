"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function AdminOrdersPage() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin-auth") === "true") {
      setIsAuthed(true);
    } else {
      window.location.href = "/admin";
    }
  }, []);

  if (!isAuthed) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-500 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
      <p className="text-gray-500 mb-8">
        View completed orders and customer details
      </p>

      {/* Empty state for now */}
      <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
        <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No orders yet
        </h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Orders will appear here once customers complete their purchases
          through Stripe checkout. Connect your Stripe account to get started.
        </p>
      </div>
    </div>
  );
}
