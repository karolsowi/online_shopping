export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  images: Array<string>;
  category: string;
  brand: string;
  price: number;
  countInStock: number;
  description: string;
  rating: number;
  numReviews: number;
  isSale: boolean;
  isLatest: boolean;
  banner: string;
  reviews: ReviewType[];
  isFeatured: boolean;
};

export type ReviewType = {
  _id: string;
  createdAt: string;
  name: string;
  rating: number;
  comment: string;
};

export type ProductInputType = {
  name: string;
  slug: string;
  images: Array<string>;
  category: string;
  brand: string;
  price: number;
  countInStock: number;
  description: string;
};
