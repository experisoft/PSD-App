import { graphQLRequest } from '@/app/storefront/operations/graphQLRequest';
import { gql } from 'graphql-request';
import { GetShopDetailsQuery } from '@/types/admin.generated';

const REQUEST_QUERY = gql`
  #graphql
  query getShopDetails {
    shop {
      name
      primaryDomain {
        host
        url
      }
    }
  }
`;

export const getShopDetails = async (): Promise<
  GetShopDetailsQuery['shop']
> => {
  try {
    const { shop }: GetShopDetailsQuery =
      await graphQLRequest<GetShopDetailsQuery>(REQUEST_QUERY);
    return shop;
  } catch (error) {
    console.error('Error fetching shop details:', error);
    throw error;
  }
};
