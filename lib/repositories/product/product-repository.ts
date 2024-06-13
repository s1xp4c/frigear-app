//  id               uuid    not null         default gen_random_uuid() primary key,
//     slug             text    not null unique,
//     stripe_id        text                     default null,
//     last_stripe_sync timestamp with time zone default null,
//     name             text    not null,
//     active           boolean not null         default true,
//     description      text                     default null,
//     features         jsonb   not null         default '{}'::jsonb,
//     tags             jsonb   not null         default '[]'::jsonb,
//     related_ids      jsonb   not null         default '[]'::jsonb,
//     replaced_by      uuid                     default null references public.product (id) on delete cascade,
//     meta             jsonb   not null         default '{}'::jsonb,
//     metrics          jsonb   not null         default '{}'::jsonb,
//     discontinued_at  timestamp with time zone default null,
//     created_at       timestamp with time zone default now(),
//     updated_at       timestamp with time zone default null
import {KeepOptional, StripOptional} from "@/lib/types";

type JsonBField = Record<string, any>;
export type RequiredProductFields = 'slug' | 'name';

export interface DatabaseProduct {
    id: string;
    slug: string;
    stripe_id?: string;
    last_stripe_sync?: string;
    name: string;
    active: boolean;
    description?: string;
    features?: JsonBField;
    tags: string[];
    related_ids?: string[];
    replaced_by?: string;
    meta: JsonBField;
    metrics: JsonBField;
    discontinued_at?: string;
    created_at?: string;
    updated_at?: string;
}

export type CreateProduct = Omit<Pick<DatabaseProduct, RequiredProductFields> & Partial<Omit<DatabaseProduct, RequiredProductFields>>, 'id'>;
export type UpdateProduct = Omit<CreateProduct, 'slug'> & Partial<Pick<CreateProduct, 'slug'>>;

export interface Product extends DatabaseProduct {}

export interface ProductRepository {
    all(): Promise<Product[]>;

    getById(id: string): Promise<Product>;

    getBySlug(slug: string): Promise<Product>;

    create(product: CreateProduct): Promise<Product>;

    updateById(id: string, attributes: UpdateProduct): Promise<Product>;

    deleteById(id: string): Promise<void>;

    deleteAll(): Promise<void>;
}