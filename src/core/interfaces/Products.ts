export interface Products {
  name: string;
  description: string;
  costPrice: number;
  salePrice: number;
  unitOfSale: string; // e.g., "cards"
  rating: number;
  sellOnPos: boolean;
  sellOnTill: boolean;
  rrp: number;
  variablePrice: boolean;
  taxExempt: boolean;
  warranty: number;
  manufacturer: string;
  manufactureDate: string |null; // ISO date string
  expiryDate: string |null; // ISO date string
  posOrder: string;
  buttonColor: string;
  scannableOnly: boolean;
  orderQuantityLimit: number;
  volumeOfSale: number;
  categoryId: string;
  brandId: string;
  taxRateId: string;
  
}
