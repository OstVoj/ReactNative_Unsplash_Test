import { toJson } from 'unsplash-js';

import * as types from '../constants/ActionTypes';
import { searchUsers } from '../../api/unsplash';

export const setSearch = (searchText, users) => ({
  type: types.SEARCH,
  searchText,
  users
});

export const setSelectedUser = user => ({
  type: types.SET_SELECTED_USER,
  user
});

export const search = searchText => {
  return dispatch => {
    const result = searchUsers(searchText);
    result.then(toJson).then(json => {
      dispatch(setSearch(searchText, json.results));
    });
  };
};
