import { useDispatch, useSelector } from 'react-redux';
import {
  useAddToCartMutation,
  useRemoveFavProductMutation,
  useSaveFavProductMutation,
} from '@/services/api';
import { setCartItemId } from '@/reduxStore/internalSlice';

export const useProductActions = () => {
  const dispatch = useDispatch();
  const internalState = useSelector((state: any) => state.internal);
  const [addToCart] = useAddToCartMutation();
  const [saveFavProduct] = useSaveFavProductMutation();
  const [removeFavProduct] = useRemoveFavProductMutation();

  const handleSave = async (product: any, e: any) => {
    e.stopPropagation();
    const alreadyFavourite = internalState?.FavProducts?.find(
      (fav: any) => fav.productId === Number(product?.productId),
    );
    if (alreadyFavourite) {
      removeFavProduct(alreadyFavourite?.productFavId);
    } else {
      await saveFavProduct({ productId: product?.productId });
    }
  };

  const handleAddToCart = async (product: any, e: any) => {
    e.stopPropagation();
    const cartItem = {
      productId: product?.productId,
      name: product?.name,
      quantity: '1',
      total: Math.max(Number(product.price) - 75, 0),
      productPrice: Math.max(Number(product.price) - 75, 0),
    };
    await addToCart(cartItem);
  };

  return {
    handleSave,
    handleAddToCart,
  };
};

export const fetchImages = async (query: string) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
  );
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return data.results[randomIndex]?.urls?.regular || '/product-fallback.png';
  }

  return null;
};

export const fetchOneImage = async (query: string) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
  );
  const data = await response.json();

  return null;
};
