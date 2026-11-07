import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserPreferenceState {
  darkMode: boolean;
  /** True once the user has picked a theme in Settings. */
  themeChosen: boolean;
  sound: boolean;
  soundLevel: number;
}

const initialState: UserPreferenceState = {
  // Dark is the default until the user picks a theme in Settings.
  darkMode: true,
  themeChosen: false,
  sound: true,
  soundLevel: 1,
};

export const UserPreference = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {
    updateDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      state.themeChosen = true;
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
