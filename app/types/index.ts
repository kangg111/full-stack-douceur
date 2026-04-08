// app/types/index.ts

// app/account/AccountClient.tsx
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

export interface Props {
  user: { firstName: string | null; lastName: string | null; email: string };
  initialAddresses: Address[];
}

// app/(auth)/PolicyModal.tsx
export interface PolicyContent {
  title: string;
  sections: { heading: string; body: string }[];
}

export interface Props {
  content: PolicyContent;
  onClose: () => void;
}

// lib/cart-store.ts
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

// lib/session.ts
export interface SessionData {
  userId?: number;
  email?: string;
}

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

export interface Category {
  id: number;
  name: string;
  slug: string;
}

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
