import AuthenticationService from "@/lib/services/auth/authentication-service";
import {SupabaseClient} from "@supabase/supabase-js";
import {DependencyContainer} from "@/lib/dependency-container";
import {createSupabaseBrowserClient} from "@/utils/supabase/client";
import SupabaseProductRepository from "@/lib/repositories/product/supabase-product-repository";
import {IRepository} from "@/lib/types";

export interface AppContainer {
    supabaseClient: SupabaseClient;
    authenticationService: AuthenticationService;
    productRepository: IRepository;
}

export const appContainer = new DependencyContainer<AppContainer>();
appContainer.instance('supabaseClient', () => createSupabaseBrowserClient());
appContainer.instance('authenticationService', (container) => {
    return new AuthenticationService(container.make('supabaseClient'));
});
appContainer.instance('productRepository', (container) => {
    return new SupabaseProductRepository(container.make('supabaseClient'));
});