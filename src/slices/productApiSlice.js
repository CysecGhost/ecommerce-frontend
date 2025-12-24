import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        keyword = "",
        page = 1,
        limit = 12,
        sort = "newest",
        category = "",
        minPrice = "",
        maxPrice = "",
      }) =>
        `/products?keyword=${keyword}&page=${page}&limit=${limit}&sort=${sort}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    }),
    getTrending: builder.query({
      query: () => "/products/trending",
    }),
    getFeatured: builder.query({
      query: () => "/products/featured",
    }),
    getBestSellers: builder.query({
      query: () => "/products/best-sellers",
    }),
    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTrendingQuery,
  useGetFeaturedQuery,
  useGetBestSellersQuery,
  useGetSingleProductQuery,
} = productApiSlice;

export default productApiSlice;
