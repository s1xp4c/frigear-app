"use client";

import type {ShoppingCartItem} from "@/lib/services/shop/shopping-cart/shopping-cart-service";
import {IRepository} from "@/lib/types";

export default class LocalstorageRepository<Model extends any>
  implements IRepository<string, Model, object, object>
{
  constructor(private storagePrefix: string) {}

  all(): Promise<Model[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  getBySlug(slug: string): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  getBySecondaryId(secondaryId: string): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  create(attributes: object): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  updateById(id: string, attributes: object): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private key(id: string): string {
    return `${this.storagePrefix}.${id}`;
  }

  async setQuantityForItem(
    id: string,
    quantity: number,
  ): Promise<ShoppingCartItem<Model>> {
    throw new Error("Method not implemented.");
  }
}
