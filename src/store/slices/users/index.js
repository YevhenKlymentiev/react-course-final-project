import { createSelector, createSlice } from '@reduxjs/toolkit';

import * as getUsers from './subslices/getUsers';

const initialState = {
  ...getUsers.initState,
  list: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    ...getUsers.extraReducer
  }
});

const selectAllUsers = (state) => state.users.list;
const selectAuthorId = (state, authorId) => authorId;

export const makeReselectAuthorNameById = () => {
  const reselectAuthorNameById = createSelector(
    [selectAllUsers, selectAuthorId],
    (users, authorId) => users.find(curr => curr.id === authorId)?.name
  );

  return reselectAuthorNameById;
}

const selectCurrentUserId = (state) => state.auth.currentUser.id;

export const reselectUserList = createSelector(
  [selectAllUsers, selectCurrentUserId],
  (users, currentUserId) => users.filter(curr => curr.id !== currentUserId)
);

export const selectUserNameById = (state, userId) => {
  if (!userId) return state.auth.currentUser.name;

  return state.users.list.find(curr => curr.id === userId)?.name;
}

export { getUsersAsyncThunk } from './subslices/getUsers';

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
