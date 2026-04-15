"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { filterProducts, getUniqueBrands, getUniqueSizes } from "@/lib/data";
import { Category, Condition, SortOption } from "@/lib/types";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Loading shop...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();

  // Initialize filters from URL params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brands")?.split(",").filter(Boolean) || []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    searchParams.get("sizes")?.split(",").filter(Boolean) || []
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    (searchParams.get("categories")?.split(",").filter(Boolean) || []) as Category[]
  );
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>(
    (searchParams.get("conditions")?.split(",").filter(Boolean) || []) as Condition[]
  );
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "newest"
  );

  const brands = useMemo(() => getUniqueBrands(), []);
  const sizes = useMemo(() => getUniqueSizes(), []);

  const filteredProducts = useMemo(
    () =>
      filterProducts({
        search,
        brands: selectedBrands,
        sizes: selectedSizes,
        categories: selectedCategories,
        conditions: selectedConditions,
        sort,
      }),
    [search, selectedBrands, selectedSizes, selectedCategories, selectedConditions, sort]
  );

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedBrands.length) params.set("brands", selectedBrands.join(","));
    if (selectedSizes.length) params.set("sizes", selectedSizes.join(","));
    if (selectedCategories.length) params.set("categories", selectedCategories.join(","));
    if (selectedConditions.length) params.set("conditions", selectedConditions.join(","));
    if (sort !== "newest") params.set("sort", sort);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [search, selectedBrands, selectedSizes, selectedCategories, selectedConditions, sort]);

  const clearAllFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedConditions([]);
    setSort("newest");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
        <p className="mt-1 text-gray-500">Browse our curated collection</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by name, brand, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
        />
      </div>

      {/* Layout: sidebar + grid */}
      <div className="flex gap-8">
        <FilterSidebar
          brands={brands}
          sizes={sizes}
          selectedBrands={selectedBrands}
          selectedSizes={selectedSizes}
          selectedCategories={selectedCategories}
          selectedConditions={selectedConditions}
          sort={sort}
          onBrandsChange={setSelectedBrands}
          onSizesChange={setSelectedSizes}
          onCategoriesChange={setSelectedCategories}
          onConditionsChange={setSelectedConditions}
          onSortChange={setSort}
          onClearAll={clearAllFilters}
          totalResults={filteredProducts.length}
        />
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={filteredProducts}
            emptyMessage="No items match your filters"
          />
        </div>
      </div>
    </div>
  );
}
