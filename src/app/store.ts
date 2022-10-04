import {combineReducers, configureStore} from '@reduxjs/toolkit';
import GameRulesReducer from '../features/game_rules/gameRulesSlice';
import UserPreferenceReducer from '../features/user_preference/userPreference';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavouriteReducer from '../features/favourite_category/favouriteCategory';
import CustomCategoryReducer from '../features/custom_category/customCategory';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  gameRules: GameRulesReducer,
  userPreference: UserPreferenceReducer,
  favouriteCategories: FavouriteReducer,
  customCategories: CustomCategoryReducer,
});
const persistedUserReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedUserReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
