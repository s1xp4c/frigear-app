import AuthenticationService from "@/lib/services/auth/authentication-service";
import {SupabaseClient} from "@supabase/supabase-js";
import {DependencyContainer} from "@/lib/dependency-container";
import {createSupabaseBrowserClient} from "@/utils/supabase/client";
import {ProductRepository} from "@/lib/repositories/product/product-repository";
import SupabaseProductRepository from "@/lib/repositories/product/supabase-product-repository";

export interface AppContainer {
    supabaseClient: SupabaseClient;
    authenticationService: AuthenticationService;
    productRepository: ProductRepository;
}

export const appContainer = new DependencyContainer<AppContainer>();
appContainer.instance('supabaseClient', () => createSupabaseBrowserClient());
appContainer.instance('authenticationService', (container) => {
    return new AuthenticationService(container.get('supabaseClient'));
});
appContainer.instance('productRepository', (container) => {
    return new SupabaseProductRepository(container.get('supabaseClient'));
});