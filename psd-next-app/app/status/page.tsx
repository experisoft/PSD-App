'use client';

import React, { useEffect, useState } from 'react';
import { getShopDetails } from '@/app/storefront/queries/getShopDetails';
import { GetShopDetailsQuery } from '@/types/admin.generated';

const StorefrontStatusPage = () => {
  const [shopDetails, setShopDetails] = useState<GetShopDetailsQuery['shop']>({
    name: '',
    primaryDomain: { host: '', url: '' },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const details = await getShopDetails();
        setShopDetails(details);
      } catch (err) {
        console.error('Error fetching shop details:', err);
        setError('Failed to load shop details');
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>Storefront Client Details</h1>
      <p>Name: {shopDetails.name}</p>
      <p>Primary Domain: {shopDetails.primaryDomain.host}</p>
      <p>URL: {shopDetails.primaryDomain.url}</p>
    </div>
  );
};

export default StorefrontStatusPage;
