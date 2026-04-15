import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import { ArrowRight, Sparkles, Leaf, Heart } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const categoryCards = [
  { name: "Dresses", emoji: "👗", href: "/shop?categories=Dresses" },
  { name: "Tops", emoji: "👚", href: "/shop?categories=Tops" },
  { name: "Bottoms", emoji: "👖", href: "/shop?categories=Bottoms" },
  { name: "Swimwear", emoji: "👙", href: "/shop?categories=Swimwear" },
  { name: "Accessories", emoji: "👜", href: "/shop?categories=Accessories" },
  { name: "Outerwear", emoji: "🧥", href: "/shop?categories=Outerwear" },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-emerald-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-medium mb-6">
              <Sparkles size={14} />
              Pre-Loved Designer Fashion
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Beautiful clothes deserve
              <span
                className="block"
                style={{ color: "#FF3E9A" }}
              >
                a second life
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
              Shop curated designer pieces at a fraction of the retail price.
              Lilly Pulitzer, Kate Spade, Tory Burch, and more — all
              hand-selected with love.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors shadow-lg shadow-pink-500/25"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop?conditions=NWT"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full transition-colors border border-gray-200"
              >
                New With Tags
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200/30 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl" />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              New Arrivals
            </h2>
            <p className="mt-1 text-gray-500">
              Fresh finds, just in ✨
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={featured} />
        <div className="sm:hidden text-center mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-pink-500 hover:text-pink-600"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCards.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <span className="text-4xl block mb-3">{cat.emoji}</span>
                <span className="text-sm font-medium text-gray-900 group-hover:text-pink-500 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-pink-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Curated Selection
            </h3>
            <p className="text-sm text-gray-500">
              Every piece is hand-selected for quality, style, and condition.
              Only the best makes the cut.
            </p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Leaf size={24} className="text-emerald-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Sustainable Fashion
            </h3>
            <p className="text-sm text-gray-500">
              Give beautiful clothes a second life. Shopping pre-loved is
              kinder to the planet.
            </p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Heart size={24} className="text-amber-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Amazing Prices
            </h3>
            <p className="text-sm text-gray-500">
              Designer fashion at a fraction of retail. Many items still have
              their original tags!
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-pink-500 to-pink-600 py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Don&apos;t miss new arrivals
          </h2>
          <p className="text-pink-100 mb-6">
            Sign up to get notified when new pieces drop. No spam, ever.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
