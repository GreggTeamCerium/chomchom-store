import { products as seedProducts } from "./products";
import { Product, FilterState, Category, Condition } from "./types";

// In-memory data store (swap for Supabase later)
let productsStore: Product[] = [...seedProducts];

export function getAllProducts(): Product[] {
  return productsStore.filter((p) => p.status !== "removed");
}

export function getAvailableProducts(): Product[] {
  return productsStore.filter((p) => p.status === "available");
}

export function getFeaturedProducts(): Product[] {
  return productsStore.filter(
    (p) => p.featured && p.status === "available"
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsStore.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return productsStore.find((p) => p.id === id);
}

export function getRelatedProducts(
  productId: string,
  limit: number = 4
): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  const related = productsStore
    .filter(
      (p) =>
        p.id !== productId &&
        p.status === "available" &&
        (p.brand === product.brand || p.category === product.category)
    )
    .slice(0, limit);

  // If not enough related, fill with random available products
  if (related.length < limit) {
    const remaining = productsStore
      .filter(
        (p) =>
          p.id !== productId &&
          p.status === "available" &&
          !related.includes(p)
      )
      .slice(0, limit - related.length);
    related.push(...remaining);
  }

  return related.slice(0, limit);
}

export function filterProducts(filters: Partial<FilterState>): Product[] {
  let filtered = getAvailableProducts();

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter((p) => filters.sizes!.includes(p.size));
  }

  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter((p) => filters.brands!.includes(p.brand));
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter((p) =>
      filters.categories!.includes(p.category as Category)
    );
  }

  if (filters.conditions && filters.conditions.length > 0) {
    filtered = filtered.filter((p) =>
      filters.conditions!.includes(p.condition as Condition)
    );
  }

  if (filters.priceMin !== null && filters.priceMin !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.priceMin!);
  }

  if (filters.priceMax !== null && filters.priceMax !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.priceMax!);
  }

  // Sort
  switch (filters.sort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "brand-az":
      filtered.sort((a, b) => a.brand.localeCompare(b.brand));
      break;
    case "newest":
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return filtered;
}

export function getUniqueBrands(): string[] {
  const brands = new Set(
    getAvailableProducts().map((p) => p.brand)
  );
  return Array.from(brands).sort();
}

export function getUniqueSizes(): string[] {
  const sizes = new Set(
    getAvailableProducts().map((p) => p.size)
  );
  // Sort: letters first (XXS-XXL), then numbers
  const letterSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const allSizes = Array.from(sizes);
  const letters = allSizes
    .filter((s) => letterSizes.includes(s))
    .sort((a, b) => letterSizes.indexOf(a) - letterSizes.indexOf(b));
  const numbers = allSizes
    .filter((s) => !letterSizes.includes(s))
    .sort((a, b) => parseInt(a) - parseInt(b));
  return [...letters, ...numbers];
}

export function markProductSold(productId: string): void {
  const product = productsStore.find((p) => p.id === productId);
  if (product) {
    product.status = "sold";
    product.updatedAt = new Date().toISOString();
  }
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
