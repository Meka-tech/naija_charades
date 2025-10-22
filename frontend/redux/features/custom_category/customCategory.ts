import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ICustomCategoryType} from 'types/card';

export interface customState {
  customCategoryArray: ICustomCategoryType[];
}

const initialState: customState = {
  customCategoryArray: [],
};

export const CustomCategories = createSlice({
  name: 'customCategories',
  initialState,
  reducers: {
    newCustomCard: (state, action: PayloadAction<ICustomCategoryType>) => {
      state.customCategoryArray = [
        ...state.customCategoryArray,
        action.payload,
      ];
    },
    deleteCustomCard: (state, action: PayloadAction<ICustomCategoryType[]>) => {
      state.customCategoryArray = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {newCustomCard, deleteCustomCard} = CustomCategories.actions;

export default CustomCategories.reducer;

////{ title : "" , cards : []}
