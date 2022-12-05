import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {CardData} from '../../screens/app/cardData';

export interface cardState {
  cardArray: object[];
}

const initialState: cardState = {
  cardArray: CardData,
};

export const CardArray = createSlice({
  name: 'CardArray',
  initialState,
  reducers: {
    updateCards: (state, action: PayloadAction<object[]>) => {
      state.cardArray = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateCards} = CardArray.actions;

export default CardArray.reducer;

////{ title : "" , cards : []}
