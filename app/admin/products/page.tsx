'use server';

import { serverContainer } from '@/constants/server-container';

export default async function AdminProductsPage() {
  const productService = serverContainer.make('productService');
  const products = await productService.all();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
