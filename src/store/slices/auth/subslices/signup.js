import { createAsyncThunk } from '@reduxjs/toolkit';

import { ASYNC_STATUS } from 'constants/status';
import { getUsersAsyncThunk } from 'store/slices/users';
import { getCardsAsyncThunk } from 'store/slices/cards';

export const initState = {
  signupStatus: ASYNC_STATUS.idle,
  signupError: null
};

export const signupAsyncThunk = createAsyncThunk(
  'auth/signup',
  async (fields, { dispatch, extra: { apiClient, ENDPOINT_URL }}) => {
    const user = await apiClient(ENDPOINT_URL.signup, fields);

    dispatch(getUsersAsyncThunk());
    dispatch(getCardsAsyncThunk());

    return { user };
  }
);

export const reducer = {
  setSignupError(state, action) {
    state.signupError = action.payload;
  }
};

export const extraReducer = {
  [signupAsyncThunk.pending]: (state) => {
    state.signupStatus = ASYNC_STATUS.loading;
  },
  [signupAsyncThunk.fulfilled]: (state, action) => {
    const { user } = action.payload;

    state.currentUser = user;
    state.signupStatus = ASYNC_STATUS.idle;
  },
  [signupAsyncThunk.rejected]: (state, action) => {
    state.signupError = action.payload || action.error.message;
    state.signupStatus = ASYNC_STATUS.idle;
  }
};

export const selectIsSignupProcessing = (state) => state.auth.signupStatus === ASYNC_STATUS.loading;
export const selectSignupError = (state) => state.auth.signupError;
