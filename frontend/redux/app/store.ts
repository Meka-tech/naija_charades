import {combineReducers, configureStore} from '@reduxjs/toolkit';
import GameRulesReducer from 'redux/features/game_rules/gameRulesSlice';
import UserPreferenceReducer from 'redux/features/user_preference/userPreference';
import {createMigrate, persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavouriteReducer from 'redux/features/favourite_category/favouriteCategory';
import CustomCategoryReducer from 'redux/features/custom_category/customCategory';
import TeamDataReducer from 'redux/features/team_data/team_data';
import CardArrayReducer from 'redux/features/card_array/card_array';

// v1: dark mode became the default. Older installs never recorded an explicit
// theme choice (Settings re-saved it on every visit), so move them to dark once;
// any later toggle in Settings is remembered via `themeChosen`.
const migrations = {
  1: (state: any) => ({
    ...state,
    userPreference: {
      ...state?.userPreference,
      darkMode: true,
      themeChosen: false,
    },
  }),
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  migrate: createMigrate(migrations as any, {debug: false}),
};

const rootReducer = combineReducers({
  gameRules: GameRulesReducer,
  userPreference: UserPreferenceReducer,
  favouriteCategories: FavouriteReducer,
  customCategories: CustomCategoryReducer,
  cardArray: CardArrayReducer,
});
const persistedUserReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedUserReducer,
    teamData: TeamDataReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
