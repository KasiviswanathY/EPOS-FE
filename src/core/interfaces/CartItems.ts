import { Product } from "./Products";

export interface CartItems extends Partial<Product> {
  quantity: number;
}
