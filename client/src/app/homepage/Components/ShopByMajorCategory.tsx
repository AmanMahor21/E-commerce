'use client';

import React, { useEffect, useState } from 'react';
import ShopByCategory from './ShopByCategory';
import { useLazyGetFilterProductsQuery } from '@/services/api';
import { Product } from '@/services/types';

type ResultMap = {
  [key: string]: Product[];
};

type CategoryDataMap = {
  [key: string]: Product[];
};
const ShopByCategorySection = () => {
  const [fetchProducts] = useLazyGetFilterProductsQuery();
  const [categoryData, setCategoryData] = useState<CategoryDataMap>({});
  const [loading, setLoading] = useState(true);

  const shopByCategories = [
    { keyword: 'luggage', label: 'Travel and Luggage' },
    { keyword: 'jewelry', label: 'Jewelry and Accessories' },
    { keyword: 'tools', label: 'Tools & Equipment' },
    // Add more categories as needed
  ];

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const fetchPromises = shopByCategories.map(async ({ keyword }) => {
          const res = await fetchProducts({ keyword, limit: 6 }).unwrap();
          return { keyword, data: res?.data || [] };
        });
        const results = await Promise.all(fetchPromises);

        // Create an object where key = keyword, value = data
        const resultMap: ResultMap = results.reduce((acc, curr) => {
          acc[curr.keyword] = curr.data;
          return acc;
        }, {} as ResultMap);

        setCategoryData(resultMap);
      } catch (err) {
        console.error('Failed to fetch shop by categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="mx-7 mt-8 lg:px-10 space-y-14">
      {shopByCategories.map(({ keyword, label }) => (
        <ShopByCategory
          key={keyword}
          keyword={keyword}
          label={label}
          products={categoryData[keyword] || []}
        />
      ))}
    </div>
  );
};

export default ShopByCategorySection;
