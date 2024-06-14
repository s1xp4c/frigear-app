import {defineCommand, createMain} from "citty";
import {apiContainer} from "@/app/api-container";


export default defineCommand({
    subCommands: {
        import: defineCommand({
            async run() {
                const service = apiContainer.get('stripeProductIOService');
                await service.importProductsFromStripe();
            }
        }),
        list: defineCommand({
            async run({}) {
                const service = apiContainer.get('stripeProductService');
                console.table(service.all());
            }
        }),
        'delete-all': defineCommand({
            async run({}) {
                const service = apiContainer.get('stripeProductService');
                await service.deleteAll();
            }
        })
    },
})