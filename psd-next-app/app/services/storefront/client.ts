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

    const client = createStorefrontApiClient({
      storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
      apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '',
      publicAccessToken:
        process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN || '',
    });

    console.log('Storefront client created successfully');
    return client;
  } catch (error) {
    throw error;
  }
};

export const get_shop_details = async () => {
  const query = `
    query getShopDetails{
      shop {
        name
        primaryDomain{
          host
          url
        }
        paymentSettings{
          currencyCode
          acceptedCardBrands
          enabledPresentmentCurrencies
        }
      }
    }
  `;

  const client = getStorefrontClient();

  try {
    const { data, errors, extensions } = await client.request(query);

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to fetch shop details');
    }

    if (extensions?.cost?.throttleStatus?.maximumAvailable === 0) {
      console.warn('API rate limit exceeded');
      throw new Error('API rate limit exceeded');
    }

    return data.shop;
  } catch (error) {
    console.error('Error fetching shop details:', error);
    throw new Error('Failed to fetch shop details');
  }
};
