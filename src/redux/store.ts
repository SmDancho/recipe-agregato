import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter";
import recipeSlice from "./recipePage";
import moreData from "./moreData";
import authSlice from "./auth"
import favoriteSlice from "./addFavoriteApi";

import { recipeApi } from "./api";


export const store = configureStore({
  reducer: {
    filter: filterSlice,
    recipePage: recipeSlice,
    moreData: moreData,
    auth:authSlice,
    favorite: favoriteSlice,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
