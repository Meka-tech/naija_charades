import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface FavouriteState {
  favouritesArray: string[];
}

const initialState: FavouriteState = {
  favouritesArray: [],
};

export const FavouriteCategories = createSlice({
  name: 'favouriteCategories',
  initialState,
  reducers: {
    updateFavouriteArray: (state, action: PayloadAction<string>) => {
      state.favouritesArray = [...state.favouritesArray, action.payload];
    },
    deleteFavouriteArray: (state, action: PayloadAction<string[]>) => {
      state.favouritesArray = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateFavouriteArray, deleteFavouriteArray} =
  FavouriteCategories.actions;

export default FavouriteCategories.reducer;
