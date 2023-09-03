import { createAsyncThunk } from '@reduxjs/toolkit';

import { ASYNC_STATUS } from 'constants/status';
import { CARD_LIST_TEXT } from 'constants/text';
import fakeFetch from 'helpers/fakeFetch';
import sortByDate from 'helpers/sortByDate';

export const initState = {
  getCardsStatus: ASYNC_STATUS.idle,
  getCardsError: null
};

export const getCardsAsyncThunk = createAsyncThunk(
  'cards/getCards',
  async (arg, { rejectWithValue, extra: { ENDPOINT_URL }}) => {
    try {
      const cards = await fakeFetch(ENDPOINT_URL.getCards);

      return { cards };
    } catch (err) {
      return rejectWithValue(err || CARD_LIST_TEXT.getCardsError);
    }
  }
);

export const extraReducer = {
  [getCardsAsyncThunk.pending]: (state) => {
    state.getCardsError = null;
    state.getCardsStatus = ASYNC_STATUS.loading;
  },
  [getCardsAsyncThunk.fulfilled]: (state, action) => {
    const { cards } = action.payload;

    state.list = sortByDate({ list: [...cards], direction: state.sortingId, field: 'creationDate' });
    state.getCardsStatus = ASYNC_STATUS.idle;
  },
  [getCardsAsyncThunk.rejected]: (state, action) => {
    state.getCardsError = action.payload || action.error.message;
    state.getCardsStatus = ASYNC_STATUS.idle;
  }
};

export const selectIsGetCardsLoading = (state) => state.cards.getCardsStatus === ASYNC_STATUS.loading;
export const selectGetCardsError = (state) => state.cards.getCardsError;
