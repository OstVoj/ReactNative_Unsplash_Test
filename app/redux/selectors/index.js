import { createSelector } from 'reselect';

const getSearchState = state => state.search;
const getSelectedUserState = state => state.search.selectedUser;

export const getSearch = createSelector([getSearchState], search => {
  const { users, searchText, loading } = search;

  return {
    users,
    searchText,
    loading
  };
});

export const getSelectedUser = createSelector([getSelectedUserState], user => {
  return user;
});
