export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  active: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  gallery: string[];
  price: number;
  offerPrice: number | null;
  categoryId: string;
  categoryName: string;
  stockQuantity: number;
  description: string;
  variant: string;
  freshness: string;
  active: boolean;
  featured: boolean;
  rating: number;
  tags: string[];
};
