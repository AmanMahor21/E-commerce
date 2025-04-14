import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Product,
  ProductRating,
  VendorList,
  CreateAddress,
  FavouriteProduct,
  GetAddress,
  categoryList,
  AddToCart,
} from './types';
import { baseQueryWithReauth } from './baseQuery/reduxInterceptor';

export interface ProductRatingResponse {
  status: number;
  message: string;
  data: ProductRating[];
}

export interface ProductDetailResponse {
  status: number;
  message: string;
  data: Product;
}
export interface ProductList {
  status: number;
  message: string;
  errorCode?: string;
  data: Product[];
}

export interface VendorListResponse {
  status: number;
  message: string;
  data: VendorList[];
}
export interface ProductListResponse {
  status: number;
  message: string;
  data: Product[];
}
export interface AddressListResponse {
  status: number;
  message: string;
  data: GetAddress[];
}
export interface CreateAddressResponse {
  status: number;
  message: string;
  data: GetAddress;
}
export interface GetCategoryResponse {
  status: number;
  message: string;
  data: categoryList[];
}
export interface AddToCartResponse {
  status: number;
  message: string;
  // data: categoryList[];
}
export interface GetCartProductsResponse {
  status: number;
  message: string;
  data: AddToCart[];
}

export const api = createApi({
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:8000/api/',
  //   credentials: 'include',
  //   prepareHeaders: (headers) => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       headers.set('Authorization', `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  baseQuery: baseQueryWithReauth,

  // baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',

  tagTypes: [
    'ProductRating',
    'VendorList',
    'DetailedProduct',
    'Address',
    'ProductFavourite',
    'category',
    'cart',
  ],
  endpoints: (build) => ({
    getProductRating: build.query<ProductRating[], number>({
      query: (productId) => `storefront-product/product-detail/rating/${productId}`,
      transformResponse: (response: ProductRatingResponse) => response.data,
      providesTags: (result) =>
        result
          ? result.map(({ ratingId }) => ({
              type: 'ProductRating' as const,
              id: ratingId,
            }))
          : [{ type: 'ProductRating' as const }],
    }),
    getProductById: build.query<Product, number>({
      query: (id) => `storefront-product/product-detail/${id}`,
      transformResponse: (response: ProductDetailResponse) => response.data,
      providesTags: ['DetailedProduct'],
    }),
    getVendorList: build.query<VendorList[], void>({
      query: () => 'customer-vendor/vendor-list',
      transformResponse: (response: VendorListResponse) => response.data,
      providesTags: ['VendorList'],
    }),
    getFilterProducts: build.query<ProductList, Record<string, any>>({
      query: (params) => {
        const query = new URLSearchParams(params).toString();
        return {
          url: `/storefront-product?${query}`,
          // headers: {
          //   Authorization: `Bearer U2FsdGVkX1/QOBzMqbixfhT58ra6pSS+A+JAz7Umbhrm8xcKwXcvYBTup7enUiMc5D8xvzJltuodk1eeke4gE3v5diyLXr1/1mir7JysvtXQS8yejRixbMqKnv+19OdIGXTW6KbaEvhm04ckSnXd2ViqrfZ+VojnUAlOaTAjo9M7Gw9gJNTyYfWCwjfwygjKuRy2auaqdFbFDlTRRPQdRA==`,
          // },
        };
      },
      transformResponse: (response: ProductListResponse) => response,
      providesTags: ['ProductFavourite'],
    }),

    createAddress: build.mutation<CreateAddressResponse, Partial<CreateAddress>>({
      query: (newAddress) => ({
        url: `storefront-customer/create-address`,
        method: 'POST',
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },
        body: newAddress,
      }),
      invalidatesTags: ['Address'],
    }),
    updateAddress: build.mutation<CreateAddressResponse, Record<string, any>>({
      query: (newAddress) => ({
        url: `storefront-customer/update-address/${newAddress.addressId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },
        body: newAddress,
      }),
      invalidatesTags: ['Address'],
    }),
    getAddressList: build.query<AddressListResponse, void>({
      query: () => ({
        url: '/storefront-customer/get-address/',
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },
      }),

      providesTags: ['Address'],
    }),
    saveFavProduct: build.mutation<ProductList, Partial<FavouriteProduct>>({
      query: (productId) => ({
        url: `favorites`,
        method: 'POST',
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },
        body: productId,
      }),
      invalidatesTags: ['ProductFavourite'],
    }),
    getFavProducts: build.query<ProductList, void>({
      query: () => {
        return {
          url: `/favorites/list`,
        };
      },
      providesTags: ['ProductFavourite'],
    }),
    removeFavProduct: build.mutation<ProductList, number>({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },

        body: id,
      }),

      invalidatesTags: ['ProductFavourite'],
    }),
    getCategories: build.query<GetCategoryResponse, Record<string, any>>({
      query: (query = {}) => ({
        url: `/storefront-product/category/`,
        params: { limit: query.limit },
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },
      }),

      providesTags: ['category'],
    }),
    getSubCategories: build.query<GetCategoryResponse, string>({
      query: (id) => ({
        url: `/storefront-product/sub-category/${id}`,
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },
      }),

      providesTags: ['category'],
    }),
    addToCart: build.mutation<AddToCartResponse, AddToCart>({
      query: (AddToCart) => ({
        url: `/storefront-cart`,
        method: 'POST',
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },
        body: AddToCart,
      }),
      invalidatesTags: ['cart'],
    }),

    getCartProducts: build.query<GetCartProductsResponse, void>({
      query: () => ({
        url: '/storefront-cart',
        // headers: {
        //   Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        // },
      }),

      providesTags: ['cart'],
    }),
    updateCartQuantity: build.mutation<AddToCartResponse, Partial<AddToCart>>({
      query: (AddToCart) => ({
        url: `/storefront-cart`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer U2FsdGVkX1/TxFp/IH6onxCZDUVfjHNwkcI9B7rzXU6/bEoue2XDnTYsIaIyehsUxbRX/z49LJz0G540Nlhi3zE3NmAE2LrdjbfItAmwvGeoseqNmuh8OLGZ08/1a09x3dAdtTAJejumia8K+RFxO4F/1bbYRtYGqm9zGfuJ9cgqs+UhYt+ZVVbgB+13sKJYhuReVSomjFTYTN4J6qUxKA==`,
        },
        body: AddToCart,
      }),
      invalidatesTags: ['cart'],
    }),
  }),
});

export const {
  useGetProductRatingQuery,
  useGetProductByIdQuery,
  useGetVendorListQuery,
  useLazyGetFilterProductsQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useGetAddressListQuery,
  useSaveFavProductMutation,
  useGetFavProductsQuery,
  useRemoveFavProductMutation,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useAddToCartMutation,
  useGetCartProductsQuery,
  useUpdateCartQuantityMutation,
} = api;
