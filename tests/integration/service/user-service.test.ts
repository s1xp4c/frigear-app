import {beforeAll, describe, expect, it} from "vitest";
import {SupabaseClient, User} from "@supabase/supabase-js";
import AuthenticationService from "@/lib/services/auth/authentication-service";
import {createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import UserService from "@/lib/services/admin/user-service";
import {email, password} from "@/tests/mock-data";

describe('services/admin/user-service', () => {
    let client: SupabaseClient;
    let userService: UserService;
    let user: User | undefined;

    beforeAll(async () => {
        client = createSupabaseServiceRoleClient();
        userService = new UserService(client);
    });

    it('should create a new user', async () => {
        user = await userService.create({
            email: `1${email}`,
            email_confirm: true,
            password,
        });

        expect(user).toBeDefined();

        if(user){
            expect(user.email).toBe(`1${email}`);
        }
    });

    it('should delete a user', async () => {
        if (user) {
            await userService.deleteById(user.id)
        }
        // console.log(user);
    });
});