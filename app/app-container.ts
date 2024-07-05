import AuthenticationService from "@/lib/services/auth/authentication-service";
import { SupabaseClient } from "@supabase/supabase-js";
import { DependencyContainer } from "@/lib/dependency-container";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import SupabaseProductRepository, {
  IProductRepository,
} from "@/lib/repositories/product/supabase-product-repository";

export interface AppContainer {
  supabaseClient: SupabaseClient;
  authenticationService: AuthenticationService;
  productRepository: IProductRepository;
}

export const appContainer = new DependencyContainer<AppContainer>();
appContainer.instance("supabaseClient", () => createSupabaseBrowserClient());
appContainer.instance("authenticationService", (container) => {
  return new AuthenticationService(container.make("supabaseClient"));
});
appContainer.instance("productRepository", (container) => {
  return new SupabaseProductRepository(container.make("supabaseClient"));
});
