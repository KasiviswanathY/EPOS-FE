export interface CustomerType {
  id: string;
  name: string;
  description?: string;
  discount?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
