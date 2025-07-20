'use client';

import React, { useEffect, useState } from 'react';
import { getShopDetails } from '@/app/storefront/queries/getShopDetails';

const StorefrontStatusPage = () => {
  const shopDetails = useState({
    name: '',
    primaryDomain: { host: '', url: '' },
    paymentSettings: {
      currencyCode: '',
      acceptedCardBrands: [],
      enabledPresentmentCurrencies: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const details = await getShopDetails();
        shopDetails[1](details);
      } catch (err) {
        console.error('Error fetching shop details:', err);
        setError('Failed to load shop details');
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, [shopDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>Storefront Client Details</h1>
      <p>Name: {shopDetails[0].name}</p>
      <p>Primary Domain: {shopDetails[0].primaryDomain.host}</p>
      <p>Currency Code: {shopDetails[0].paymentSettings.currencyCode}</p>
      <p>
        Accepted Card Brands:{' '}
        {shopDetails[0].paymentSettings.acceptedCardBrands.join(', ')}
      </p>
      <p>
        Enabled Presentment Currencies:{' '}
        {shopDetails[0].paymentSettings.enabledPresentmentCurrencies.join(', ')}
      </p>
    </div>
  );
};

export default StorefrontStatusPage;
