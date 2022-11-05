import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface customState {
  customCategoryArray: object[];
}

const initialState: customState = {
  customCategoryArray: [{}],
};

export const CustomCategories = createSlice({
  name: 'customCategories',
  initialState,
  reducers: {
    newCustomCard: (state, action: PayloadAction<object>) => {
      state.customCategoryArray = [
        ...state.customCategoryArray,
        action.payload,
      ];
    },
    deleteCustomCard: (state, action: PayloadAction<object[]>) => {
      state.customCategoryArray = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {newCustomCard, deleteCustomCard} = CustomCategories.actions;

export default CustomCategories.reducer;

////{ title : "" , cards : []}
