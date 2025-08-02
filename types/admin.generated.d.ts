/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type GetShopDetailsQueryVariables = StorefrontTypes.Exact<{
  [key: string]: never;
}>;

export type GetShopDetailsQuery = {
  shop: Pick<StorefrontTypes.Shop, 'name'> & {
    primaryDomain: Pick<StorefrontTypes.Domain, 'host' | 'url'>;
  };
};

interface GeneratedQueryTypes {
  '\n    #graphql\n    query getShopDetails{\n      shop {\n        name\n        primaryDomain{\n          host\n          url\n        }\n      }\n    }\n': {
    return: GetShopDetailsQuery;
    variables: GetShopDetailsQueryVariables;
  };
}

interface GeneratedMutationTypes {}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
