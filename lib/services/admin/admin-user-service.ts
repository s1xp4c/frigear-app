import type { SupabaseClient, User } from "@supabase/supabase-js";

export default class AdminUserService {
  constructor(private client: SupabaseClient) {}

  async create({
    email,
    password,
    email_confirm,
    phone,
    phone_confirm,
  }: {
    email: string;
    password: string;
    phone?: string;
    phone_confirm?: boolean;
    email_confirm?: boolean;
  }): Promise<User | undefined> {
    const { data, error } = await this.client.auth.admin.createUser({
      email,
      password,
      email_confirm,
      phone,
      phone_confirm,
    });

    if (error) {
      throw error;
    }

    return data.user || undefined;
  }

  async getByEmail(email: string): Promise<any | undefined> {
    const { data, error } = await this.client.rpc("get_user_id_by_email", {
      email,
    });
    return data;
  }

  async deleteById(id: string) {
    const response = await this.client.auth.admin.deleteUser(id, false);
    if (response.error) {
      throw response.error;
    }
  }
}
