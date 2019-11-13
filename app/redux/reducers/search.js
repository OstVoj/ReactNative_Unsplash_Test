import { SEARCH, SET_SELECTED_USER } from '../constants/ActionTypes';

const initialState = {
  searchText: null,
  users: null,
  selectedUser: null
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      const { searchText, users } = action;

      return {
        ...state,
        searchText,
        users
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
