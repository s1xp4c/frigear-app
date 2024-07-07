import { appContainer } from '@/constants/app-container';

export async function getProductById(productId: string) {
  const service = appContainer.make('productRepository');

  return service.getById(productId);
}
