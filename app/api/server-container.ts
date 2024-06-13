import StripeWebhookHandler, {type IStripeWebhookHandler} from "@/lib/services/stripe/stripe-webhook-handler";
import ProductService from "@/lib/services/product/product-service";
import {createSupabaseServerClient, createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import {SupabaseClient} from "@supabase/supabase-js";
import {DependencyContainer} from "@/lib/dependency-container";
import type {ProductRepository} from "@/lib/repositories/product/product-repository";
import SupabaseProductRepository from "@/lib/repositories/product/supabase-product-repository";
import UserService from "@/lib/services/admin/user-service";


export interface ServerContainer {
    supabaseServiceClient: SupabaseClient
    supabaseClient: SupabaseClient
    stripeWebhookHandler: IStripeWebhookHandler;
    productService: ProductService;
    productRepository: ProductRepository;
    userService: UserService;
}

export const serverContainer = new DependencyContainer<ServerContainer>();

serverContainer.instance('supabaseServiceClient', () => createSupabaseServiceRoleClient());
serverContainer.instance('supabaseClient', () => createSupabaseServerClient());
serverContainer.instance('stripeWebhookHandler', () => new StripeWebhookHandler());
serverContainer.instance('productRepository', (container) => {
    return new SupabaseProductRepository(container.get('supabaseClient'));
});
serverContainer.instance('productService', (container) => {
    return new ProductService(container.get('productRepository'));
});
serverContainer.instance('userService', (container) => {
    return new UserService(container.get('supabaseServiceClient'));
});
