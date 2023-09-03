import { createAsyncThunk } from '@reduxjs/toolkit';

import { ASYNC_STATUS } from 'constants/status';
import { getUsersAsyncThunk } from 'store/slices/users';
import { getCardsAsyncThunk } from 'store/slices/cards';

export const initState = {
  authorizeStatus: ASYNC_STATUS.loading,
  authorizeError: null
};

export const authorizeAsyncThunk = createAsyncThunk(
  'auth/authorize',
  async (token, { dispatch, extra: { apiClient, ENDPOINT_URL }}) => {
    const user = await apiClient(ENDPOINT_URL.authorize, token);

    dispatch(getUsersAsyncThunk());
    dispatch(getCardsAsyncThunk());

    return { user };
  }
);

export const reducer = {
  setAuthorizeStatus(state, action) {
    state.authorizeStatus = action.payload;
  },
  setAuthorizeError(state, action) {
    state.authorizeError = action.payload;
  }
};

export const extraReducer = {
  [authorizeAsyncThunk.pending]: (state) => {
    state.authorizeStatus = ASYNC_STATUS.loading;
  },
  [authorizeAsyncThunk.fulfilled]: (state, action) => {
    const { user } = action.payload;

    state.currentUser = user;
    state.authorizeStatus = ASYNC_STATUS.idle;
  },
  [authorizeAsyncThunk.rejected]: (state, action) => {
    state.authorizeError = action.payload || action.error.message;
    state.authorizeStatus = ASYNC_STATUS.idle;
  }
};

export const selectIsAuthorizeProcessing = (state) => state.auth.authorizeStatus === ASYNC_STATUS.loading;
export const selectAuthorizeError = (state) => state.auth.authorizeError;
