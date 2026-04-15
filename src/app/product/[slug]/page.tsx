import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts, formatPrice } from "@/lib/data";
import { products } from "@/lib/products";
import ImageGallery from "@/components/ImageGallery";
import ConditionBadge from "@/components/ConditionBadge";
import ProductGrid from "@/components/ProductGrid";
import AddToCartButton from "./AddToCartButton";
import { ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react";

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-500 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Shop
      </Link>

      {/* Product detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <ImageGallery images={product.images} alt={product.name} />

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm text-pink-500 font-medium uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <ConditionBadge
              condition={product.condition}
              size="md"
              showFull
            />
            <span className="text-sm text-gray-500">Size {product.size}</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-6">
            {formatPrice(product.price)}
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Add to cart */}
          {product.status === "available" ? (
            <AddToCartButton product={product} />
          ) : (
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <p className="text-gray-500 font-medium">This item has been sold</p>
            </div>
          )}

          {/* Trust signals */}
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck size={18} className="text-gray-400 flex-shrink-0" />
              <span>Ships within 1-3 business days</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield size={18} className="text-gray-400 flex-shrink-0" />
              <span>Authenticity guaranteed</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RotateCcw size={18} className="text-gray-400 flex-shrink-0" />
              <span>Returns accepted within 7 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You May Also Like
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
