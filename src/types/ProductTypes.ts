export type ProductTypes = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  keywords: string[];
  isFeatured: boolean;
};

export type ProductAdminTypes = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  keywords: string[];
  isFeatured: boolean;

}