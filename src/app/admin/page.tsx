"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts, formatPrice } from "@/lib/data";
import { Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple password auth (check against hardcoded or env)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, use env var. For demo, accept "chomchom2026"
    if (password === "chomchom2026") {
      setIsAuthed(true);
      sessionStorage.setItem("admin-auth", "true");
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin-auth") === "true") {
      setIsAuthed(true);
    }
  }, []);

  if (!isAuthed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
        >
          <h1 className="text-xl font-bold text-gray-900 mb-1">Admin Login</h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your admin password to continue
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none mb-4"
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  const allProducts = getAllProducts();
  const available = allProducts.filter((p) => p.status === "available");
  const sold = allProducts.filter((p) => p.status === "sold");
  const revenue = sold.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back to Chom Chom Store admin</p>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("admin-auth");
            setIsAuthed(false);
          }}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Package size={20} className="text-pink-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {allProducts.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {available.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sold</p>
              <p className="text-2xl font-bold text-gray-900">{sold.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(revenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/products"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:border-pink-300 hover:shadow-md transition-all group"
        >
          <h3 className="font-semibold text-gray-900 group-hover:text-pink-500 transition-colors mb-1">
            Manage Products
          </h3>
          <p className="text-sm text-gray-500">
            Add, edit, or remove product listings
          </p>
        </Link>
        <Link
          href="/admin/orders"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:border-pink-300 hover:shadow-md transition-all group"
        >
          <h3 className="font-semibold text-gray-900 group-hover:text-pink-500 transition-colors mb-1">
            View Orders
          </h3>
          <p className="text-sm text-gray-500">
            See completed orders and customer details
          </p>
        </Link>
      </div>
    </div>
  );
}
