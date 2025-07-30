import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ PageNumber, keyword }) => ({
        url: PRODUCTS_URL,
        params: { PageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsDetail: builder.query({
      query: (ProductId) => ({
        url: `${PRODUCTS_URL}/${ProductId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: product,
      }),
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product._id}`,
        method: 'PUT',
        body: product,
      }),
    }),
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
