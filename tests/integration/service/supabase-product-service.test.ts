import {beforeEach, describe, vi} from "vitest";
import {DependencyContainer} from "@/lib/dependency-container";
import {ServerContainer} from "@/app/api/server-container";
import {createSupabaseServiceRoleClient} from "@/utils/supabase/server";

describe('service/supabase-product-service', () => {
    let container: DependencyContainer<ServerContainer> | undefined;
    beforeEach(() => {
        const supabaseClient = createSupabaseServiceRoleClient();
        vi.hoisted(() =>{

        })
    })
})