// A class that helps to fetch data for the backend API.

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({ // Create an API service.
  reducerPath: "productsApi", // Name of the service.
  baseQuery: fetchBaseQuery( { baseUrl: "http://localhost:4000" } ),
  endpoints: ( builder ) => ({ // For accessing the baseURL.
    getProducts: builder.query({ // A Hook for getting all of the products.
      query: () => "products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi; // Custom hook.
