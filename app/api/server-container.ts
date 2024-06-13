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

let containerInstance: DependencyContainer<ServerContainer> | undefined;

export function serverContainer(): DependencyContainer<ServerContainer> {
    if (!containerInstance) {
        containerInstance = new DependencyContainer()
        containerInstance.service('supabaseServiceClient', () => createSupabaseServiceRoleClient());
        containerInstance.service('supabaseClient', () => createSupabaseServerClient());
        containerInstance.service('stripeWebhookHandler', () => new StripeWebhookHandler());
        containerInstance.service('productRepository', (container) => {
            return new SupabaseProductRepository(container.get('supabaseClient'));
        });
        containerInstance.service('productService', (container) => {
            return new ProductService(container.get('productRepository'));
        });
    }

    return containerInstance;
}