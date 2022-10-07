import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface teamDataState {
  teamArray: [
    {
      id: number;
      team: string;
      score: number;
      cards: {correct: string[]; skip: string[]};
    },
  ];
  quickPlay: boolean;
}

const initialState: teamDataState = {
  teamArray: [
    {
      id: 0,
      team: '',
      score: 0,
      cards: {correct: [], skip: []},
    },
  ],
  quickPlay: true,
};

export const TeamData = createSlice({
  name: 'TeamData',
  initialState,
  reducers: {
    updateTeamData: (
      state,
      action: PayloadAction<
        [
          {
            id: number;
            team: string;
            score: number;
            cards: {correct: []; skip: []};
          },
        ]
      >,
    ) => {
      state.teamArray = action.payload;
    },
    updateTeamScore: (
      state,
      action: PayloadAction<{score: number; team: number}>,
    ) => {
      state.teamArray[action.payload.team - 1].score =
        action.payload.score + state.teamArray[action.payload.team - 1].score;
    },
    updateCorrectArray: (
      state,
      action: PayloadAction<{card: string; team: number}>,
    ) => {
      state.teamArray[action.payload.team - 1].cards.correct = [
        ...state.teamArray[action.payload.team - 1].cards.correct,
        action.payload.card,
      ];
    },
    updateSkipArray: (
      state,
      action: PayloadAction<{card: string; team: number}>,
    ) => {
      state.teamArray[action.payload.team - 1].cards.skip = [
        ...state.teamArray[action.payload.team - 1].cards.skip,
        action.payload.card,
      ];
    },
    updateQuickPlay: (state, action: PayloadAction<boolean>) => {
      state.quickPlay = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateTeamData,
  updateTeamScore,
  updateCorrectArray,
  updateSkipArray,
  updateQuickPlay,
} = TeamData.actions;

export default TeamData.reducer;
