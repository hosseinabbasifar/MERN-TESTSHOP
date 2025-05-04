import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
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
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product._id}`,
        method: "PUT",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
