import { createSlice } from '@reduxjs/toolkit';

import * as authorize from './subslices/authorize';
import * as login from './subslices/login';
import * as signup from './subslices/signup';
import * as updateFavorite from './subslices/updateFavorite';

const initialState = {
  ...authorize.initState,
  ...login.initState,
  ...signup.initState,
  ...updateFavorite.initState,
  currentUser: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ...authorize.reducer,
    ...login.reducer,
    ...signup.reducer,
    logout(state) {
      state.currentUser = null
    }
  },
  extraReducers: {
    ...authorize.extraReducer,
    ...login.extraReducer,
    ...signup.extraReducer,
    ...updateFavorite.extraReducer
  }
});

export const selectIsCurrentUserExist = (state) => !!state.auth.currentUser;
export const selectCurrentUserId = (state) => state.auth.currentUser.id;

export { authorizeAsyncThunk } from './subslices/authorize';
export { loginAsyncThunk } from './subslices/login';
export { signupAsyncThunk } from './subslices/signup';
export { updateFavoriteAsyncThunk } from './subslices/updateFavorite';

export const authActions = authSlice.actions;
export default authSlice.reducer;
