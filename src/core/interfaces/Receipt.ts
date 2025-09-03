export interface Receipt {
  id?: string;
  name: string;
  displayName: string;
  taxNumber: string;
  email: string;
  website: string;
  refundDays: number;
  message: string;
  showTaxBreakdown: boolean;
  sendEmailReceipt: boolean;
  showCustomerBalance: boolean;
  printCustomerAddress: boolean;
  showItemNodes: boolean;
  groupItemsByPromotions: boolean;
  groupItemOnPrint: boolean;
  useProductNameOnPrint: boolean;
  showBarCode: boolean;
  showProductName: boolean;
  showProductDescription: boolean;
  customFontSize: number;
  barCodeType: string;
  qrCodeLink: string;
  qrCodeDescription: string;
  guid: string;
  companyId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReceiptRequest {
  name: string;
  displayName: string;
  taxNumber: string;
  email: string;
  website: string;
  refundDays: number;
  message: string;
  showTaxBreakdown: boolean;
  sendEmailReceipt: boolean;
  showCustomerBalance: boolean;
  printCustomerAddress: boolean;
  showItemNodes: boolean;
  groupItemsByPromotions: boolean;
  groupItemOnPrint: boolean;
  useProductNameOnPrint: boolean;
  showBarCode: boolean;
  showProductName: boolean;
  showProductDescription: boolean;
  customFontSize: number;
  barCodeType: string;
  qrCodeLink: string;
  qrCodeDescription: string;
  guid: string;
}

export type UpdateReceiptRequest = Partial<CreateReceiptRequest>;
