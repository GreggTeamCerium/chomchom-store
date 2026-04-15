import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import ConditionBadge from "./ConditionBadge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasImage = product.images.length > 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-emerald-50">
            <span className="text-4xl mb-2">👗</span>
            <span className="text-xs text-gray-400 font-medium">
              {product.brand}
            </span>
          </div>
        )}

        {/* Condition badge overlay */}
        <div className="absolute top-2 left-2">
          <ConditionBadge condition={product.condition} />
        </div>

        {/* Sold overlay */}
        {product.status === "sold" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              Sold
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <p className="text-xs text-pink-500 font-medium uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-gray-500">Size {product.size}</span>
        </div>
      </div>
    </Link>
  );
}
