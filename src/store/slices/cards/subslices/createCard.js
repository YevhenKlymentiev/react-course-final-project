import { createAsyncThunk } from '@reduxjs/toolkit';

import { ASYNC_STATUS } from 'constants/status';
import { CARD_TEXT } from 'constants/text';
import sortByDate from 'helpers/sortByDate';

export const initState = {
  createCardStatus: ASYNC_STATUS.idle,
  createCardError: null
};

export const createCardAsyncThunk = createAsyncThunk(
  'cards/createCard',
  async (fields, { rejectWithValue, extra: { apiClient, ENDPOINT_URL }}) => {
    try {
      const newCard = await apiClient(ENDPOINT_URL.createCard, fields);

      return { newCard };
    } catch (err) {
      return rejectWithValue(err || CARD_TEXT.createCardError);
    }
  }
);

export const reducer = {
  setCreateCardError(state, action) {
    state.createCardError = action.payload;
  }
};

export const extraReducer = {
  [createCardAsyncThunk.pending]: (state) => {
    state.createCardStatus = ASYNC_STATUS.loading;
  },
  [createCardAsyncThunk.fulfilled]: (state, action) => {
    const { newCard } = action.payload;

    state.list = sortByDate({ list: [...state.list, newCard], direction: state.sortingId, field: 'creationDate' });
    state.createCardStatus = ASYNC_STATUS.idle;
  },
  [createCardAsyncThunk.rejected]: (state, action) => {
    state.createCardError = action.payload || action.error.message;
    state.createCardStatus = ASYNC_STATUS.idle;
  }
};

export const selectIsCreateCardProcessing = (state) => state.cards.createCardStatus === ASYNC_STATUS.loading;
export const selectCreateCardError = (state) => state.cards.createCardError;
