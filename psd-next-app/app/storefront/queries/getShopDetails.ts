import { graphQLRequest } from '@/app/storefront/operations/graphQLRequest';

const REQUEST_QUERY = `
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

export const getShopDetails = async () => {
  try {
    const data = await graphQLRequest(REQUEST_QUERY);
    if (!data || !data.shop) {
      throw new Error('No shop details found');
    }

    return data.shop;
  } catch (error) {
    console.error('Error fetching shop details:', error);
    throw new Error('Failed to fetch shop details');
  }
};
