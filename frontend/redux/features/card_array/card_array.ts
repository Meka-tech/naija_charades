import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {CardData} from 'constants/cardData';
import {ICardType} from 'types/card';

export interface cardState {
  cardArray: ICardType[];
}

const initialState: cardState = {
  cardArray: CardData,
};

export const CardArray = createSlice({
  name: 'CardArray',
  initialState,
  reducers: {
    updateCards: (state, action: PayloadAction<ICardType[]>) => {
      state.cardArray = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateCards} = CardArray.actions;

export default CardArray.reducer;
