import StripeWebhookHandler, {type IStripeWebhookHandler} from "@/lib/services/webhooks/stripe-webhook-handler";
import ProductService, {IProductService} from "@/lib/services/product/product-service";
import {createSupabaseServerClient, createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import {SupabaseClient} from "@supabase/supabase-js";
import {DependencyContainer} from "@/lib/dependency-container";
import type {ProductRepository} from "@/lib/repositories/product/product-repository";
import SupabaseProductRepository from "@/lib/repositories/product/supabase-product-repository";
import UserService from "@/lib/services/admin/user-service";
import Stripe from "stripe";
import StripeProductService from "@/lib/services/product/stripe-product-service";
import StripePriceService from "@/lib/services/product/stripe-price-service";
import StripeProductIOService from "@/lib/services/product/stripe-product-io-service";


export interface ServerContainer {
    //It is important that we pass the correct client on the server
    // supabaseServiceClient is using the service_role key.
    supabaseServiceClient: SupabaseClient;
    // supabaseClient is the anon OR authenticated user's token being used
    supabaseClient: SupabaseClient;
    productService: IProductService;
    productRepository: ProductRepository;
    adminProductService: IProductService;
    adminProductRepository: ProductRepository;
    userService: UserService;
    stripeAdminClient: Stripe
    stripeProductService: StripeProductService;
    stripePriceService: StripePriceService;
    stripeWebhookHandler: IStripeWebhookHandler;
    stripeProductIOService: StripeProductIOService;
}

export const apiContainer = new DependencyContainer<ServerContainer>();

apiContainer.instance('supabaseServiceClient', () => createSupabaseServiceRoleClient());
apiContainer.instance('supabaseClient', () => createSupabaseServerClient());
apiContainer.instance('productRepository', (container) => {
    //It is important that we pass the correct client on the server
    // supabaseClient is the anon OR authenticated user's token being used
    return new SupabaseProductRepository(container.get('supabaseClient'));
});
apiContainer.instance('productService', (container) => {
    return new ProductService(container.get('productRepository'), container.get('stripePriceService'));
});
apiContainer.instance('adminProductRepository', (container) => {
    return new SupabaseProductRepository(container.get('supabaseServiceClient'));
})
apiContainer.instance('adminProductService', (container) => {
    return new ProductService(container.get('adminProductRepository'), container.get('stripePriceService'));
});
apiContainer.instance('userService', (container) => {
    return new UserService(container.get('supabaseServiceClient'));
});
apiContainer.instance('stripeAdminClient', () => new Stripe(process.env.STRIPE_SECRET_KEY!));
apiContainer.instance('stripeProductService', (container) => {
    return new StripeProductService(container.get('stripeAdminClient'));
});
apiContainer.instance('stripePriceService', (container) => {
    return new StripePriceService(container.get('stripeAdminClient'));
})
apiContainer.instance('stripeWebhookHandler', (container) => {
    return new StripeWebhookHandler(container.get('adminProductService'));
});
apiContainer.instance('stripeProductIOService', (container) => {
    return new StripeProductIOService(
        container.get('adminProductService'),
        container.get('stripeProductService'),
    );
})