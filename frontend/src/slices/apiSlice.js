import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';



const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // always send cookies
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result?.error?.status === 401) {

    
    api.dispatch(logout());

    api.dispatch(resetCart());


  }
  
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});
