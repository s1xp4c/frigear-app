export interface Product {
    id: string;
    name: string;
    active: boolean;
    stripe_id?: string;
}

export interface ProductService {
    all(): Promise<Product[]>;

    getById(id: string): Promise<Product>;

    getBySlug(slug: string): Promise<Product>;

    create(attributes: Partial<Omit<Product, 'id'>>): Promise<Product>;

    updateById(id: string, attributes: Partial<Product>): Promise<Product>;

    deleteById(id: string): Promise<void>;
}