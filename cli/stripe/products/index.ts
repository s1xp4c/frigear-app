import {defineCommand, createMain} from "citty";
import {serverContainer} from "@/app/server-container";


export default defineCommand({
    subCommands: {
        import: defineCommand({
            async run() {
                const service = serverContainer.make('stripeProductIOService');
                await service.importProductsFromStripe();
            }
        }),
        list: defineCommand({
            async run({}) {
                const service = serverContainer.make('stripeProductService');
                console.table(service.all());
            }
        }),
        'delete-all': defineCommand({
            async run({}) {
                const service = serverContainer.make('stripeProductService');
                await service.deleteAll();
            }
        })
    },
})