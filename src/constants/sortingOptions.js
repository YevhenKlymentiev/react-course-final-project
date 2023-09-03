import { CARD_LIST_TEXT } from 'constants/text';

export const SORTING_ID = {
  dsc: 'dsc',
  asc: 'asc'
};

export const SORTING_LABEL = {
  [SORTING_ID.dsc]: CARD_LIST_TEXT.fromNewToOld,
  [SORTING_ID.asc]: CARD_LIST_TEXT.fromOldToNew
};
