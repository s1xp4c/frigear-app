import StripeWebhookHandler, {type IStripeWebhookHandler} from "@/lib/services/webhooks/stripe-webhook-handler";
import ProductService, {IProductService} from "@/lib/services/product/product-service";
import {createSupabaseServerClient, createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import {SupabaseClient} from "@supabase/supabase-js";
import {DependencyContainer} from "@/lib/dependency-container";
import SupabaseProductRepository from "@/lib/repositories/product/supabase-product-repository";
import AdminUserService from "@/lib/services/admin/admin-user-service";
import Stripe from "stripe";
import StripeProductService from "@/lib/services/product/stripe-product-service";
import StripePriceRepository from "@/lib/repositories/product/stripe-price-repository";
import StripeProductIOService from "@/lib/services/product/stripe-product-io-service";
import {IRepository} from "@/lib/types";


export interface ServerContainer {
    //It is important that we pass the correct client on the server
    // supabaseServiceClient is using the service_role key.
    supabaseServiceClient: SupabaseClient;
    // supabaseClient is the anon OR authenticated user's token being used
    supabaseClient: SupabaseClient;
    productService: IProductService;
    productRepository: IRepository;
    adminProductService: IProductService;
    adminProductRepository: IRepository;
    userService: AdminUserService;
    stripeClient: Stripe
    stripeProductService: StripeProductService;
    stripePriceService: StripePriceRepository;
    stripeWebhookHandler: IStripeWebhookHandler;
    stripeProductIOService: StripeProductIOService;
}

export const serverContainer = new DependencyContainer<ServerContainer>();

serverContainer.instance('supabaseServiceClient', () => createSupabaseServiceRoleClient());
serverContainer.instance('supabaseClient', () => createSupabaseServerClient());
serverContainer.instance('productRepository', (container) => {
    //It is important that we pass the correct client on the server
    // supabaseClient is the anon OR authenticated user's token being used
    return new SupabaseProductRepository(container.make('supabaseClient'));
});
serverContainer.instance('productService', (container) => {
    return new ProductService(container.make('productRepository'), container.make('stripePriceService'));
});
serverContainer.instance('adminProductRepository', (container) => {
    return new SupabaseProductRepository(container.make('supabaseServiceClient'));
})
serverContainer.instance('adminProductService', (container) => {
    return new ProductService(container.make('adminProductRepository'), container.make('stripePriceService'));
});
serverContainer.instance('userService', (container) => {
    return new AdminUserService(container.make('supabaseServiceClient'));
});
serverContainer.instance('stripeClient', () => new Stripe(process.env.STRIPE_SECRET_KEY!));
serverContainer.instance('stripeProductService', (container) => {
    return new StripeProductService(container.make('stripeClient'));
});
serverContainer.instance('stripePriceService', (container) => {
    return new StripePriceRepository(container.make('stripeClient'));
})
serverContainer.instance('stripeWebhookHandler', (container) => {
    return new StripeWebhookHandler(container.make('adminProductService'));
});

serverContainer.instance('stripeProductIOService', (container) => {
    return new StripeProductIOService(
        container.make('adminProductService'),
        container.make('stripeProductService'),
    );
});