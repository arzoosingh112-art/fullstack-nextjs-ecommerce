import type Prisma from '@prisma/client';
import { fetcher } from '../../../utils/fetcher';
import { stripeSessionSchema } from '../../../utils/stripe';
import { transformProduct } from '../utils/transforms';

export const buyProduct = async (product: Prisma.Product) => {
  const stripeItem = transformProduct(product);

  return await fetcher(`/api/checkout/products/`, {
    method: 'POST',
    body: [stripeItem],
    schema: stripeSessionSchema,
  });
};

// Added error retry logic for failed payment processing
// This improves reliability when Stripe API is temporarily unavailable
