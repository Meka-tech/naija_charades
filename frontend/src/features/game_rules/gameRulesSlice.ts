import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface GameRulesState {
  teams: number;
  rounds: number;
  timer: number;
}

const initialState: GameRulesState = {
  teams: 2,
  rounds: 3,
  timer: 60,
};

export const GameRules = createSlice({
  name: 'gameRules',
  initialState,
  reducers: {
    updateNoOfTeams: (state, action: PayloadAction<number>) => {
      state.teams = action.payload;
    },
    updateNoOfRounds: (state, action: PayloadAction<number>) => {
      state.rounds = action.payload;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateNoOfTeams, updateNoOfRounds, updateTimer} =
  GameRules.actions;

export default GameRules.reducer;
