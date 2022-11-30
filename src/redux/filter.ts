import { createSlice } from "@reduxjs/toolkit";


export interface cuisineState {
  cuisineValue: String;
  categoryValue: String;
  searchValue: String | any;
}

const initialState: cuisineState = {
  cuisineValue: "",
  categoryValue: "",
  searchValue: "",
  
};

export const filterSlice = createSlice({
  name: "cuisine",
  initialState,
  reducers: {
    saveCuisine: (state, action) => {
      state.cuisineValue = action.payload;
    },
    saveCategory: (state, action) => {
      state.categoryValue = action.payload;
    },
    saveSearch: (state, action) => {
      state.searchValue = action.payload;
    }, 
  },
});

export const { saveCuisine, saveCategory,saveSearch } = filterSlice.actions;
export default filterSlice.reducer;
