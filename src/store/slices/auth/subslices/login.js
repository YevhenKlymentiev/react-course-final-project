import { createAsyncThunk } from '@reduxjs/toolkit';

import { ASYNC_STATUS } from 'constants/status';
import { getUsersAsyncThunk } from 'store/slices/users';
import { getCardsAsyncThunk } from 'store/slices/cards';

export const initState = {
  loginStatus: ASYNC_STATUS.idle,
  loginError: null
};

export const loginAsyncThunk = createAsyncThunk(
  'auth/login',
  async (fields, { dispatch, extra: { apiClient, ENDPOINT_URL }}) => {
    const user = await apiClient(ENDPOINT_URL.login, fields);

    dispatch(getUsersAsyncThunk());
    dispatch(getCardsAsyncThunk());

    return { user };
  }
);

export const reducer = {
  setLoginError(state, action) {
    state.loginError = action.payload;
  }
};

export const extraReducer = {
  [loginAsyncThunk.pending]: (state) => {
    state.loginStatus = ASYNC_STATUS.loading;
  },
  [loginAsyncThunk.fulfilled]: (state, action) => {
    const { user } = action.payload;

    state.currentUser = user;
    state.loginStatus = ASYNC_STATUS.idle;
  },
  [loginAsyncThunk.rejected]: (state, action) => {
    state.loginError = action.payload || action.error.message;
    state.loginStatus = ASYNC_STATUS.idle;
  }
};

export const selectIsLoginProcessing = (state) => state.auth.loginStatus === ASYNC_STATUS.loading;
export const selectLoginError = (state) => state.auth.loginError;
