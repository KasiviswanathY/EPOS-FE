// Basic interfaces for related entities
interface TaxRate {
  id: string;
  name: string;
  percentage: number;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface Brand {
  id: string;
  name: string;
  description?: string;
}

interface ProductTag {
  id: string;
  name: string;
  color?: string;
}

interface ContainerFee {
  id: string;
  name: string;
  fee: number;
}

interface MulitChoiceProductGroup {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  image?: string;
  description?: string;
  costPrice: number;
  salePrice: number;
  manufactureDate?: string | null;
expiryDate?: string | null;
  unitOfSale?: string; // UnitOfSale enum value
  rating?: number;
  sellOnPos: boolean;
  sellOnTill: boolean;
  rrp?: number;
  variablePrice: boolean;
  taxExempt: boolean;
  warranty?: number;
  manufacturer?: string;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  posOrder?: string;
  buttonColor?: string;
  scannableOnly: boolean;
  orderQuantityLimit: number;

  volumeOfSale?: number;


  taxRateId?: string;
  categoryId?: string;
  brandId?: string;
  productTagId?: string;
  containerFeeId?: string;
  mulitChoiceProductGroupId?: string;

  // Related data (optional, may be populated in queries)
  taxRate?: TaxRate;
  category?: Category;
  brand?: Brand;
  productTag?: ProductTag;
  containerFee?: ContainerFee;
  mulitChoiceProductGroup?: MulitChoiceProductGroup;
}
