import { createAsyncThunk } from '@reduxjs/toolkit';

import { ASYNC_STATUS } from 'constants/status';
import { CARD_TEXT } from 'constants/text';

export const initState = {
  updateCardProcessing: {},
  updateCardErrors: {}
};

export const updateCardAsyncThunk = createAsyncThunk(
  'cards/updateCard',
  async (payload, { rejectWithValue, extra: { apiClient, ENDPOINT_URL }}) => {
    try {
      const updatedCard = await apiClient(ENDPOINT_URL.updateCard, payload);

      return { updatedCard };
    } catch (err) {
      return rejectWithValue(err || CARD_TEXT.updateCardError);
    }
  }
);

export const reducer = {
  setUpdateCardError(state, action) {
    const { cardId, value } = action.payload;

    state.updateCardErrors[cardId] = value;
  }
};

export const extraReducer = {
  [updateCardAsyncThunk.pending]: (state, action) => {
    const { cardId } = action.meta.arg;

    state.updateCardProcessing[cardId] = ASYNC_STATUS.loading;
  },
  [updateCardAsyncThunk.fulfilled]: (state, action) => {
    const { updatedCard } = action.payload;
    const updatedCardIndex = state.list.findIndex(curr => curr.id === updatedCard.id);

    state.list[updatedCardIndex] = updatedCard;
    state.updateCardProcessing[updatedCard.id] = ASYNC_STATUS.idle;
  },
  [updateCardAsyncThunk.rejected]: (state, action) => {
    const { cardId } = action.meta.arg;

    state.updateCardErrors[cardId] = action.payload || action.error.message;
    state.updateCardProcessing[cardId] = ASYNC_STATUS.idle;
  }
};

export const selectUpdateCardProcessing = (state) => state.cards.updateCardProcessing;
export const selectUpdateCardErrors = (state) => state.cards.updateCardErrors;
