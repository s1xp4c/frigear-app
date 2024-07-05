import type {SupabaseClient} from "@supabase/supabase-js";
import {translateSupabaseError} from "@/utils/supabase/middleware";
import {NotFoundError} from "@/lib/errors";
import type {IRepository} from "@/lib/types";

export default class SupabaseRepository<
  Entity extends any,
  CreateParams extends any = Entity,
  UpdateParams extends any = Entity,
> implements IRepository<string, Entity, CreateParams, UpdateParams>
{
  constructor(
    protected tableName: string,
    protected idColumn: string,
    protected select: string,
    protected client: SupabaseClient,
  ) {}

  async all() {
    const { data, error } = await this.client
      .from(this.tableName)
      .select<typeof this.select, Entity>(this.select);
    await translateSupabaseError(error);
    if (!data) throw new NotFoundError();

    return data;
  }

  async getById(id: string): Promise<Entity> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select<typeof this.select, Entity>(this.select)
      .eq(this.idColumn, id)
      .maybeSingle();

    await translateSupabaseError(error);

    return data as Entity;
  }

  async create(attributes: CreateParams): Promise<Entity> {
    const { data, error } = await this.client
      .from(this.tableName)
      .insert(attributes)
      .select<typeof this.select, Entity>(this.select)
      .maybeSingle();

    await translateSupabaseError(error);

    if (!data) throw new Error(`Could not create ${this.tableName}.`);

    return data as Entity;
  }

  async updateById(id: string, attributes: UpdateParams): Promise<Entity> {
    const { data, error } = await this.client
      .from(this.tableName)
      .update(attributes)
      .eq(this.idColumn, id)
      .select<typeof this.select, Entity>(this.select)
      .single();

    await translateSupabaseError(error);

    return data as Entity;
  }

  async deleteById(id: string): Promise<void> {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq(this.idColumn, id);

    await translateSupabaseError(error);
  }

  async deleteAll(): Promise<void> {
    const { error } = await this.client
      .from(this.tableName)
      .delete({ count: "exact" })
      .neq(this.idColumn, "290695e8-1486-4291-97a7-c9e3da9a76c3");

    await translateSupabaseError(error);
  }
}
