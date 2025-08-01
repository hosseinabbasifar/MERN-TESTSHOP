import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
       query: ({PageNumber}) => ({
         url: ORDERS_URL,
         params: { PageNumber },
       }),
       keepUnusedDataFor: 5,
     }),
     deliverOrder:builder.mutation({
      query: ({ orderId }) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
  
     })
     })
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetUserOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation
} = orderApiSlice;
