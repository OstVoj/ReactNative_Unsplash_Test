import { createSelector } from 'reselect';

const getSearchState = state => state.search;
const getSelectedUserState = state => state.search.selectedUser;

export const getSearch = createSelector([getSearchState], search => {
  const { users, searchText } = search;

  return {
    users,
    searchText
  };
});

export const getSelectedUser = createSelector([getSelectedUserState], user => {
  return user;
});
