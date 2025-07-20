import {
  createStorefrontApiClient,
  StorefrontApiClient,
} from '@shopify/storefront-api-client';
import { getStorefrontClient } from '@/app/storefront/client';

jest.mock('@shopify/storefront-api-client');

describe('Shopify Storefront Client', () => {
  let mockClient: jest.Mocked<StorefrontApiClient>;

  beforeAll(() => {
    mockClient = {
      someMethod: jest.fn(),
    } as unknown as jest.Mocked<StorefrontApiClient>;
    (
      createStorefrontApiClient as jest.MockedFunction<
        typeof createStorefrontApiClient
      >
    ).mockImplementation(() => {
      console.log('mock createStorefrontApiClient called');
      return mockClient;
    });
  });

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = 'my-shop.myshopify.com';
    process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION = '2025-04';
    process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN = 'token123';
  });

  test('creates client with environment variables', () => {
    const client = getStorefrontClient();
    expect(client).toBe(mockClient);

    expect(createStorefrontApiClient).toHaveBeenCalledTimes(1);

    expect(createStorefrontApiClient).toHaveBeenCalledWith({
      storeDomain: 'my-shop.myshopify.com',
      apiVersion: '2025-04',
      publicAccessToken: 'token123',
    });
  });

  test('throws error if environment variables is not initialized', () => {
    delete process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    delete process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION;
    delete process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN;

    expect(() => getStorefrontClient()).toThrow(
      'Storefront client is not initialized. Please check your environment variables.',
    );
  });
});
