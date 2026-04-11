// app/types/index.ts

// ── Address ──
export interface Address {
  id: number;
  firstName: string;
  lastName: string;
  company?: string | null;
  address: string;
  apartment?: string | null;
  postcode: string;
  city: string;
  state: string;
  phone: string;
  isDefault: boolean;
}

// ── Account ──
export interface AccountProps {
  user: { firstName: string | null; lastName: string | null; email: string };
  initialAddresses: Address[];
}

// ── Policy Modal ──
export interface PolicyContent {
  title: string;
  sections: { heading: string; body: string }[];
}

export interface PolicyProps {
  content: PolicyContent;
  onClose: () => void;
}

// ── Cart ──
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// ── Session ──
export interface SessionData {
  userId?: number;
  email?: string;
}

// ── Location ──
export interface Location {
  index: string;
  type: string;
  name: string;
  fullName: string;
  address: string[];
  phone: string;
  hours: { label: string; time: string }[];
  orderLabel: string;
  orderHref: string;
  mapsUrl: string;
  features: string[];
  image: string;
  accent: string;
  flip: boolean;
}

// ── Category ──
export interface Category {
  id: number;
  name: string;
  slug: string;
}

// ── Product ──
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  tagline: string;
  preOrderDays: number;
  descriptionFull: string;
  size: string;
  serves: string;
  alcoholIntensity: string;
  umami: string;
  suggestedFor: string;
  servingTip: string;
  isAvailable: boolean;
  isFeatured: boolean;
  categoryId: number;
  category: Category;
}
