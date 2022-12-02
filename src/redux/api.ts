import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IcardTypes } from "../types/card";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.edamam.com/api/` }),
  endpoints: (builder) => ({
    getRecipes: builder.query<IcardTypes | any ,any>({
      query: ({ deboncedSearchValue, totalCusValue,totalCategoryValue ,url =`recipes/v2?&app_id=76a2ec84&app_key=c7922b8b3b6f0896d3cd7b7f7570ca51`}) => ({
        url: 'recipes/v2?&app_id=76a2ec84&app_key=c7922b8b3b6f0896d3cd7b7f7570ca51',
        params: {
          q: deboncedSearchValue,
          dishType: totalCategoryValue,
          cuisineType: totalCusValue,
          type: "public",
          imageSize: "SMALL",
        

        },
      }),
    }),
    getMoreData: builder.query<IcardTypes | any ,any>({
      query: (url) => ({
        url: url,
        params: {
          type: "public",
          imageSize: "SMALL",
        },
      }),
    }),
  }),
});

export const { useGetRecipesQuery, useLazyGetMoreDataQuery } = recipeApi;
