import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const getStorefrontClient = () => {
  try {
    if (
      !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
      !process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ||
      !process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN
    ) {
      throw new Error(
        'Storefront client is not initialized. Please check your environment variables.',
      );
    }

    const CLIENT_PARAMS = {
      storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
      apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '',
      publicAccessToken:
        process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN || '',
    };

    const client = createStorefrontApiClient(CLIENT_PARAMS);
    return client;
  } catch (error) {
    throw error;
  }
};
