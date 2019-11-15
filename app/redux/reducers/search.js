import { SET_SEARCH_RESULT, SET_SELECTED_USER, SET_LOADING } from '../constants/ActionTypes';

const initialState = {
  searchText: null,
  users: null,
  selectedUser: null,
  loading: false
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      const { searchText, users } = action;

      return {
        ...state,
        searchText,
        users
      };
    case SET_LOADING:
      const { loading } = action;

      return {
        ...state,
        loading
      };
    case SET_SELECTED_USER:
      const { user } = action;

      return {
        ...state,
        selectedUser: user
      };
    default:
      return state;
  }
}
