export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  restaurant_id: string;
  category_id?: string;
  created_at: Date;
  updated_at: Date;
  image?: string;
}
