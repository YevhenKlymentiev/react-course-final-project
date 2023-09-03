import { createAsyncThunk } from '@reduxjs/toolkit';

import { ASYNC_STATUS } from 'constants/status';
import { USER_LIST_TEXT } from 'constants/text';
import fakeFetch from 'helpers/fakeFetch';

export const initState = {
  getUsersStatus: ASYNC_STATUS.idle,
  getUsersError: null
};

export const getUsersAsyncThunk = createAsyncThunk(
  'users/getUsers',
  async (arg, { rejectWithValue, extra: { ENDPOINT_URL }}) => {
    try {
      const users = await fakeFetch(ENDPOINT_URL.getUsers);

      return { users };
    } catch (err) {
      return rejectWithValue(err || USER_LIST_TEXT.getUsersError);
    }
  }
);

export const extraReducer = {
  [getUsersAsyncThunk.pending]: (state) => {
    state.getUsersError = null;
    state.getUsersStatus = ASYNC_STATUS.loading;
  },
  [getUsersAsyncThunk.fulfilled]: (state, action) => {
    const { users } = action.payload;

    state.list = users;
    state.getUsersStatus = ASYNC_STATUS.idle;
  },
  [getUsersAsyncThunk.rejected]: (state, action) => {
    state.getUsersError = action.payload || action.error.message;
    state.getUsersStatus = ASYNC_STATUS.idle;
  }
};

export const selectIsGetUsersLoading = (state) => state.users.getUsersStatus === ASYNC_STATUS.loading;
export const selectGetUsersError = (state) => state.users.getUsersError;
