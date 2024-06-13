import StripeWebhookHandler, {type IStripeWebhookHandler} from "@/lib/services/stripe/stripe-webhook-handler";
import ProductService from "@/lib/services/product/product-service";
import {createSupabaseServerClient, createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import {SupabaseClient} from "@supabase/supabase-js";
import {DependencyContainer} from "@/lib/dependency-container";
import type {ProductRepository} from "@/lib/repositories/product/product-repository";
import SupabaseProductRepository from "@/lib/repositories/product/supabase-product-repository";


export interface ServerContainer {
    supabaseServiceClient: SupabaseClient
    supabaseClient: SupabaseClient
    stripeWebhookHandler: IStripeWebhookHandler;
    productService: ProductService;
    productRepository: ProductRepository;
}

export const serverContainer = new DependencyContainer<ServerContainer>();

serverContainer.service('supabaseServiceClient', () => createSupabaseServiceRoleClient());
serverContainer.service('supabaseClient', () => createSupabaseServerClient());
serverContainer.service('stripeWebhookHandler', () => new StripeWebhookHandler());
serverContainer.service('productRepository', (container) => {
    return new SupabaseProductRepository(container.get('supabaseClient'));
});
serverContainer.service('productService', (container) => {
    return new ProductService(container.get('productRepository'));
});
