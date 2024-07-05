import { IRepository } from "@/lib/types";

export interface ShoppingCartItem<Product extends any> {
  id: string;
  product: Product;
  quantity: number;
}

export interface ShoppingCartService<ProductEntity extends any>
  extends IRepository<string, ShoppingCartItem<ProductEntity>, object, object> {
  setQuantityById(
    id: string,
    quantity: number,
  ): Promise<ShoppingCartItem<ProductEntity>>;
}
