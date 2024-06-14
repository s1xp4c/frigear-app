import {CreateProduct, Product, UpdateProduct} from "@/lib/repositories/product";

export type RequiredKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T];

export type StripOptional<T> = {
    [K in RequiredKeys<T>]: T[K];
};

export type OptionalKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T];

export type KeepOptional<T> = {
    [K in OptionalKeys<T>]?: T[K];
};

export interface IRepository<IdType extends any = string, Entity extends any = any, Create extends any = any, Update extends any = any> {
    all(): Promise<Entity[]>;

    getById(id: IdType): Promise<Entity>;

    getBySlug(slug: string): Promise<Entity>;

    getBySecondaryId(secondaryId: string): Promise<Entity>;

    create(attributes: Create): Promise<Entity>;

    updateById(id: IdType, attributes: Update): Promise<Entity>;

    deleteById(id: IdType): Promise<void>;

    deleteAll(): Promise<void>;
}