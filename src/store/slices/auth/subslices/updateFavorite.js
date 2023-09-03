import { createAsyncThunk } from '@reduxjs/toolkit';

import REST_METHOD from 'constants/restMethod';
import { ASYNC_STATUS } from 'constants/status';

export const initState = {
  favoriteProcessing: {}
};

export const updateFavoriteAsyncThunk = createAsyncThunk(
  'auth/updateFavorite',
  async ({ cardId, shouldAdd }, { extra: { apiClient, ENDPOINT_URL }}) => {
    const favoriteIds = await apiClient(
      ENDPOINT_URL.updateFavorite,
      { cardId, method: shouldAdd ? REST_METHOD.post : REST_METHOD.delete }
    );

    return { favoriteIds, cardId };
  }
);

export const extraReducer = {
  [updateFavoriteAsyncThunk.pending]: (state, action) => {
    const { cardId } = action.meta.arg;

    state.favoriteProcessing[cardId] = ASYNC_STATUS.loading;
  },
  [updateFavoriteAsyncThunk.fulfilled]: (state, action) => {
    const { favoriteIds, cardId } = action.payload;

    state.currentUser.favoriteIds = favoriteIds;
    state.favoriteProcessing[cardId] = ASYNC_STATUS.idle;
  },
  [updateFavoriteAsyncThunk.rejected]: (state, action) => {
    const { cardId } = action.meta.arg;

    state.favoriteProcessing[cardId] = ASYNC_STATUS.idle;
  }
};

export const selectFavoriteProcessing = (state) => state.auth.favoriteProcessing;
