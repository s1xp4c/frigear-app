import StripeWebhookHandler, {type IStripeWebhookHandler} from "@/lib/services/stripe/stripe-webhook-handler";
import {ProductService} from "@/lib/services/product/product-service";
import SupabaseProductService from "@/lib/services/product/supabase-product-service";
import {createSupabaseServerClient, createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import {SupabaseClient} from "@supabase/supabase-js";
import {DependencyContainer} from "@/lib/dependency-container";


export interface ServerContainer {
    supabaseServiceClient: SupabaseClient
    supabaseClient: SupabaseClient
    stripeWebhookHandler: IStripeWebhookHandler;
    productService: ProductService;
}

let containerInstance: DependencyContainer<ServerContainer> | undefined;

export function serverContainer(): DependencyContainer<ServerContainer> {
    if (!containerInstance) {
        containerInstance = new DependencyContainer()
        containerInstance.service('supabaseServiceClient', () => createSupabaseServiceRoleClient());
        containerInstance.service('supabaseClient', () => createSupabaseServerClient());
        containerInstance.service('stripeWebhookHandler', () => new StripeWebhookHandler());
        containerInstance.service('productService', (container) => {
            return new SupabaseProductService(container.get('supabaseServiceClient'));
        })
    }

    return containerInstance;
}