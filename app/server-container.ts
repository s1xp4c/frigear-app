import StripeWebhookHandler, {type IStripeWebhookHandler} from "@/lib/services/webhooks/stripe-webhook-handler";
import ProductService, {IProductService} from "@/lib/services/product/product-service";
import {createSupabaseServerClient, createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import {SupabaseClient} from "@supabase/supabase-js";
import {DependencyContainer} from "@/lib/dependency-container";
import SupabaseProductRepository from "@/lib/repositories/product/supabase-product-repository";
import UserService from "@/lib/services/admin/user-service";
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
    userService: UserService;
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
    return new SupabaseProductRepository(container.get('supabaseClient'));
});
serverContainer.instance('productService', (container) => {
    return new ProductService(container.get('productRepository'), container.get('stripePriceService'));
});
serverContainer.instance('adminProductRepository', (container) => {
    return new SupabaseProductRepository(container.get('supabaseServiceClient'));
})
serverContainer.instance('adminProductService', (container) => {
    return new ProductService(container.get('adminProductRepository'), container.get('stripePriceService'));
});
serverContainer.instance('userService', (container) => {
    return new UserService(container.get('supabaseServiceClient'));
});
serverContainer.instance('stripeClient', () => new Stripe(process.env.STRIPE_SECRET_KEY!));
serverContainer.instance('stripeProductService', (container) => {
    return new StripeProductService(container.get('stripeClient'));
});
serverContainer.instance('stripePriceService', (container) => {
    return new StripePriceRepository(container.get('stripeClient'));
})
serverContainer.instance('stripeWebhookHandler', (container) => {
    return new StripeWebhookHandler(container.get('adminProductService'));
});

serverContainer.instance('stripeProductIOService', (container) => {
    return new StripeProductIOService(
        container.get('adminProductService'),
        container.get('stripeProductService'),
    );
});