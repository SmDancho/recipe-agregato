import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {useCookie} from "../hooks/getToken"

export interface favoriteState {
  list: null | string;
  token: null | string;
  isLoading: boolean;
  status: null | string;
}

const initialState: favoriteState = {
  list: null,
  token: null,
  isLoading: false,
  status: null,
};

export const addFavorite: any = createAsyncThunk(
  "favoriteSlice/addFavorite",
  async ({ label, cusType, category, link }: String | any) => {
    try {
      const { data } = await axios.post(
        "https://recipe-app1.herokuapp.com/add/addToFavortite",
        {
          label,
          cusType,
          category,
          link,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie('token')}`,
          },
        }
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const removeFavorite: any = createAsyncThunk(
  "favoriteSlice/removeFavorite",
  async ({ label }: String | any) => {
    try {
      const { data } = await axios.post(
        "https://recipe-app1.herokuapp.com/add/removeTofavorite",
        {
          label,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie('token')}`,
          },
        }
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getfavorite: any = createAsyncThunk(
  "favoriteSlice/getfavorite",
  async () => {
    try {
      const { data } = await axios.get("https://recipe-app1.herokuapp.com/add/favorite", {
        headers: {
          Authorization: `Bearer ${useCookie('token')}`,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const favoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: {
    //addFavorite
    [addFavorite.pending]: (state) => {
      state.isLoading = true;
    },
    [addFavorite.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [addFavorite.rejected]: (state, action) => {
      state.status = action.payload.message;
    },
    //getFavorite
    [getfavorite.pending]: (state) => {
      state.isLoading = true;
    },
    [getfavorite.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload.list;
    },
    [getfavorite.rejected]: (state, ) => {
      state.isLoading = false;
    },
    //removeFavorite
    [removeFavorite.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFavorite.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [removeFavorite.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
  },
});

export default favoriteSlice.reducer;
export const { clearStatus } = favoriteSlice.actions;
