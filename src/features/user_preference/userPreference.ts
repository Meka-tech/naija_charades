import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserPreferenceState {
  darkMode: boolean;
  sound: boolean;
  soundLevel: number;
}

const initialState: UserPreferenceState = {
  darkMode: false,
  sound: true,
  soundLevel: 60,
};

export const UserPreference = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {
    updateDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    updateSound: (state, action: PayloadAction<boolean>) => {
      state.sound = action.payload;
    },
    updateSoundLevel: (state, action: PayloadAction<number>) => {
      state.soundLevel = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateDarkMode, updateSound, updateSoundLevel} =
  UserPreference.actions;

export default UserPreference.reducer;
