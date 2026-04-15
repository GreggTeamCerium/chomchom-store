export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  size: string;
  condition: Condition;
  price: number; // in cents
  description: string;
  images: string[];
  status: ProductStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  stripeSessionId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type Category =
  | "Dresses"
  | "Tops"
  | "Bottoms"
  | "Swimwear"
  | "Accessories"
  | "Outerwear";

export type Condition = "NWT" | "NWOT" | "Like New" | "Gently Used";

export type ProductStatus = "available" | "sold" | "removed";

export type OrderStatus = "completed" | "refunded";

export type SortOption =
  | "newest"
  | "price-low"
  | "price-high"
  | "brand-az";

export interface FilterState {
  sizes: string[];
  brands: string[];
  categories: Category[];
  conditions: Condition[];
  priceMin: number | null;
  priceMax: number | null;
  search: string;
  sort: SortOption;
}
