import { StorefrontApiClient } from '@shopify/storefront-api-client';
import { getStorefrontClient } from '@/app/storefront/client';
import { graphQLRequest } from '@/app/storefront/operations/graphQLRequest';

const REQUEST_QUERY = `test`;
const EXPECTED_RESPONSE_DATA = {
  shop: {
    name: 'Test Shop',
  },
};
const RESPONSE_OBJECT = {
  data: EXPECTED_RESPONSE_DATA,
  errors: null,
  extensions: {
    cost: {
      requestedQueryCost: 100,
      actualQueryCost: 100,
      throttleStatus: {
        maximumAvailable: 1000,
        currentlyAvailable: 900,
        restoreRate: 50,
      },
      userErrors: [],
    },
    rateLimit: {
      limit: 1000,
      remaining: 900,
      resetAt: new Date().toISOString(),
    },
  },
};

jest.mock('@/app/storefront/client');

describe('GraphQL Request', () => {
  let mockClient: jest.Mocked<StorefrontApiClient>;

  beforeAll(() => {
    mockClient = {
      request: jest.fn().mockResolvedValue(RESPONSE_OBJECT),
    } as unknown as jest.Mocked<StorefrontApiClient>;

    // mock getStorefrontClient to return the mocked client
    const mockedGetClient = getStorefrontClient as jest.Mock;
    mockedGetClient.mockReturnValue(mockClient);
  });

  it('should make a GraphQL request', async () => {
    const response = await graphQLRequest(REQUEST_QUERY);
    expect(mockClient.request).toHaveBeenCalledWith(REQUEST_QUERY);
    expect(response).toEqual(EXPECTED_RESPONSE_DATA);
  });
});
