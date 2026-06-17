export type AttributeType = {
  name: string;
  values: string[];
};

export type VariantType = {
  combination: {
    Color?: string;
    Size?: string;
    [key: string]: string | undefined; 
  };
  price: number;
  stock: number;
};

export type ProductTypes = {
  _id: string;
  name: string;
  description: string;
  price: number; 
  imageUrl: string;
  category: string;
  keywords: string[];
  isFeatured: boolean;
  attributes: AttributeType[]; 
  variants: VariantType[];    
  aiSummary: string;
  aiSummaryUpdatedAt: Date; 
};

export type ProductAdminTypes = Omit<ProductTypes, "_id" | "attributes" | "variants">;