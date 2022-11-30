import { createSlice } from '@reduxjs/toolkit'


export interface recipeState {
  value: string | any
}

const initialState: recipeState = {
  value: '',
}

export const recipeSlice = createSlice({
  name: 'recipePage',
  initialState,
  reducers: {
    savePage: (state, action) => {
        state.value = action.payload
        window.localStorage.setItem("recipeUrl",action.payload)
      
    },


  },
})


export const {savePage} = recipeSlice.actions
export default recipeSlice.reducer