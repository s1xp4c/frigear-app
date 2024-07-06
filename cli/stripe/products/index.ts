import { defineCommand } from 'citty';
import { serverContainer } from '@/constants/server-container';

export default defineCommand({
  subCommands: {
    import: defineCommand({
      async run() {
        const service = serverContainer.make('stripeProductIOService');
        await service.importProductsFromStripe();
      },
    }),
    list: defineCommand({
      async run({}) {
        const service = serverContainer.make('stripeProductService');
        console.log(await service.all());
      },
    }),
    'delete-all': defineCommand({
      async run({}) {
        const service = serverContainer.make('stripeProductService');
        await service.deleteAll();
      },
    }),
  },
});
