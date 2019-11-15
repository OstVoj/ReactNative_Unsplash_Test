import { toJson } from 'unsplash-js';

import * as types from '../constants/ActionTypes';
import { searchUsers } from '../../api/unsplash';

export const setSearchResult = (searchText, users) => ({
  type: types.SET_SEARCH_RESULT,
  searchText,
  users
});

export const setLoading = loading => ({
  type: types.SET_LOADING,
  loading
});

export const setSelectedUser = user => ({
  type: types.SET_SELECTED_USER,
  user
});

export const search = (searchText, page) => {
  return dispatch => {
    dispatch(setLoading(true));
    const result = searchUsers(searchText, page);
    result.then(toJson).then(json => {
      dispatch(setSearchResult(searchText, json.results));
      dispatch(setLoading(false));
    });
  };
};
