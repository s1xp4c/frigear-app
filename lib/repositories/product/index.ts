type JsonBField = Record<string, any>;
export type RequiredProductFields = 'slug' | 'name';

export interface DatabaseProduct {
  id: string;
  slug: string;
  stripe_id?: string;
  last_stripe_sync?: string;
  name: string;
  active: boolean;
  price: number;
  currency_code: string;
  default_stripe_price_id?: string;
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

export type CreateProduct = Omit<
  Pick<DatabaseProduct, RequiredProductFields> &
    Partial<Omit<DatabaseProduct, RequiredProductFields>>,
  'id'
>;
export type UpdateProduct = Partial<CreateProduct>;

export interface Product extends DatabaseProduct {}
