import { defineCommand } from 'citty';
import products from '@/cli/stripe/products';

export default defineCommand({
  subCommands: {
    products,
  },
});
