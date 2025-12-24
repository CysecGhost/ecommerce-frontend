import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
