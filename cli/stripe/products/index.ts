import {defineCommand, createMain} from "citty";
import {serverContainer} from "@/app/server-container";


export default defineCommand({
    subCommands: {
        import: defineCommand({
            async run() {
                const service = serverContainer.get('stripeProductIOService');
                await service.importProductsFromStripe();
            }
        }),
        list: defineCommand({
            async run({}) {
                const service = serverContainer.get('stripeProductService');
                console.table(service.all());
            }
        }),
        'delete-all': defineCommand({
            async run({}) {
                const service = serverContainer.get('stripeProductService');
                await service.deleteAll();
            }
        })
    },
})