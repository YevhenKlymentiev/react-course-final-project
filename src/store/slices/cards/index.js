import { createSelector, createSlice } from '@reduxjs/toolkit';

import { FILTERING_ID } from 'constants/filteringOptions';
import { SORTING_ID } from 'constants/sortingOptions';
import sortByDate from 'helpers/sortByDate';
import * as getCards from './subslices/getCards';
import * as createCard from './subslices/createCard';
import * as updateCard from './subslices/updateCard';

const initialState = {
  ...getCards.initState,
  ...createCard.initState,
  ...updateCard.initState,
  list: [],
  filteringId: FILTERING_ID.all,
  sortingId: SORTING_ID.dsc
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    ...createCard.reducer,
    ...updateCard.reducer,
    setFilteringId(state, action) {
      state.filteringId = action.payload;
    },
    setSortingId(state, { payload: sortingId }) {
      state.sortingId = sortingId;
      state.list = sortByDate({ list: [...state.list], direction: sortingId, field: 'creationDate' });
    }
  },
  extraReducers: {
    ...getCards.extraReducer,
    ...createCard.extraReducer,
    ...updateCard.extraReducer
  }
});

const selectCards = (state) => state.cards.list;

export const selectFilteringId = (state) => state.cards.filteringId;
export const selectFavoriteIdsOfCurrentUser = (state) => state.auth.currentUser.favoriteIds;
export const reselectCards = createSelector(
  [selectCards, selectFilteringId, selectFavoriteIdsOfCurrentUser],
  (cards, filteringId, favoriteIdsOfCurrentUser) => {
    if (filteringId === FILTERING_ID.favorites) {
      return cards.filter(curr => favoriteIdsOfCurrentUser.includes(curr.id));
    }

    return cards;
  }
);

const selectProfileId = (state, profileId) => profileId || state.auth.currentUser.id;
export const reselectCardsById = createSelector(
  [reselectCards, selectProfileId],
  (cards, profileId) => cards.filter(curr => curr.authorId === profileId)
);

export const selectSortingId = (state) => state.cards.sortingId;

export { getCardsAsyncThunk } from './subslices/getCards';
export { createCardAsyncThunk } from './subslices/createCard';
export { updateCardAsyncThunk } from './subslices/updateCard';

export const cardsActions = cardsSlice.actions;
export default cardsSlice.reducer;
