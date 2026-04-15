"use client";

import { useState } from "react";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Category, Condition, SortOption } from "@/lib/types";
import { clsx } from "clsx";

interface FilterSidebarProps {
  brands: string[];
  sizes: string[];
  selectedBrands: string[];
  selectedSizes: string[];
  selectedCategories: Category[];
  selectedConditions: Condition[];
  sort: SortOption;
  onBrandsChange: (brands: string[]) => void;
  onSizesChange: (sizes: string[]) => void;
  onCategoriesChange: (categories: Category[]) => void;
  onConditionsChange: (conditions: Condition[]) => void;
  onSortChange: (sort: SortOption) => void;
  onClearAll: () => void;
  totalResults: number;
}

const categories: Category[] = [
  "Dresses",
  "Tops",
  "Bottoms",
  "Swimwear",
  "Accessories",
  "Outerwear",
];

const conditions: Condition[] = ["NWT", "NWOT", "Like New", "Gently Used"];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "brand-az", label: "Brand: A to Z" },
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 uppercase tracking-wider"
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500 cursor-pointer"
      />
      <span className="text-sm text-gray-600 group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}

export default function FilterSidebar({
  brands,
  sizes,
  selectedBrands,
  selectedSizes,
  selectedCategories,
  selectedConditions,
  sort,
  onBrandsChange,
  onSizesChange,
  onCategoriesChange,
  onConditionsChange,
  onSortChange,
  onClearAll,
  totalResults,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedSizes.length > 0 ||
    selectedCategories.length > 0 ||
    selectedConditions.length > 0;

  const toggleItem = <T extends string>(
    list: T[],
    item: T,
    setter: (items: T[]) => void
  ) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const filterContent = (
    <>
      {/* Sort */}
      <div className="pb-4 border-b border-gray-200">
        <label className="text-sm font-semibold text-gray-900 uppercase tracking-wider block mb-2">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <FilterSection title="Category">
        {categories.map((cat) => (
          <CheckboxItem
            key={cat}
            label={cat}
            checked={selectedCategories.includes(cat)}
            onChange={() =>
              toggleItem(selectedCategories, cat, onCategoriesChange)
            }
          />
        ))}
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand">
        {brands.map((brand) => (
          <CheckboxItem
            key={brand}
            label={brand}
            checked={selectedBrands.includes(brand)}
            onChange={() => toggleItem(selectedBrands, brand, onBrandsChange)}
          />
        ))}
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleItem(selectedSizes, size, onSizesChange)}
              className={clsx(
                "px-3 py-1.5 text-xs font-medium rounded-md border transition-all",
                selectedSizes.includes(size)
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-600 border-gray-300 hover:border-pink-300"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection title="Condition">
        {conditions.map((cond) => (
          <CheckboxItem
            key={cond}
            label={cond}
            checked={selectedConditions.includes(cond)}
            onChange={() =>
              toggleItem(selectedConditions, cond, onConditionsChange)
            }
          />
        ))}
      </FilterSection>

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-md hover:bg-pink-100 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">{totalResults} items</p>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {selectedBrands.length +
                selectedSizes.length +
                selectedCategories.length +
                selectedConditions.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">{filterContent}</div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <p className="text-sm text-gray-500 mb-4">{totalResults} items</p>
          {filterContent}
        </div>
      </div>
    </>
  );
}
