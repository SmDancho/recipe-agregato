import { createSlice } from "@reduxjs/toolkit";

export interface cuisineState {
  data: Array<String>;
}

const initialState: cuisineState = {
  data: [],
};

export const moreData = createSlice({
  name: "moreData",
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { saveData } = moreData.actions;
export default moreData.reducer;
