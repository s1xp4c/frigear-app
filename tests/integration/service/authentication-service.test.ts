import {beforeAll, describe, expect, it} from "vitest";
import AuthenticationService from "@/lib/services/auth/authentication-service";
import {SupabaseClient, User} from "@supabase/supabase-js";
import {createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import {email, password} from "@/tests/mock-data";
import AdminUserService from "@/lib/services/admin/admin-user-service";

describe("service#auth/authentication-service", () => {
  let client: SupabaseClient;
  let authenticationService: AuthenticationService;
  let userService: AdminUserService;
  let user: User | undefined;

  beforeAll(async () => {
    client = createSupabaseServiceRoleClient();
    userService = new AdminUserService(client);
    authenticationService = new AuthenticationService(client);
  });

  it("should sign up a user with email and password", async () => {
    user = await authenticationService.signUpWithEmailAndPassword(
      email,
      password,
    );
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
  });

  it("should sign in with email and password", async () => {
    user = await authenticationService.loginWithEmailAndPassword(
      email,
      password,
    );
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    await userService.deleteById(user.id);
  });
  // it('should sign in with magic email link',async () => {
  //     user = await authenticationService.signInWithMagicEmailLink(email);
  // });
});
