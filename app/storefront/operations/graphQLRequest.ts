import { getStorefrontClient } from '@/app/storefront/client';

export const graphQLRequest = async <T>(query: string): Promise<T> => {
  const client = getStorefrontClient();

  try {
    const { data, errors, extensions } = await client.request(query);

    if (!data) {
      throw new Error('No data returned from GraphQL request');
    }

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to fetch data from GraphQL');
    }

    if (extensions?.cost?.throttleStatus?.maximumAvailable === 0) {
      console.warn('API rate limit exceeded');
      throw new Error('API rate limit exceeded');
    }

    return data;
  } catch (error) {
    console.error('GraphQL request error:', error);
    throw new Error('Failed to execute GraphQL request');
  }
};
